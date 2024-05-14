import PropTypes from 'prop-types';

import { Table } from '@/components';

const DataTable = ({ table, data, ...props }) => {
  const rows = data.map((props) =>
    table.map(({ render }) => ({
      value: render(props),
    }))
  );

  const columns = table.map(({ label }) => ({
    value: label,
  }));

  return <Table thead={{ rows: columns }} tbody={{ rows }} {...props} />;
};

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  table: PropTypes.array.isRequired,
};

export default DataTable;
