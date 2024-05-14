import { MainPage } from '@/components'
import SideNav from '../components/SideNav/SideNav'
import { Outlet } from 'react-router'

const SalesPlanning = () => (
  <MainPage sideNav={<SideNav />}>
    <Outlet />
  </MainPage>
)

export default SalesPlanning
