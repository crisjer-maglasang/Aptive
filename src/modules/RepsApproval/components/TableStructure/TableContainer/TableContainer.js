import PropTypes from 'prop-types';
import { memo } from 'react';
import { mergeClassName } from '@/lib/utils';

export const TableContainer = memo(({ border, rounded, elevation, className, children }) => {
  const styles = mergeClassName(
    'w-full h-full flex flex-col bg-white',
    {
      'border': border,
      'rounded-md overflow-hidden': rounded,
      'shadow-[0px_2px_8px_rgba(106,115,129,0.12)]': elevation,
    },
    className,
  );

  return (
    <div className={styles}>
      {children}
    </div>
  );
});

TableContainer.propTypes = {
  rounded: PropTypes.bool,
  border: PropTypes.bool,
  elevation: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
