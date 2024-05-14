import Boolean from '@/modules/AdminTools/components/Form/Boolean';

const IsFirstTimeOnly = (props) => (
  <Boolean
    name={'first_time_customer_only'}
    label={'First Time Only'}
    {...props}
  />
);

export default IsFirstTimeOnly;
