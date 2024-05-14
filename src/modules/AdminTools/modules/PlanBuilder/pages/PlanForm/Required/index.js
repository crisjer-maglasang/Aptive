import Headers from './Headers';
import Settings from './Settings';
import AreaPlan from '../AreaPlans/AreaPlan';

const Required = () => {
  return (
    <>
      <Settings />
      <hr className="mt-4" />
      <AreaPlan name={'default_area_plan'} {...Headers} />
    </>
  );
};

export default Required;
