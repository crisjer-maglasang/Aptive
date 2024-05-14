import PropTypes from 'prop-types';
import SectionHeader from '@/modules/AdminTools/modules/PlanBuilder/components/SectionHeader';

const Header = ({ label }) => {
  const description =
    'These numbers will only reflect the branch that is currently selected.';

  return <SectionHeader {...{ label, description }} />;
};

Header.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Header;
