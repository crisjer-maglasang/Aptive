import Boolean from '@/modules/AdminTools/components/Form/Boolean';

const IsEmployeeReferral = (props) => (
  <Boolean
    name="is_employee_referral"
    label="Is Employee Referral"
    {...props}
  />
);

export default IsEmployeeReferral;
