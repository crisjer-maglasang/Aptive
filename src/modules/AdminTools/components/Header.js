import PropTypes from 'prop-types';

const Header = ({ title, children }) => (
  <div className="flex flex-row">
    <div className="text-3xl pb-3.5 pt-11">{title}</div>
    <div className="flex-grow" />
    <div>{children}</div>
  </div>
);

Header.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

export default Header;
