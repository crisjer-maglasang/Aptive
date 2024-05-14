import { formatPhone } from '@/lib'
import { createReducer } from '@/redux/root'
import { clearUsersSearch, nameSpace } from './actions'
import {requestUsersAsync} from '@/redux/users'

const manageUsersInitialState = {
  users: [],
  total: 0,
}

export const manageUsersReducer = createReducer(nameSpace, manageUsersInitialState, {
  [requestUsersAsync.success]: ({ state, action: { payload } }) => {
    state.users = payload.data.map(({ attributes }) => ({
      id: attributes.user_id,
      name: attributes.name,
      email: attributes.email,
      phone_number: formatPhone(attributes.mobile),
      experience_name: attributes.experience_name,
    }))
    state.total = payload.meta.total
  },
  [clearUsersSearch]: ({ state }) => {
    state.users = [],
    state.total = 0;
  },
});
