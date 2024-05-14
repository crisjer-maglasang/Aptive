import { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { restoreLeadAsync } from '../../../redux/leads';
import {
  restoreLeadLoadingSelector,
} from '../../../redux/loading';
import { Button, Loader } from '@/components/common';
import { ConfirmationModal } from '@/components';
import { usersManagementConstants } from '../../../lib/constants';

const {
  RESTORE_LEAD_BUTTON,
  VIEW_USER_BUTTON,
  RESTORE_LEAD_CONFIRMATION_TITLE,
} = usersManagementConstants;

const LeadActionButton = ({
  onViewUserClick,
  onActionCompleted,
  leadId,
  userId,
  className,
  restoreLead,
  loading,
}) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const onConfirmationQuit = () => {
    setConfirmationOpen(false);

    if (leadId) {
      restoreLead({
        leadId,
        callback: () => onActionCompleted(),
      });
    }
  };

  const onConfirmationBack = () => {
    setConfirmationOpen(false);
  };

  const onDeleteUserClick = useCallback(() => {
    setConfirmationOpen(true);
  }, []);

  return (
    <>
      {loading
        ? <Loader className="h-[22px] leading-[26px]" />
        :
        <>
          {userId ? (
            <Button
              className={className}
              onClick={() => onViewUserClick(userId)}
              color="blue"
            >
              {VIEW_USER_BUTTON}
            </Button>
          ) : (
            <Button
              className={className}
              onClick={onDeleteUserClick}
              color="green"
            >
              {RESTORE_LEAD_BUTTON}
            </Button>
          )}
          <ConfirmationModal
            isOpened={confirmationOpen}
            modalWidth="max-w-[592px] w-full"
            onCancel={onConfirmationBack}
            onAction={onConfirmationQuit}
            title={RESTORE_LEAD_CONFIRMATION_TITLE}
            cancelLabel="Go back"
            confirmLabel={RESTORE_LEAD_BUTTON}
          />
        </>
      }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: restoreLeadLoadingSelector(state),
  };
};

const mapDispatchToProps = {
  restoreLead: restoreLeadAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeadActionButton);
