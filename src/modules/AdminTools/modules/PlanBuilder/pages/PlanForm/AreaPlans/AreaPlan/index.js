import PropTypes from 'prop-types';

import { AreaContext } from './AreaContext';
import AreaPlanPricings from './AreaPlanPricings';
import PercentageThreshold from './PercentageThreshold';
import BillingFrequencies from './BillingFrequencies';
import Services from './AreaProductPricings/Services';
import Addons from './AreaProductPricings/Addons';

const AreaPlan = ({ name, LevelsHeader, ServicesHeader, AddonsHeader }) => (
  <AreaContext.Provider value={name}>
    <div className="flex flex-row space-x-4">
      <PercentageThreshold />
      <BillingFrequencies />
    </div>
    <hr className="mt-4" />
    <AreaPlanPricings {...{ LevelsHeader }} />
    <hr className="mt-4" />
    <Services {...{ ServicesHeader }} />
    <hr className="mt-4" />
    <Addons {...{ AddonsHeader }} />
  </AreaContext.Provider>
);

AreaPlan.propTypes = {
  AddonsHeader: PropTypes.elementType.isRequired,
  LevelsHeader: PropTypes.elementType.isRequired,
  ServicesHeader: PropTypes.elementType.isRequired,
  name: PropTypes.string.isRequired,
};

export default AreaPlan;
