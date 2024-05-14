import { SideNav as BaseSideNav } from '@/components'
import { abilityConstants, dashboardConstants, userCan, userGroup } from '@/lib'
import { userSelector } from '@/redux/auth'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'

const {
  ACCESS_ALL_LEADS_ABILITY,
  ACCESS_MY_TREE_ABILITY,
  ACCESS_SALES_OPERATIONS_ABILITY,
  ACCESS_REP_APPROVAL_ABILITY,
} = abilityConstants

const SideNav = ({ user }) => {
  const location = useLocation()
  const items = ([
    {
      name: dashboardConstants.SALES_OPERATIONS,
      path: '/onboarding',
      ability: ACCESS_SALES_OPERATIONS_ABILITY
    },
    {
      name: dashboardConstants.ALL_LEADS,
      path: '/onboarding/all-leads',
      ability: ACCESS_ALL_LEADS_ABILITY
    },
    {
      name: dashboardConstants.MY_TREE,
      path: '/onboarding/my-tree',
      ability: ACCESS_MY_TREE_ABILITY
    },
    {
      name: dashboardConstants.REP_APPROVAL,
      path: '/onboarding/rep-approval',
      ability: ACCESS_REP_APPROVAL_ABILITY
    }
  ])
  .filter(({ability}) => userCan(user, ability))
  .map((item) => Object.assign(item, { active: item.path === location.pathname }))

  return (
    <BaseSideNav items={items} />
  )
}

const mapStateToProps = (state) => ({
  user: userSelector(state)
})

export default connect(mapStateToProps)(SideNav)
