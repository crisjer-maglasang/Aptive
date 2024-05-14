import { MainPage } from '@/components'
import { SideNav } from '@/modules/dashboard/components'
import { Outlet } from 'react-router'

const Dashboard = () => (
  <MainPage sideNav={<SideNav />}>
    <Outlet />
  </MainPage>
)

export default Dashboard
