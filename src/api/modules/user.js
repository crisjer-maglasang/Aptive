import * as Api from '../api';

const api = process.env.REACT_APP_ONB_API;

export const deleteUser = (userId) => Api.remove({ path: `/api/v1/users/${userId}`, api });

export const restoreUser = (userId) => Api.put({ path: `/api/v1/users/${userId}/restore`, api });

export const getUsers = (isActive) => {
  const active = isActive ? '/active' : '';

  const path = `/api/v1/users${active}`;

  return Api.get({ path, api });
};
