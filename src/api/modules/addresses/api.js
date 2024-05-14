import * as Api from '../../api';

const api = process.env.REACT_APP_ONB_API;

export const getAddresses = () => Api.get({ path: '/api/v1/addresses/countries-states', api });
