import { planUpgradePathConstants } from '@/modules/AdminTools/lib/constants';
import Boolean from '@/modules/AdminTools/components/Form/Boolean';

const { USE_TO_PLAN_PRICE, USE_TO_PLAN_PRICE_LABEL } = planUpgradePathConstants;

const UseToPlanPrice = () => {
  return <Boolean name={USE_TO_PLAN_PRICE} label={USE_TO_PLAN_PRICE_LABEL} />;
};

export default UseToPlanPrice;
