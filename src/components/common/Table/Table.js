import { Loader, Paginator } from '@/components';
import PropTypes from 'prop-types';
import { forwardRef, isValidElement } from 'react';
import { Props, TableHead, TableBody, TableFoot } from '.';

const Table = forwardRef(
  (
    { loading, loader, wrapper, thead, tbody, tfoot, paginator, ...props },
    ref
  ) =>
    loading ? (
      <Loader {...new Props(loader).withClassName('py-16')} />
    ) : (
      <div
        ref={ref}
        {...new Props(wrapper).withClassName('border rounded-lg overflow-auto')}
      >
        <table
          {...new Props(props).withClassName('min-w-full divide-y bg-white')}
        >
          {thead && (isValidElement(thead) ? thead : <TableHead {...thead} />)}
          {tbody && (isValidElement(tbody) ? tbody : <TableBody {...tbody} />)}
          {tfoot && (isValidElement(tfoot) ? tfoot : <TableFoot {...tfoot} />)}
        </table>
        {paginator &&
          (isValidElement(paginator) ? (
            paginator
          ) : (
            <Paginator
              {...{ className: 'sticky inset-x-0 bottom-0', ...paginator }}
            />
          ))}
      </div>
    )
);

Table.defaultProps = {
  loading: false,
  loader: {},
  wrapper: {},
};

Table.propTypes = {
  loading: PropTypes.bool,
  loader: PropTypes.object,
  wrapper: PropTypes.object,
  thead: PropTypes.oneOfType([PropTypes.object, PropTypes.element]),
  tbody: PropTypes.oneOfType([PropTypes.object, PropTypes.element]),
  tfoot: PropTypes.oneOfType([PropTypes.object, PropTypes.element]),
  paginator: PropTypes.oneOfType([PropTypes.object, PropTypes.element]),
};

export default Table;
