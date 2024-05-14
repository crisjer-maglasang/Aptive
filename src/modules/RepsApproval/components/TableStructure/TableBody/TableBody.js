import PropTypes from 'prop-types';
import { memo } from 'react';
import { mergeClassName } from '@/lib/utils';

export const TableBody = memo(({ classes, children }) => {
  return (
    <tbody className={mergeClassName('divide-y', classes)}>
      {children}
    </tbody>
  );
});

TableBody.propTypes = {
  classes: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
