import CreateApiClient from './CreateApiClient';
import Header from '@/modules/AdminTools/components/Header';
import { useApiClientContext } from './ApiClientContext';

const ApiClientsHeader = () => {
  const { title } = useApiClientContext();

  return (
    <Header {...{ title }}>
      <CreateApiClient />
    </Header>
  );
};

export default ApiClientsHeader;
