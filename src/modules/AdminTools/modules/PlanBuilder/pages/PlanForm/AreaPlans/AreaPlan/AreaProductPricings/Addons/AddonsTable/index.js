import { memo } from 'react';
import PropTypes from 'prop-types';

import table from './table';
import DataTable from '@/modules/AdminTools/components/DataTable/DataTable';

const AddonsTable = ({ remove, addons, required }) => {
  const getRow = (_i, index) => ({
    index,
    remove: () => remove(index),
  });

  const addonData = addons.map(getRow);

  return <DataTable table={table(required)} data={addonData} />;
};

AddonsTable.propTypes = {
  addons: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default memo(AddonsTable, (prevProps, nextProps) => {
  return prevProps.addons.length === nextProps.addons.length;
});
