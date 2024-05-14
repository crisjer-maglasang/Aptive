import { Table } from '@/components';
import {
  getComplexHeadRows,
  parseComplexRows,
} from '@/modules/Housing/modules/ApartmentSetup/lib';
import { apartmentSetupConstants } from '@/modules/Housing/lib';
import { SearchBar } from '@/components/common';
import { useDraggable } from '@/modules/Housing/hooks';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { PATH } from '@/modules/Housing/routing/apartmentSetup';
import { resetSelectedApartmentAction } from '@/modules/Housing/redux/apartment';
import { connect } from 'react-redux';

const { APARTMENT_SEARCH_NAME } = apartmentSetupConstants;

const ComplexesTable = ({
  // Own Props
  initialPage,
  pageSize,
  setPageSize,
  selectedPage,
  onPageChange,
  teamsStatistics,
  teamsStatisticsTotal,
  complexesStatistics,
  complexesStatisticsTotal,
  viewOption,
  isLoading,
  onEditClick,
  searchValue,
  setSearchValue,
}) => {
  const { tableRef } = useDraggable(isLoading);

  const navigate = useNavigate();

  const { data: tableData, rows: tableRows } = parseComplexRows(
    viewOption === 'team' ? teamsStatistics : complexesStatistics,
    viewOption,
    onEditClick,
  );

  const handleSearchClick = ({ searchText }) => {
    setSearchValue(searchText);
  };

  const handleClickTableRow = (value) => {
    if (value) {
      navigate(`${PATH}/${viewOption === 'team' ? 'team' : 'complex'}/${value.id}`);
    }
  };

  return (
    <>
      {!isLoading && (
        <div className="mt-4 border border-solid border-gray-300 rounded-t-lg p-2 border-b-0 bg-white self-stretch flex items-center justify-between">
          <SearchBar
            searchText={searchValue}
            inputName={APARTMENT_SEARCH_NAME}
            onSearchClick={handleSearchClick}
          />
        </div>
      )}
      <Table
        ref={tableRef}
        loading={isLoading}
        thead={{ rows: getComplexHeadRows(viewOption) }}
        tbody={{
          rows: tableRows,
          hasHoverAction: true,
          classNames: 'hover:bg-gray-50 cursor-pointer',
          onSelect: handleClickTableRow,
          data: tableData,
        }}
        paginator={{
          pageSize,
          setPageSize,
          onPageChange,
          selectedPage,
          initialPage,
          rowCount:
            viewOption === 'team'
              ? teamsStatisticsTotal
              : complexesStatisticsTotal,
        }}
        wrapper={{
          className: 'overflow-y-visible rounded-t-none',
        }}
      />
    </>
  );
};

ComplexesTable.propTypes = {
  initialPage: PropTypes.number,
  pageSize: PropTypes.number,
  setPageSize: PropTypes.func,
  selectedPage: PropTypes.number,
  complexes: PropTypes.array,
  complexesTotal: PropTypes.number,
  getComplexes: PropTypes.func,
  isLoading: PropTypes.bool,
  onPageChange: PropTypes.func,
};

const mapDispatchToProps = {
  resetSelected: resetSelectedApartmentAction,
};

export default connect(null, mapDispatchToProps)(ComplexesTable);
