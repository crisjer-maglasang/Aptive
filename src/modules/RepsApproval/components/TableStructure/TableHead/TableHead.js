import PropTypes from 'prop-types';
import { memo } from 'react';

export const TableHead = memo(({ className, children }) => (
  <thead className={className}>
    {children}
  </thead>
));

TableHead.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
