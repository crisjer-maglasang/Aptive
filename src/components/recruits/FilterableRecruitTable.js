import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useRecruitSearchTypeOptions } from '@/hooks';
import { dashboardConstants } from '@/lib/constants';
import { Table } from '@/components';
import { getAllLeadsHeadRows, parseAllLeadsRepRows } from '@/modules/dashboard/components';
import { SearchBar } from '@/components/common';
import AgreementFilter from 'src/modules/dashboard/components/AllLeads/AllLeadsTable/AgreementFilter';
import { dataKeys } from '@/lib/adapters';

const {
  ALL_LEADS_TYPE_FILTER_NAME,
  ALL_LEADS_SEARCH_NAME,
  AGMT_STATUS,
} = dashboardConstants;

const {
  AGREEMENTS_SENT_KEY,
  PENDING_SIGNATURE_KEY,
} = dataKeys;

const FilterableRecruitTable = ({
  role,
  recruits,
  onSelect,
  tileSelected,
  searchText,
  setSearchText,
  searchType,
  setSearchType,
  getSortParam,
  onSortChange,
  totalCount,
  initialPage,
  selectedPage,
  setSelectedPage,
  pageSize,
  setPageSize,
  onAgreementChange,
  filters,
}) => {
  const searchTypeOptions = useRecruitSearchTypeOptions(role);

  const handleSearchClick = useCallback(({ searchText, searchType }) => {
    setSearchText(searchText);
    setSearchType(searchType);
    setSelectedPage(initialPage);
  }, [
    setSearchText,
    setSearchType,
    setSelectedPage,
    initialPage,
  ]);

  const onPageChange = useCallback(({ selected }) => {
    setSelectedPage(selected);
  }, [setSelectedPage]);

  const repRows = parseAllLeadsRepRows(recruits, onSelect, tileSelected);

  return (
    <>
      <div className="mt-5 mb-7 flex justify-end items-center">
        <AgreementFilter
          text={AGMT_STATUS}
          onAgreementChange={onAgreementChange}
          filters={filters}
          disabled={tileSelected === AGREEMENTS_SENT_KEY || tileSelected === PENDING_SIGNATURE_KEY}
        />
        <SearchBar
          searchType={searchType}
          searchText={searchText}
          typeOptions={searchTypeOptions}
          inputName={ALL_LEADS_TYPE_FILTER_NAME}
          selectName={ALL_LEADS_SEARCH_NAME}
          onSearchClick={handleSearchClick}
          isSearchTypeSupported={!!searchTypeOptions.length}
        />
      </div>
      <Table
        thead={{
          rows: getAllLeadsHeadRows({ getSortParam, onSortChange, tileSelected }),
        }}
        tbody={{
          rows: repRows,
        }}
        paginator={{
          rowCount: totalCount,
          pageSize: pageSize,
          setPageSize: setPageSize,
          onPageChange: onPageChange,
          selectedPage: selectedPage,
          initialPage: initialPage,
        }}
      />
    </>
  );
};

FilterableRecruitTable.propTypes = {
  role: PropTypes.string,
  recruits: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func,
  tileSelected: PropTypes.string,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
  searchType: PropTypes.string,
  setSearchType: PropTypes.func,
  totalCount: PropTypes.number,
  initialPage: PropTypes.number,
  selectedPage: PropTypes.number,
  setSelectedPage: PropTypes.func,
  pageSize: PropTypes.number,
  setPageSize: PropTypes.func,
  getSortParam: PropTypes.func,
  onSortChange: PropTypes.func,
  filters: PropTypes.array,
};

export default FilterableRecruitTable;
