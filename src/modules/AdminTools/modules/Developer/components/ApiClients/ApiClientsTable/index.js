import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import table from './table';
import { useApiClientContext } from '../ApiClientContext';
import SearchableDataTable from '@/modules/AdminTools/components/DataTable/SearchableDataTable';
import { apiClientConstants } from '@/modules/AdminTools/lib/constants';

const { API_CLIENT_GROUP, API_TOKENS, SEARCH_API_CLIENT, REMOVE_CONFIRM } =
  apiClientConstants;

const ApiClientsTable = () => {
  const { API_CLIENT_NAME, removeApiClientAsync, apiClientsSelector } =
    useApiClientContext();

  const sortOrders = [API_CLIENT_NAME, API_CLIENT_GROUP, API_TOKENS];

  const dispatch = useDispatch();

  const clients = useSelector(apiClientsSelector) || [];

  const remove = useCallback(
    (id) => {
      if (!window.confirm(REMOVE_CONFIRM)) {
        return;
      }

      dispatch(removeApiClientAsync.request({ id }));
    },
    [dispatch, removeApiClientAsync]
  );

  const getSortField = useCallback((sortingBy) => {
    if (sortingBy === API_TOKENS) {
      return (client) => client[API_TOKENS]?.length;
    }

    return (client) => client[sortingBy];
  }, []);

  const getSearchField = ({ name }) => name;

  const rowMap = useCallback(
    (client) => ({
      client,
      remove: () => remove(client.id),
    }),
    [remove]
  );

  return (
    <SearchableDataTable
      data={clients}
      searchPlaceholder={SEARCH_API_CLIENT}
      table={table(API_CLIENT_NAME)}
      {...{ getSortField, rowMap, sortOrders, getSearchField }}
    />
  );
};

export default ApiClientsTable;
