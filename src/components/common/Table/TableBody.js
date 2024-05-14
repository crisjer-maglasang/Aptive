import PropTypes from 'prop-types';
import { normalizeRows, Props, TableRow, TableCell } from '.';
import { useState } from 'react';

const TableBody = ({
  rows,
  data,
  onSelect,
  classNames,
  hasHoverAction,
  ...props
}) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

  const handleMouseEnter = (index) => {
    if (hasHoverAction) {
      setHoveredRowIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (hasHoverAction) {
      setHoveredRowIndex(null);
    }
  };

  return (
    <tbody {...new Props(props).withClassName('divide-y')}>
      {normalizeRows(rows).map(({ cells, isHeaderRow, ...props }, index) => (
        // The `key` attribute implicitly sets by Props.withKey() call.
        // eslint-disable-next-line react/jsx-key
        <TableRow
          {...new Props(props)
            .withKey()
            .withClassName('text-gray-600 text-sm')
            .withClassName(isHeaderRow ? '' : classNames)}
          onClick={onSelect ? () => onSelect(data[index]) : undefined}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {cells.map(({ ...props }) => (
            // The `key` attribute implicitly sets by Props.withKey() call.
            // eslint-disable-next-line react/jsx-key
            <TableCell
              {...new Props(props).withKey()}
              isHovered={hoveredRowIndex === index}
            />
          ))}
        </TableRow>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.array,
  onSelect: PropTypes.func,
  classNames: PropTypes.string,
  rows: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  ).isRequired,
  hasHoverAction: PropTypes.bool,
};

TableBody.defaultProps = {
  data: [],
  onSelect: undefined,
  classNames: '',
  hasHoverAction: false,
};

export default TableBody;
