import { useSelector } from 'react-redux';

import ApiClientsHeader from './ApiClientsHeader';
import ApiClientsTable from './ApiClientsTable';
import TokenNotification from './TokenNotification';
import { ApiClientContext } from './ApiClientContext';
import { useEffect, useMemo } from 'react';

const ApiClients = ({
  apiClientsSelector,
  API_CLIENT_NAME,
  apiClientTokensSelector,
  createApiClientAsync,
  updateApiClientAsync,
  removeApiClientAsync,
  title,
  updateApiSelector,
}) => {
  const clients = useSelector(apiClientsSelector);

  const isLoadingClients = useSelector(
    (state) => state?.loading?.ApiClient?.isLoading || false
  );

  const showForm = isLoadingClients || clients.length > 0;

  const ApiClientContextValue = useMemo(
    () => ({
      API_CLIENT_NAME,
      createApiClientAsync,
      updateApiClientAsync,
      removeApiClientAsync,
      title,
      apiClientsSelector,
      apiClientTokensSelector,
      updateApiSelector,
    }),
    [
      API_CLIENT_NAME,
      createApiClientAsync,
      updateApiClientAsync,
      removeApiClientAsync,
      title,
      apiClientsSelector,
      apiClientTokensSelector,
      updateApiSelector,
    ]
  );

  return (
    <ApiClientContext.Provider value={ApiClientContextValue}>
      <ApiClientsHeader />
      {showForm ? <ApiClientsTable /> : <div>No Clients</div>}
      <TokenNotification />
    </ApiClientContext.Provider>
  );
};

export default ApiClients;
