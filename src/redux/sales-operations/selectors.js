import { natSort } from '@/lib'
import { createSelector } from 'reselect'

const soStatsSlice = state => state.soStats

const soRepsSlice = state => state.soReps

const soTeamsSlice = state => state.soTeams

const soSeasonsSlice = state => state.soSeasons

export const soStatsSelector = createSelector(
  soStatsSlice,
  state => state
)

export const soRepsSelector = createSelector(
  soRepsSlice,
  state => state.reps
)

export const soRepsTotalSelector = createSelector(
  soRepsSlice,
  state => state.total
)

export const soTeamsSelector = createSelector(
  soTeamsSlice,
  state => state
)

export const soTeamsSortedSelector = createSelector(
  soTeamsSelector,
  state => [...state].sort((a, b) => natSort(a.name, b.name))
)

export const soTeamSelector = createSelector(
  soTeamsSelector,
  (state, id) => id,
  (state, id) => state.find(team => team.id === id)
)

export const soSeasonsSelector = createSelector(
  soSeasonsSlice,
  state => state
);
