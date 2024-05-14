import PropTypes from 'prop-types';
import { memo } from 'react';
import { mergeClassName } from '@/lib/utils';

export const TableRow = memo(({ hovered, header, body, role, className, children, onClick }) => {
  const styles = mergeClassName(
    '',
    {
      'bg-gray-50 uppercase': header,
      'odd:bg-gray-50': body,
      'hover:bg-gray-50': hovered,
    },
    className,
  );

  const onRowClick = () => {
    if (role === 'button' && onClick) {
      onClick();
    }
  };

  return (
    <tr className={styles} role={role} onClick={onRowClick}>
      {children}
    </tr>
  );
});

TableRow.propTypes = {
  hovered: PropTypes.bool,
  body: PropTypes.bool,
  header: PropTypes.bool,
  role: PropTypes.oneOf(['button']),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};
