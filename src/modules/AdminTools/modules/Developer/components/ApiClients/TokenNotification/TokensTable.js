import PropTypes from 'prop-types';
import CopyToClipboardButton from '@/modules/AdminTools/components/CopyToClipboardButton';
import Labeled from '@/modules/AdminTools/components/Labeled';
import { useApiClientContext } from '../ApiClientContext';
import DataTable from '@/modules/AdminTools/components/DataTable/DataTable';
import { apiClientConstants } from '@/modules/AdminTools/lib/constants';

const { API_TOKEN_NAME, API_TOKEN_NAME_LABEL, NEW_TOKEN } = apiClientConstants;

const table = [
  {
    label: NEW_TOKEN,
    render: ({ token }) => token,
  },
  {
    label: '',
    render: ({ token }) => <CopyToClipboardButton text={token} />,
  },
  {
    label: API_TOKEN_NAME_LABEL,
    render: ({ name }) => name,
  },
];

const TokensTable = ({ new_tokens, user }) => {
  const { API_CLIENT_NAME } = useApiClientContext();

  const getRow = ({ plainTextToken, accessToken }) => ({
    token: plainTextToken,
    name: accessToken[API_TOKEN_NAME],
  });

  const tokenData = new_tokens.map(getRow);

  return (
    <Labeled label={user[API_CLIENT_NAME]}>
      <DataTable table={table} data={tokenData} />
    </Labeled>
  );
};

TokensTable.propTypes = {
  new_tokens: PropTypes.array.isRequired,
  user: PropTypes.shape({
    name: PropTypes.any,
  }),
};

export default TokensTable;
