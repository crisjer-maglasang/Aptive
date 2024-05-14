import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { teamRepsSelector } from '@/redux/teams';
import { ErrorModal } from '@/components/modals';

const NotLicensedRepsModal = ({
  restrictedRepsLicenseInfo,
  setRestrictedRepsLicenseInfo,
}) => {
  const onCloseModal = () => {
    setRestrictedRepsLicenseInfo([]);
  };

  const renderModalContent = () => {
    const repsToDisplay = (
      <ul className="mt-6 mb-4 pl-4">
        {restrictedRepsLicenseInfo.map((repLicenseInfo) => {
          const licenses = [];

          repLicenseInfo.states.forEach((stateInfo) => {
            if (stateInfo.is_license_needed && !stateInfo.has_license) {
              licenses.push(`${stateInfo.name} state license`);
            }
          });

          repLicenseInfo.counties.forEach((countyInfo) => {
            if (countyInfo.is_license_needed && !countyInfo.has_license) {
              licenses.push(`${countyInfo.name} county license`);
            }
          });

          repLicenseInfo.municipalities.forEach((municipalityInfo) => {
            if (municipalityInfo.is_license_needed && !municipalityInfo.has_license) {
              licenses.push(`${municipalityInfo.name} municipality license`);
            }
          });

          const licensesRow = licenses.join(' and ');

          return (
            <li key={repLicenseInfo.rep_id} className="w-full flex flex-col items-start gap-x-2 text-gray-900 pb-2">
              <p>{`${repLicenseInfo.rep_full_name} (ID #${repLicenseInfo.rep_id})`}</p>
              <p className="text-red-600">{`Missing ${licensesRow}`}</p>
            </li>
          );
        })}
      </ul>
    );

    return (
      <div className="text-sm text-gray-600 mb-4">
        <p>The following sales reps:</p>
        {repsToDisplay}
        <p>
          Are not licensed to sell in this location,
          please ensure the proper licenses are in place. Contact licensing team for support.
        </p>
      </div>

    );
  };

  return restrictedRepsLicenseInfo.length > 0
    ? (
      <ErrorModal
        isOpened={restrictedRepsLicenseInfo.length > 0}
        onCancel={onCloseModal}
        title="Unable to assign the polygon"
      >
        {renderModalContent()}
      </ErrorModal>
    )
    : null;
};

const mapStateToProps = (state) => ({
  teamReps: teamRepsSelector(state),
});

const mapDispatchToProps = {};

NotLicensedRepsModal.propTypes = {
  restrictedRepsLicenseInfo: PropTypes.arrayOf(PropTypes.object),
  setRestrictedRepsLicenseInfo: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotLicensedRepsModal);
