import ApiClientForm from './ApiClientForm';
import { CustomButton } from '@/components';
import { useApiClientContext } from './ApiClientContext';
import { apiClientConstants } from '@/modules/AdminTools/lib/constants';

const CreateProduct = () => {
  const { API_CLIENT_NAME, createApiClientAsync } = useApiClientContext();

  const defaultValues = {
    [API_CLIENT_NAME]: '',
    [apiClientConstants.API_CLIENT_GROUP]: '',
    [apiClientConstants.API_TOKENS]: [],
  };

  return (
    <ApiClientForm
      defaultValues={defaultValues}
      request={createApiClientAsync.request}
    >
      <CustomButton color={'green'}>Create Api Client</CustomButton>
    </ApiClientForm>
  );
};

export default CreateProduct;
