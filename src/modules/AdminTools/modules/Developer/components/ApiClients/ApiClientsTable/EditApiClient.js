import PropTypes from 'prop-types';

import ApiClientForm from '../ApiClientForm';
import { useApiClientContext } from '../ApiClientContext';

const EditApiClient = ({ client }) => {
  const { API_CLIENT_NAME, updateApiClientAsync } = useApiClientContext();

  return (
    <ApiClientForm
      defaultValues={client}
      request={updateApiClientAsync.request}
    >
      <div className="text-primary-300 cursor-pointer">
        {client[API_CLIENT_NAME]}
      </div>
    </ApiClientForm>
  );
};

EditApiClient.propTypes = {
  client: PropTypes.any,
};

export default EditApiClient;
