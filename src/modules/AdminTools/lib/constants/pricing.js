const pricingConstants = {
  INITIAL_MIN: 'initial_min',
  INITIAL_MAX: 'initial_max',
  RECURRING_MIN: 'recurring_min',
  RECURRING_MAX: 'recurring_max',
  MONTHLY_MIN: 'monthly_min',
  MONTHLY_MAX: 'monthly_max',
  INITIAL_MIN_LABEL: 'Initial Floor',
  INITIAL_MAX_LABEL: 'Initial Brochure',
  RECURRING_MIN_LABEL: 'Per Treatment Floor',
  RECURRING_MAX_LABEL: 'Per Treatment Brochure',
  MONTHLY_MIN_LABEL: 'Monthly Floor',
  MONTHLY_MAX_LABEL: 'Monthly Brochure',
};

pricingConstants.PRICES = [
  {
    label: pricingConstants.INITIAL_MAX_LABEL,
    id: pricingConstants.INITIAL_MAX,
  },
  {
    label: pricingConstants.INITIAL_MIN_LABEL,
    id: pricingConstants.INITIAL_MIN,
  },
  {
    label: pricingConstants.RECURRING_MAX_LABEL,
    id: pricingConstants.RECURRING_MAX,
  },
  {
    label: pricingConstants.RECURRING_MIN_LABEL,
    id: pricingConstants.RECURRING_MIN,
  },
  {
    label: pricingConstants.MONTHLY_MAX_LABEL,
    id: pricingConstants.MONTHLY_MAX,
  },
  {
    label: pricingConstants.MONTHLY_MIN_LABEL,
    id: pricingConstants.MONTHLY_MIN,
  },
];

pricingConstants.PRICE_IDS = pricingConstants.PRICES.map(({ id }) => id);

pricingConstants.RECURRING = [
  pricingConstants.RECURRING_MAX,
  pricingConstants.RECURRING_MIN,
  pricingConstants.MONTHLY_MAX,
  pricingConstants.MONTHLY_MIN,
];

export { pricingConstants };
