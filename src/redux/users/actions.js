import { createAction, createAsyncAction } from '@/redux/root'

export const nameSpace = '@@/manage-users'

export const requestUsersAsync = createAsyncAction(`${nameSpace}/REQUEST_USERS`)

export const clearUsersSearch = createAction(`${nameSpace}/CLEAR_REQUEST_USERS`)

export const restoreUserAsync = createAsyncAction(`${nameSpace}/RESTORE_USER`)

export const deleteUserAsync = createAsyncAction(`${nameSpace}/DELETE_USER`)
