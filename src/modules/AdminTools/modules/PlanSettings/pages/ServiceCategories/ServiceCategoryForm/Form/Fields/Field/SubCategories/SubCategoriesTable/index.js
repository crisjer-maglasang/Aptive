import PropTypes from 'prop-types';

import table from './table';
import DataTable from '@/modules/AdminTools/components/DataTable/DataTable';

const SubCategoriesTable = ({ remove, subCategories }) => {
  const getRow = (_i, index) => ({
    index,
    remove: () => remove(index),
  });

  return <DataTable table={table} data={subCategories.map(getRow)} />;
};

SubCategoriesTable.propTypes = {
  remove: PropTypes.func.isRequired,
  subCategories: PropTypes.array.isRequired,
};

export default SubCategoriesTable;
