import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { CustomFormElement } from '@/components';
import { dashboardConstants } from '@/lib';
import { apiClientConstants } from '@/modules/AdminTools/lib/constants';

const { API_CLIENT_GROUP, API_CLIENT_GROUP_LABEL } = apiClientConstants;

const {
  SUPER_ADMIN_GROUP,
  MANAGERS_GROUP,
  USERS_GROUP,
  REGIONAL_MANAGEMENT_GROUP,
  BRANCH_MANAGEMENT_GROUP,
} = dashboardConstants;

export const options = [
  { value: '', name: 'Select a user group' },
  { value: SUPER_ADMIN_GROUP, name: 'Admin' },
  { value: MANAGERS_GROUP, name: 'Manager' },
  { value: USERS_GROUP, name: 'User' },
  { value: REGIONAL_MANAGEMENT_GROUP, name: 'Regional' },
  { value: BRANCH_MANAGEMENT_GROUP, name: 'Branch' },
];

const GroupId = () => {
  const { register, setValue } = useFormContext();

  const createProductErrors = useSelector(
    (state) => state?.errors?.errors?.updateApiClient
  );

  const groupIdErrors = createProductErrors?.[API_CLIENT_GROUP];

  return (
    <CustomFormElement
      {...{ register }}
      type="select"
      name={API_CLIENT_GROUP}
      label={API_CLIENT_GROUP_LABEL}
      selectOptions={options}
      onChange={({ target: { value } }) => setValue(API_CLIENT_GROUP, value)}
      required
      error={groupIdErrors}
    />
  );
};

export default GroupId;
