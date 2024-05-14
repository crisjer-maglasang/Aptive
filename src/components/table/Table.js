import TableRow from './TableRow';
import { Loader, SortLabel } from '@/components';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

const Table = ({
  loading,
  columns,
  rows,
  onSelect,
  sortParams,
  onSortChange,
}) => {
  const tableRows = [];

  if (rows) {
    rows.forEach((thisRow) => {
      const key = uuidv4();
      tableRows.push(
        <TableRow
          row={thisRow}
          key={key}
          onClick={onSelect}
        />,
      );
    });
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {columns.map(({ id, width, align, sortable, text }) => {
              return (
                <th
                  key={id}
                  className={classNames(
                    width && `w-${width}`,
                    `whitespace-nowrap px-3 py-2 bg-gray-50 text-xs text-gray-600 uppercase font-normal text-${align}`,
                  )}
                >
                  {sortable
                    ? (
                      <SortLabel
                        sortName={id}
                        selectedSortName={sortParams?.name}
                        sortOrder={sortParams?.order}
                        onSortChange={onSortChange}
                        className={`w-full ${align === 'left' ? 'justify-start' : 'justify-end'}`}
                      >
                        {text}
                      </SortLabel>
                    )
                    : text}
                </th>
              );
            })}
          </tr>
        </thead>
        {!loading && <tbody className="bg-white divide-y divide-gray-200">{tableRows}</tbody>}
      </table>
      {loading && (
        <div className="align-middle pt-10 h-96">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Table;
