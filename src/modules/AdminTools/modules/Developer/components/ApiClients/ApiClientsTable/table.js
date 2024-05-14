import { apiClientConstants } from '@/modules/AdminTools/lib/constants';
import { options } from '../ApiClientForm/Form/Fields/Field/GroupId';
import EditApiClient from './EditApiClient';

const {
  API_CLIENT_NAME_LABEL,
  API_CLIENT_GROUP,
  API_CLIENT_GROUP_LABEL,
  API_TOKENS,
  API_TOKENS_LABEL,
} = apiClientConstants;

const user_group = {};
options.forEach(({ value, name }) => (user_group[value] = name));

const table = (API_CLIENT_NAME) => [
  {
    label: API_CLIENT_NAME_LABEL,
    sortBy: API_CLIENT_NAME,
    render: ({ client }) => <EditApiClient {...{ client }} />,
  },
  {
    label: API_CLIENT_GROUP_LABEL,
    sortBy: API_CLIENT_GROUP,
    render: ({ client }) => user_group[client[API_CLIENT_GROUP]],
  },
  {
    label: API_TOKENS_LABEL,
    sortBy: API_TOKENS,
    render: ({ client }) => client[API_TOKENS]?.length || 0,
  },
];

export default table;
