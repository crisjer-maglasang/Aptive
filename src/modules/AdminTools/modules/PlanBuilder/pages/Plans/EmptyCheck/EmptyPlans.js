import { Link } from 'react-router-dom';

import { CustomButton } from '@/components';

const EmptyPlans = () => {
  return (
    <div className="bg-white pt-20 pb-56 rounded-lg border border-gray-200">
      <div className="text-center m-auto">
        <div className="font-semibold">{'You don\'t have any plans'}</div>
        <div className="mb-6 mt-1 text-gray-600 text-sm">
          In order to create a plan, click the button below to get started.
        </div>
        <Link to={'/plan-builder/plan'} className="">
          <CustomButton color={'green'}>+ Create a plan</CustomButton>
        </Link>
      </div>
    </div>
  );
};

export default EmptyPlans;
