import { connect } from 'react-redux';
import { DocumentsList, FormSection, Loader } from '@/components';
import { agreementsUserIsLoadingSelector } from '@/redux/loading';
import { contractsLinkErrorSelector } from '@/redux/errors';
import { selectRecruitIdSelected, selectUserIdSelected } from '@/redux/onboarding';
import { repContractsSelector } from '@/redux/contracts';
import PropTypes from 'prop-types';
import { isContractEditableSelector, userIdSelector } from '@/redux/auth';
import { onboardingConstants } from '@/lib/constants';

const DocumentsTab = ({
  isContractEditable,
  authUserId,
  selectedUserId,
  recruitId,
  contractsPerYears,
  loading,
}) => {
  return (
    <div className="relative bg-white border border-gray-200 rounded-md shadow-sm">
      <FormSection title={onboardingConstants.CONTRACTS_SECTION_TITLE}>
        {loading
          ? <Loader />
          : (
            <DocumentsList
              documents={contractsPerYears}
              recruitId={recruitId}
              selectedUser={selectedUserId}
              isEditable={isContractEditable && (selectedUserId !== authUserId)}
            />
          )}
      </FormSection>
    </div>
  );
};

const mapStateToProps = (state, { userId }) => ({
  isContractEditable: isContractEditableSelector(state),
  authUserId: userIdSelector(state),
  selectedUserId: selectUserIdSelected(state),
  loading: agreementsUserIsLoadingSelector(state),
  error: contractsLinkErrorSelector(state),
  contractsPerYears: repContractsSelector(state, userId),
  recruitId: selectRecruitIdSelected(state),
});

DocumentsTab.propTypes = {
  isContractEditable: PropTypes.bool,
  authUserId: PropTypes.number,
  userId: PropTypes.number,
  recruitId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  contractsPerYears: PropTypes.object,
  loading: PropTypes.bool,
};

export default connect(mapStateToProps, null)(DocumentsTab);
