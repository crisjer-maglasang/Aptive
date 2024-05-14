import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { settingsSelector } from '@/modules/AdminTools/redux/planBuilder/settings';
import { planBuilderConstants } from '@/modules/AdminTools/lib/constants';

const { NAME } = planBuilderConstants;

const PricingLevelName = ({ pricingLevelId }) => {
  const settings = useSelector(settingsSelector);

  const planPricingLevel = settings?.get('plan_pricing_levels', pricingLevelId);
  const name = planPricingLevel?.[NAME];

  return <>{name || 'Empty'}</>;
};

PricingLevelName.propTypes = {
  pricingLevelId: PropTypes.number.isRequired,
};

export default PricingLevelName;
