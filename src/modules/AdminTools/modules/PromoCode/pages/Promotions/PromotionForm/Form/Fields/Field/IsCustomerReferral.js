import Boolean from '@/modules/AdminTools/components/Form/Boolean';

const IsCustomerReferral = (props) => (
  <Boolean
    name="is_customer_referral"
    label="Is Customer Referral"
    {...props}
  />
);

export default IsCustomerReferral;
