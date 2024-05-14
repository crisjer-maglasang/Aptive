import React, { useCallback, useEffect, useMemo, useState } from "react"
import { connect } from "react-redux"
import { deleteUserErrorsSelector, removeAllErrorsAction, restoreUserErrorsSelector } from "@/redux/errors"
import { restoreUserAsync, deleteUserAsync } from "@/redux/users"
import { Button, Loader, Message } from "@/components/common"
import { dashboardConstants } from "@/lib"
import { toast } from "@/components"
import {
  deleteUserLoadingSelector,
  restoreUserLoadingSelector,
} from '@/redux/loading';
import { isAdminSelector, userIdSelector, userSelector } from "@/redux/auth"
import { ConfirmationModal } from '@/components';

const {
  DELETE_USER_CONFIRMATION_TITLE,
  RESTORE_USER_BUTTON,
  DELETE_USER_BUTTON,
  RESTORE_USER_CONFIRMATION_TITLE,
} = dashboardConstants

const ACTION_TYPE_DELETE = 'delete'
const ACTION_TYPE_RESTORE = 'restore'

const UserActionButton = ({
  deleteErrors,
  restoreErrors,
  deleteUser,
  restoreUser,
  onActionCompleted,
  isAdmin,
  userId,
  className,
  loggedUserId,
  type,
  deleteLoading,
  restoreLoading,
  removeErrors,
  color
}) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false)

  const actionButtonName = useMemo(() => {
    switch (type) {
      case ACTION_TYPE_DELETE:
        return DELETE_USER_BUTTON
      case ACTION_TYPE_RESTORE:
        return RESTORE_USER_BUTTON
      default:
        return ''
    }
  }, [type])

  const actionButtonColor = useMemo(() => {
    if (color) {
      return color;
    }

    switch (type) {
      case ACTION_TYPE_DELETE:
        return 'red'
      case ACTION_TYPE_RESTORE:
      default:
        return 'green'
    }
  }, [type, color])

  const actionConfirmationTitle = useMemo(() => {
    switch (type) {
      case ACTION_TYPE_DELETE:
        return DELETE_USER_CONFIRMATION_TITLE
      case ACTION_TYPE_RESTORE:
        return RESTORE_USER_CONFIRMATION_TITLE
      default:
        return ''
    }
  }, [type])

  const userAction = useMemo(() => {
    switch (type) {
      case ACTION_TYPE_DELETE:
        return deleteUser
      case ACTION_TYPE_RESTORE:
        return restoreUser
    }
  }, [type])

  const errors = useMemo(() => {
    switch (type) {
      case ACTION_TYPE_DELETE:
        return deleteErrors
      case ACTION_TYPE_RESTORE:
        return restoreErrors
      default:
        return []
    }
  }, [type, deleteErrors, restoreErrors])

  const loading = useMemo(() => {
    switch (type) {
      case ACTION_TYPE_DELETE:
        return deleteLoading
      case ACTION_TYPE_RESTORE:
        return restoreLoading
      default:
        return false
    }
  }, [type, deleteLoading, restoreLoading])

  const onConfirmationQuit = () => {
    setConfirmationOpen(false)

    if (userId) {
      userAction({
        userId,
        callback: () => onActionCompleted()
      })
    }
  }

  const onConfirmationBack = () => {
    setConfirmationOpen(false)
  }

  const onDeleteUserClick = useCallback(() => {
    setConfirmationOpen(true)
  }, [])

  useEffect(() => {
    if (loading || !errors?.length) {
      return
    }

    errors.forEach(({ message, details }) => {
      toast(<Message message={message} details={details} />, {
        autoClose: false,
        closeOnClick: false,
        type: toast.TYPE.ERROR,
      })
    })

      removeErrors()
  }, [removeErrors, loading, errors])

  return isAdmin && loggedUserId !== userId && (
    <>
      {loading
        ? <Loader className="h-[22px] leading-[26px]" />
        :
        <>
          <Button
              className={className}
              onClick={onDeleteUserClick}
              color={actionButtonColor}
            >
              {actionButtonName}
            </Button>
          <ConfirmationModal
            isOpened={confirmationOpen}
            modalWidth="max-w-[592px] w-full"
            onCancel={onConfirmationBack}
            onAction={onConfirmationQuit}
            title={actionConfirmationTitle}
            cancelLabel="Go back"
            confirmLabel={actionButtonName}
          />
        </>
      }
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: userSelector(state),
    deleteErrors: deleteUserErrorsSelector(state),
    restoreErrors: restoreUserErrorsSelector(state),
    isAdmin: isAdminSelector(state),
    loggedUserId: userIdSelector(state),
    deleteLoading: deleteUserLoadingSelector(state),
    restoreLoading: restoreUserLoadingSelector(state),
  }
}

const mapDispatchToProps = {
  deleteUser: deleteUserAsync.request,
  restoreUser: restoreUserAsync.request,
  removeErrors: removeAllErrorsAction
}

export default connect(mapStateToProps, mapDispatchToProps)(UserActionButton)
