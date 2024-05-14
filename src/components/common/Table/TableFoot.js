import PropTypes from 'prop-types';
import { normalizeRows, Props, TableRow, TableCell } from '.';

const TableFoot = ({
  rows,
  ...props
}) => (
  <tfoot {...(new Props(props).withClassName('divide-y'))}>
    {normalizeRows(rows).map(({ cells, ...props }) => (
      <TableRow
        {...(
          new Props(props)
            .withKey()
            .withClassName('bg-gray-100 text-gray-600 text-xs')
        )}
      >
        {cells.map(({ ...props }) => (
          <TableCell {...(new Props(props).withKey())} />
        ))}
      </TableRow>
    ))}
  </tfoot>
);

TableFoot.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default TableFoot;
