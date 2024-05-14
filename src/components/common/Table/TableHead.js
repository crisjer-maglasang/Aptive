import PropTypes from 'prop-types';
import { normalizeRows, Props, TableRow, TableCell } from '.';

const TableHead = ({
  rows,
  ...props
}) => (
  <thead {...(new Props(props).withClassName('bg-gray-50 divide-y whitespace-nowrap'))}>
    {normalizeRows(rows).map(({ cells, ...props }) => (
      <TableRow
        {...(
          new Props(props)
            .withKey()
            .withClassName('text-gray-600 text-xs uppercase')
        )}
      >
        {cells.map(({ ...props }) => (
          <TableCell
            {...(
              new Props(props)
                .withProp('type', 'th')
                .withKey()
                .withClassName(`py-3 font-normal`)
            )}
          />
        ))}
      </TableRow>
    ))}
  </thead>
);

TableHead.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default TableHead;
