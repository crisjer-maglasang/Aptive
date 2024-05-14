import { SideNav as BaseSideNav } from '@/components'
import { abilityConstants, userCan } from '@/lib'
import { userSelector } from '@/redux/auth'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { sptConstants } from '../../lib';

const {
  VIEW_AREAS_ABILITY,
  VIEW_TEAMS_ABILITY,
} = abilityConstants

const SideNav = ({ user }) => {
  const location = useLocation()

  const isArea = () => {
    const pathname = location.pathname.replace(/^\/|\/$/g, '')
    return pathname === 'sales-planning' || pathname.startsWith('sales-planning/area')
  }
  const isTeam = () => {
    return location.pathname.replace(/^\/|\/$/g, '').startsWith('sales-planning/team')
  }
  const isPolygon = () => {
    return location.pathname.replace(/^\/|\/$/g, '').startsWith('sales-planning/polygon')
  }

  const items = [
    {
      name: sptConstants.VIEW_AREAS,
      path: '/sales-planning',
      ability: VIEW_AREAS_ABILITY,
      active: isArea()
    },
    {
      name: sptConstants.VIEW_TEAMS,
      path: '/sales-planning/teams',
      ability: VIEW_TEAMS_ABILITY,
      active: isTeam()
    }
  ].filter(({ ability }) => userCan(user, ability))

  return (
    <BaseSideNav items={items} />
  )
}

// Redux
const mapStateToProps = (state) => ({
  user: userSelector(state)
})

export default connect(mapStateToProps)(SideNav)
