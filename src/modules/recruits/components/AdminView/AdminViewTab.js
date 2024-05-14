import { FormSection, Loader } from '@/components';
import { onboardingConstants, dashboardConstants } from '@/lib/constants';
import { adminViewLoadingSelector, selectIsUpdateStatusLoading } from '@/redux/loading';
import { adminViewSelector, requestAdminViewAsync } from '@/redux/onboarding';
import { connect } from 'react-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { ReportingTo } from '@/modules/dashboard/components/AllLeads/AllLeadsTable';
import { default as AdminViewField } from './AdminViewField';
import { StatusDropdown } from '@/modules/dashboard/components/SalesOperations/SalesOperationsRepsTable/Values';
import { repStatusesSelector, requestRepStatusesAsync } from '@/redux/reps';
import PropTypes from 'prop-types';

const {
  RENT_DEDUCTION_LABEL,
  UPFRONT_PAY_LABEL,
  REP_STATUS_LABEL,
  SALES_TEAM_LABEL,
} = onboardingConstants;

const {
  COLUMN_TEXT_REP_ID,
  COLUMN_TEXT_WORKDAY_ID,
  REPORTING_TO,
  RECRUITER,
} = dashboardConstants;

const AdminViewTab = ({
  userId,
  adminViewData,
  requestAdminView,
  isLoading,
  requestRepStatuses,
  repStatuses,
  isStatusUpdating,
}) => {
  const repStatus = useMemo(() => (
    repStatuses.find((repStatus) => repStatus.statusCode === adminViewData?.rep_status)
  ), [adminViewData, repStatuses]);

  useEffect(() => {
    requestRepStatuses();

    if (userId) {
      requestAdminView({ userId });
    }
  }, [userId, requestAdminView, requestRepStatuses]);

  const onChangeRepStatus = useCallback(() => {
    requestAdminView({ userId });
  }, [userId, requestAdminView]);

  return (
    <div className="relative bg-white border border-gray-200 rounded-md shadow-sm">
      <FormSection title={onboardingConstants.ADMIN_VIEW_TITLE}>
        {isLoading || isStatusUpdating ? <Loader /> : (
          <div className="flex flex-wrap">
            <AdminViewField label={RECRUITER} value={adminViewData?.recruiter_name} />
            <AdminViewField label={REPORTING_TO} value={(
              <ReportingTo
                partnership={adminViewData?.partnership_name}
                regionalManager={adminViewData?.regional_manager_name}
                divisionManager={adminViewData?.division_manager_name}
                seniorTeamLeader={adminViewData?.senior_team_leader_name}
                isOpened={true}
              />
            )}
            />
            <AdminViewField label={COLUMN_TEXT_REP_ID} value={userId} />
            <AdminViewField label={COLUMN_TEXT_WORKDAY_ID} value={adminViewData?.workday_id} />
            <AdminViewField label={RENT_DEDUCTION_LABEL} value={adminViewData?.rent_deduction} />
            <AdminViewField label={UPFRONT_PAY_LABEL} value={adminViewData?.upfront_pay} />
            <AdminViewField label={SALES_TEAM_LABEL} value={adminViewData?.sales_team} />
            <AdminViewField label={REP_STATUS_LABEL} value={(
              <StatusDropdown onChange={onChangeRepStatus}
                isDisabled={isStatusUpdating}
                repStatuses={repStatuses}
                repsToChangeStatus={[userId]}
                wrapperClassName="relative flex items-center"
                label={repStatus?.statusTitle}
              />
            )}
            />

          </div>
        )}
      </FormSection>
    </div>
  );
};

AdminViewTab.propTypes = {
  userId: PropTypes.number,
  adminViewData: PropTypes.object,
  requestAdminView: PropTypes.func,
  isLoading: PropTypes.bool,
  isStatusUpdating: PropTypes.bool,
  requestRepStatuses: PropTypes.func,
  repStatuses: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => {
  return {
    isLoading: adminViewLoadingSelector(state),
    isStatusLoading: adminViewLoadingSelector(state),
    adminViewData: adminViewSelector(state),
    isStatusUpdating: selectIsUpdateStatusLoading(state),
    repStatuses: repStatusesSelector(state),
  };
};

const mapDispatchToProps = {
  requestAdminView: requestAdminViewAsync.request,
  requestRepStatuses: requestRepStatusesAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminViewTab);
