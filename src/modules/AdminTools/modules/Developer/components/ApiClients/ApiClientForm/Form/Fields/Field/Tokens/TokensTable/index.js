import PropTypes from 'prop-types';

import table from './table';
import DataTable from '@/modules/AdminTools/components/DataTable/DataTable';

const TokensTable = ({ remove, tokens }) => {
  const getRow = (_i, index) => ({
    index,
    remove: () => remove(index),
  });

  const tokensData = tokens.map(getRow);

  return <DataTable table={table} data={tokensData} />;
};

TokensTable.propTypes = {
  remove: PropTypes.func.isRequired,
  tokens: PropTypes.array.isRequired,
};

export default TokensTable;
