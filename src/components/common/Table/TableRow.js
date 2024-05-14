import PropTypes from 'prop-types';
import { Props } from '.';

const TableRow = ({
  children,
  ...props
}) => (
  <tr {...(new Props(props))}>
    {children}
  </tr>
);

TableRow.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default TableRow;
