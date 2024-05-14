import { Select } from '@/components';
import { featureFlagsSelector } from '@/redux/onboarding';
import PropTypes from 'prop-types';
import { useContext, useMemo } from 'react';
import { connect } from 'react-redux';
import { getSectionConfig } from '../lib';
import { ProfileWizardContext } from '..';

const Header = ({
  // State
  featureFlags,
}) => {
  const { section, setSection, showEditProfile } = useContext(ProfileWizardContext);

  const { title, options } = useMemo(() => (
    getSectionConfig(section, featureFlags)
  ), [
    section,
    featureFlags,
  ]);

  const onBackClick = () => {
    showEditProfile();
  };

  /**
   * As of now, the <Select/> child component must be re-rendered
   * each time when current component updates.
   * So, using the `useCallback()` wrapper here doesn't make sense.
   */
  const onSectionChange = (event) => {
    setSection(event.target.value);
  };

  return (
    <div className="flex justify-between border-b py-4 px-6">
      <div className="flex items-center space-x-3">
        <button
          type="button"
          className="inline-block text-primary-300 text-sm font-medium focus:outline-none"
          onClick={onBackClick}
        >
          Back
        </button>
        <span className="inline-block text-gray-400 text-sm">/</span>
        <span className="inline-block text-gray-900 text-sm">{title}</span>
      </div>
      {options.length > 1 && (
        <Select
          name="section"
          value={section}
          options={options}
          defaultOption={options[0]}
          onChange={onSectionChange}
        />
      )}
    </div>
  );
};

Header.propTypes = {
  featureFlags: PropTypes.object,
};

const mapStateToProps = (state) => ({
  featureFlags: featureFlagsSelector(state),
});

export default connect(mapStateToProps)(Header);
