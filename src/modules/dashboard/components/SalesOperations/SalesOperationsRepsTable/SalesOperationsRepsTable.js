import { WizardProfileModal, Table } from '@/components';
import { CustomFormElement } from '@/components/common';
import { dashboardConstants, formatToDate, onboardingConstants } from '@/lib';
import { isAdminSelector } from '@/redux/auth';
import { selectIsUpdateStatusLoading, soRepsLoadingSelector } from '@/redux/loading';
import { soRepsSelector, soRepsTotalSelector } from '@/redux/sales-operations';
import { repStatusesSelector } from '@/redux/reps';
import { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { getHeadRows, parseRepRows } from './utils';
import PropTypes from 'prop-types';

const SalesOperationsRepsTable = ({
  reps,
  repsTotal,
  pageSize,
  initialPage,
  selectedPage,
  repsLoading,
  isAdmin,
  isStatusUpdating,
  getReps,
  setPageSize,
  onPageChange,
  recruitingSeasonId,
  repStatuses,
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState();
  const [repsToChangeStatus, setRepsToChangeStatus] = useState([]);

  const onChangeRepsStatus = useCallback(() => {
    getReps();
    setRepsToChangeStatus([]);
  }, [getReps]);

  const onCheckAllReps = useCallback((event) => {
    const repsToCheck = event.target.checked ? [...reps?.map((rep) => rep.id)] : [];

    setRepsToChangeStatus(repsToCheck);
  }, [reps]);

  const onCheckRep = useCallback((id) => {
    const isIdExist = repsToChangeStatus.indexOf(id) >= 0;
    const repsToCheck = isIdExist
      ? [...repsToChangeStatus.filter((repId) => repId !== id)]
      : [...repsToChangeStatus, id];

    setRepsToChangeStatus(repsToCheck);
  }, [repsToChangeStatus]);

  const onRepClick = useCallback((userId) => {
    setSelectedUserId(userId);
    setProfileOpen(true);
  }, []);

  const onProfileClose = useCallback(() => {
    setProfileOpen(false);
  }, []);

  const repRows = parseRepRows(
    reps,
    onCheckRep,
    repsToChangeStatus,
    isAdmin && onRepClick,
    isStatusUpdating,
    repStatuses,
  );

  return (
    <>
      <Table
        loading={repsLoading}
        thead={{
          rows: getHeadRows(
            onCheckAllReps,
            repsToChangeStatus,
            onChangeRepsStatus,
            reps?.length === repsToChangeStatus.length,
            Boolean(repsToChangeStatus.length) && repsToChangeStatus.length < reps?.length,
            isStatusUpdating,
            repStatuses,
          ),
        }}
        tbody={{
          rows: repRows,
        }}
        paginator={{
          pageSize,
          setPageSize,
          onPageChange,
          selectedPage,
          initialPage,
          rowCount: repsTotal,
        }}
        wrapper={{
          className: 'overflow-y-visible',
        }}
      />
      <WizardProfileModal
        isOpen={profileOpen}
        onClose={onProfileClose}
        isPersonalWizard={false}
        userId={selectedUserId}
        reloadPageInfo={getReps}
        recruitingSeasonId={recruitingSeasonId}
      />
    </>
  );
};

SalesOperationsRepsTable.propTypes = {
  pageSize: PropTypes.number,
  initialPage: PropTypes.number,
  selectedPage: PropTypes.number,
  reps: PropTypes.array,
  repsTotal: PropTypes.number,
  repsLoading: PropTypes.bool,
  isAdmin: PropTypes.bool,
  isStatusUpdating: PropTypes.bool,
  getReps: PropTypes.func,
  setPageSize: PropTypes.func,
  onPageChange: PropTypes.func,
  recruitingSeasonId: PropTypes.string,
  repStatuses: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => ({
  reps: soRepsSelector(state),
  repsTotal: soRepsTotalSelector(state),
  repsLoading: soRepsLoadingSelector(state),
  repStatuses: repStatusesSelector(state),
  isAdmin: isAdminSelector(state),
  isStatusUpdating: selectIsUpdateStatusLoading(state),
});

export default connect(mapStateToProps)(SalesOperationsRepsTable);
