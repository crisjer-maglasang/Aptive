import { memo } from 'react';
import PropTypes from 'prop-types';

export const TableFooter = memo(({ classes, children }) => (
  <tfoot className={classes}>
    {children}
  </tfoot>
));

TableFooter.propTypes = {
  classes: PropTypes.string,
  children: PropTypes.node,
};
