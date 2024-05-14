import { useLocation } from 'react-router';

import { SideNav as BaseSideNav } from '@/components';
import { adminToolPages } from '@/modules/AdminTools/routing';

const SideNav = () => {
  const location = useLocation();

  const isCurrentLocation = (path) => {
    path = path.replace(/^\/|\/$/g, '');
    const pathParts = location.pathname.replace(/^\/|\/$/g, '').split('/');

    return pathParts[0] === path;
  };

  const items = adminToolPages.map(({ NAME, PATH }) => ({
    name: NAME,
    path: PATH,
    active: isCurrentLocation(PATH),
  }));

  return <BaseSideNav items={items} />;
};

export default SideNav;
