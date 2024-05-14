import { formatPhone } from '@/lib'
import { createReducer } from '@/redux/root'
import { saveAs } from 'file-saver';
import {
  nameSpace,
  requestSoRepsAsync,
  requestSoStatsAsync,
  requestSoTeamsAsync,
  exportSoRepsAsync,
  requestSoSeasonsAsync
} from '@/redux/sales-operations'
import { s2ab } from '@/lib/utils'

const soStatsInitialState = {
  workday_complete: 0,
  not_started: 0,
  profile_completed: 0,
  not_submitted: 0,
  rookies: 0,
  started: 0,
  team_assigned: 0,
  total: 0,
  total_by_date: 0,
  profile_and_workday_complete: 0
}

const soRepsInitialState = {
  reps: [],
  total: 0
}

export const soStatsReducer = createReducer(nameSpace, soStatsInitialState, {
  [requestSoStatsAsync.success]: ({ action }) => action.payload.data.attributes,
})

export const soRepsReducer = createReducer(nameSpace, soRepsInitialState, {
  [requestSoRepsAsync.success]: ({ state, action: { payload } }) => {
    state.reps = payload.data.map(({ attributes }) => ({
      id: attributes.user_id,
      workday_id: attributes.workday_id,
      name: attributes.name,
      email: attributes.email,
      phone_number: formatPhone(attributes.mobile),
      experience_name: attributes.experience_name,
      workday_complete: !!attributes.workday_complete,
      profile_complete: !!attributes.profile_complete,
      profile_and_workday_complete: !!attributes.profile_and_workday_complete,
      status: attributes?.status,
    }));
    state.total = payload.meta.total
  },

  [exportSoRepsAsync.success]: ({ action: { payload } }) => {
    const blob = new Blob([s2ab(atob(payload?.data?.attributes?.file))], {type: ''})
    saveAs(blob, 'SalesOperations.xlsx')
  }
})

export const soTeamsReducer = createReducer(nameSpace, [], {
  [requestSoTeamsAsync.success]: ({ action }) => action.payload.data.map(({ attributes }) => ({
    id: attributes.team_id,
    name: attributes.name
  }))
})

export const soSeasonsReducer = createReducer(nameSpace, [], {
  [requestSoSeasonsAsync.success]: ({ action }) => action.payload.data.map(({ attributes }) => ({
    id: attributes.season_id,
    name: attributes.name,
    is_current: attributes.is_current,
  }))
})
