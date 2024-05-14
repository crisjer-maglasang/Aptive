import { apiClientConstants } from '@/modules/AdminTools/lib/constants';
import Date from './Date';
import Name from './Name';

const {
  API_TOKEN_CREATED,
  API_TOKEN_CREATED_LABEL,
  API_TOKEN_LAST_USED,
  API_TOKEN_LAST_USED_LABEL,
  API_TOKEN_NAME_LABEL,
} = apiClientConstants;

const dates = [
  {
    label: API_TOKEN_CREATED_LABEL,
    id: API_TOKEN_CREATED,
  },
  {
    label: API_TOKEN_LAST_USED_LABEL,
    id: API_TOKEN_LAST_USED,
  },
];

const table = [
  {
    label: API_TOKEN_NAME_LABEL,
    render: ({ index }) => <Name {...{ index }} />,
  },
  ...dates.map((field) => ({
    ...field,
    render: ({ index }) => <Date {...{ index }} field={field.id} />,
  })),
  {
    id: 'trash',
    label: '',
    render: ({ remove }) => (
      <div className="cursor-pointer text-primary-300" onClick={remove}>
        remove
      </div>
    ),
  },
];

export default table;
