import { Outlet } from 'react-router';

import { MainPage } from '@/components';
import SideNav from '../components/SideNav';

const AdminTools = () => (
  <MainPage sideNav={<SideNav />}>
    <Outlet />
  </MainPage>
);

export default AdminTools;
