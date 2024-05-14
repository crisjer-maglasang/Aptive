import Paginator from '../pagination/Paginator';
import Table from './Table';

const PageableTable = ({
  leftControl,
  loading,
  rows,
  columns,
  sortParams,
  onSortChange,
  onPageChange,
  onSelect,
  pageSize,
  setPageSize,
  selectedPage,
  setSelectedPage,
  totalCount,
}) => {
  const onPageChangeClient = ({ selected }) => {
    const offset = pageSize * selected;
    const limit = pageSize;

    if (onPageChange) {
      // perform server side paging
      onPageChange({ selected, offset, limit });
    }

    setSelectedPage(selected);
  };

  return (
    <div>
      <div className="grid grid-cols-6 mb-5">
        <div className="col-start-1 col-end-3">
          {leftControl}
        </div>
      </div>
      <div className="w-full shadow overflow-hidden border border-gray-200 sm:rounded-lg">

        <Table
          loading={loading}
          onSelect={onSelect}
          columns={columns}
          rows={rows}
          sortParams={sortParams}
          onSortChange={onSortChange}
        />
        <Paginator
          rowCount={totalCount}
          pageSize={pageSize}
          setPageSize={setPageSize}
          onPageChange={onPageChangeClient}
          initialPage={1}
          selectedPage={selectedPage}
        />
      </div>
    </div>
  );
};

export default PageableTable;
