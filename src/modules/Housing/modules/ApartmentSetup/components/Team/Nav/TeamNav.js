import { Link } from 'react-router-dom';
import { PATH } from '@/modules/Housing/routing/apartmentSetup';
import classNames from 'classnames';
import { useLocation } from 'react-router';

const TeamNav = ({ teamId }) => {
  const location = useLocation();

  const linkClassName = (link) => classNames(
    'h-full flex items-center pt-4 pb-4 mr-4 ml-4 align-middle',
    location.pathname === link.path ? 'border-b-2 border-gray-900' : '',
  );
  const teamNavLinks = [
    {
      path: `${PATH}/${teamId}`,
      key: 'complexes',
      label: 'Complexes',
    },
  ];

  return (
    <div className="h-full flex items-center">
      {teamNavLinks.map(link => (
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

export default TeamNav;
