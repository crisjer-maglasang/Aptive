import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { CustomButton } from '@/components';
import Header from '@/modules/AdminTools/components/Header';
import { plansSelector } from '@/modules/AdminTools/redux/planBuilder/plans';
import { MASS_UPDATE, PLAN_PATH } from '@/modules/AdminTools/routing/plan-builder';

const PlansHeader = () => {
  const plans = useSelector(plansSelector);
  const hasPlans = plans?.length > 0;

  return (
    <Header title={'Plans'}>
      {hasPlans && (
        <div className="space-x-2">
          <Link to={MASS_UPDATE} className="">
            <CustomButton color={'green'}>Mass Update</CustomButton>
          </Link>
          <Link to={PLAN_PATH} className="">
            <CustomButton color={'green'}>Create Plan</CustomButton>
          </Link>
        </div>
      )}
    </Header>
  );
};

export default PlansHeader;
