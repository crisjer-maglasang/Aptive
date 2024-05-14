import PropTypes from 'prop-types';
import { memo } from 'react';
import { mergeClassName } from '@/lib/utils';

export const TableCell = memo(({
  component: Tag,
  align,
  valign,
  colSpan,
  header,
  body,
  sorted,
  className,
  children,
}) => {
  const styles = mergeClassName(
    `min-w-max px-4 text-xs text-gray-600 text-${align} align-${valign} leading-4`,
    {
      'py-3 font-normal': header,
      'py-5 font-medium': body,
      'bg-gray-50': sorted,
    },
    className,
  );

  return (
    <Tag className={styles} colSpan={colSpan}>
      {children}
    </Tag>
  );
});

TableCell.defaultProps = {
  component: 'td',
  align: 'left',
  valign: 'middle',
};

TableCell.propTypes = {
  component: PropTypes.oneOf(['td', 'th']),
  align: PropTypes.oneOf(['center', 'left', 'right', 'justify']),
  valign: PropTypes.oneOf(['top', 'middle', 'bottom']),
  colSpan: PropTypes.number,
  header: PropTypes.bool,
  body: PropTypes.bool,
  sorted: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
