import { memo } from 'react';
import PropTypes from 'prop-types';

import table from './table';
import DataTable from '@/modules/AdminTools/components/DataTable/DataTable';

const AreaPlanPricingsTable = ({ remove, pricings, required }) => {
  const getRow = (_i, index) => ({
    index,
    remove: () => remove(index),
  });

  const planPricingData = pricings.map(getRow);

  return <DataTable table={table(required)} data={planPricingData} />;
};

AreaPlanPricingsTable.propTypes = {
  pricings: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default memo(AreaPlanPricingsTable, (prevProps, nextProps) => {
  return prevProps.pricings.length === nextProps.pricings.length;
});
