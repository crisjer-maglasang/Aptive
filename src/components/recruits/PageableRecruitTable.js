import Paginator from '../pagination/Paginator';
import RecruitTable from './RecruitTable';

const PageableRecruitTable = ({
  recruits,
  onPageChange,
  onSelect,
  pageSize,
  initialPage,
  selectedPage,
  totalCount,
  setPageSize,
  sort,
  setSort
}) => {
  const onPageChangeClient = ({ selected }) => {
    if (onPageChange) {
      onPageChange({ selected });
    }
  };

  return (
    <div>
      <RecruitTable onSelect={onSelect} recruits={recruits} sort={sort} setSort={setSort} />
      <Paginator
        rowCount={totalCount}
        pageSize={pageSize}
        onPageChange={onPageChangeClient}
        initialPage={initialPage}
        selectedPage={selectedPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default PageableRecruitTable;
