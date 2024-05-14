import { memo } from 'react';
import PropTypes from 'prop-types';
import { mergeClassName } from '@/lib/utils';

export const Table = memo(({ className, children }) => {
  return (
    <div className="w-full h-full grow overflow-x-auto">
      <table className={mergeClassName('w-full h-full divide-y', className)}>
        {children}
      </table>
    </div>
  );
});

Table.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
