import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components';
import { useApiClientContext } from '../../../../ApiClientContext';
import { apiClientConstants } from '@/modules/AdminTools/lib/constants';

const { API_CLIENT_NAME_LABEL } = apiClientConstants;

const Name = () => {
  const { API_CLIENT_NAME } = useApiClientContext();
  const { register } = useFormContext();

  return (
    <CustomFormElement
      {...{ register }}
      type="text"
      name={API_CLIENT_NAME}
      label={API_CLIENT_NAME_LABEL}
      required
    />
  );
};

export default Name;
