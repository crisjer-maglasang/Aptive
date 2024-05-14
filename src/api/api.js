import axios from 'axios';
import qs from 'qs';
import { HandleCookies } from '@/lib/api';

axios.defaults.withCredentials = true;

export const getUrl = ({ path, api }, params = {}) => {
  const baseUrl = {
    [process.env.REACT_APP_ONB_API]: process.env.REACT_APP_ONB_API_URL,
    [process.env.REACT_APP_SPT_API]: process.env.REACT_APP_SPT_API_URL,
    [process.env.REACT_APP_PLAN_BUILDER_API]: process.env.REACT_APP_PLAN_BUILDER_API_URL,
    [process.env.REACT_APP_HOUSING_API]: process.env.REACT_APP_HOUSING_API_URL,
  }[api];

  return `${baseUrl}${path}?${qs.stringify(params, {
    arrayFormat: 'brackets',
  })}`;
};

const getResponseData = (response) => response.data;

const getHeaders = () => Object.fromEntries([
  ['Content-Type', 'application/json'],
  ['Authorization', getAuthorizationHeaderValue()],
].filter(([, value]) => ![undefined, null, ''].includes(value)));

const getAuthorizationHeaderValue = () => {
  const tokenPayload = HandleCookies.get('tokenPayload');

  if (tokenPayload) {
    return `Bearer ${tokenPayload}`;
  }

  return null;
};

const createMethod = (config) => {
  return axios(config).then(getResponseData);
};

export const createEndpoint = (endpointClass) => {
  const instance = new endpointClass();

  const endpoint = instance.endpoint;
  endpoint.requestPayload = instance.requestPayload;
  endpoint.successPayload = instance.successPayload;
  endpoint.failurePayload = instance.failurePayload;

  return endpoint;
};

export const get = ({ ...urlProps }) => (params, config = {}) =>
  createMethod({
    method: 'get',
    url: getUrl(urlProps, params),
    headers: getHeaders(),
    ...config,
  });

export const post = (urlProps) => (data, config = {}) =>
  createMethod({
    method: 'post',
    url: getUrl(urlProps),
    data,
    headers: getHeaders(),
    ...config,
  });

export const patch = (urlProps) => (data, config = {}) =>
  createMethod({
    method: 'patch',
    url: getUrl(urlProps),
    data,
    headers: getHeaders(),
    ...config,
  });

export const put = (urlProps) => (data, config = {}) =>
  createMethod({
    method: 'put',
    url: getUrl(urlProps),
    data,
    headers: getHeaders(),
    ...config,
  });

export const remove = (urlProps) => (data, config = {}) =>
  createMethod({
    method: 'delete',
    url: getUrl(urlProps),
    data,
    headers: getHeaders(),
    ...config,
  });

