import { Link } from 'react-router-dom';
import { PATH } from '@/modules/Housing/routing/apartmentSetup';
import classNames from 'classnames';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';

const ComplexNav = ({ teamId, complexId }) => {
  const location = useLocation();

  const linkClassName = (link) => classNames(
    'h-full flex items-center pt-4 pb-4 mr-4 ml-4 align-middle',
    location.pathname === link.path ? 'border-b-2 border-gray-900' : '',
  );
  const complexNavLinks = [
    {
      path: `${PATH}/${teamId ? `team/${teamId}/` : ''}complex/${complexId}`,
      key: 'apartments',
      label: 'Apartments',
    },
    {
      path: `${PATH}/${teamId ? `team/${teamId}/` : ''}complex/${complexId}/history`,
      key: 'history',
      label: 'History',
    },
  ];

  return (
    <div className="h-full flex items-center">
      {complexNavLinks.map(link => (
        <Link
          className={linkClassName(link)}
          to={link.path}
          key={link.key}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}

ComplexNav.propTypes = {
  complexId: PropTypes.string,
  teamId: PropTypes.string,
};

export default ComplexNav;
