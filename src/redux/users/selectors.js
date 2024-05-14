import { createSelector } from 'reselect'

const manageUsersSlice = state => state.manageUsers

export const manageUsersSelector = createSelector(
  manageUsersSlice,
  state => state?.users || []
)

export const manageUsersTotalSelector = createSelector(
  manageUsersSlice,
  state => state.total
)
