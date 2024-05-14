import { productManagerConstants } from '@/modules/AdminTools/lib/constants';
import Boolean from '@/modules/AdminTools/components/Form/Boolean';

const { RECURRING, RECURRING_LABEL } = productManagerConstants;

const Recurring = () => {
  return <Boolean name={RECURRING} label={RECURRING_LABEL} />;
};

export default Recurring;
