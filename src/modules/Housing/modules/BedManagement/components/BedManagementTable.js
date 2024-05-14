import { Table } from '@/components';
import { FilterBadge } from '@/components/common';
import PropTypes from 'prop-types';
import { parseLabel } from '@/modules/Housing/modules/BedsHistory/lib';
import {
  getBedManagementHeadRows,
  parseBedManagementRows,
} from '@/modules/Housing/modules/BedManagement/lib';
import { useDraggable } from '@/modules/Housing/hooks';
import { unassignRepAsync, assignRepAsync } from '@/modules/Housing/redux/bedManagement';
import { unBeddedSummariesSelector } from '@/modules/Housing/redux/bedManagement';
import { connect } from 'react-redux';

const BedManagementTable = ({
  isLoading,
  selectedFilters,
  setSelectedFilters,
  pageSize,
  setPageSize,
  selectedPage,
  onPageChange,
  initialPage,
  bedData,
  bedDataTotal,
  viewFilters,
  setViewFilters,
  unassignRep,
  assignRep,
  refreshBedManagementPage,
  unBeddedData,
}) => {
  const { tableRef } = useDraggable(isLoading);

  const onClickUnassignSalesRep = (userInfo) => {
    const {complex_id, apartment_id, user_type, user_id} = userInfo;
    const { season_period } = selectedFilters;

    unassignRep({
      complexId: complex_id,
      apartmentId: apartment_id,
      user_id,
      user_type,
      season_period,
      successCallback: () => refreshBedManagementPage(),
    });
  };

  const onClickAssignSalesRep = (userInfo) => {
    const {complex_id, apartment_id, user_type, user_id} = userInfo;

    assignRep({
      complexId: complex_id,
      apartmentId: apartment_id,
      user_id,
      user_type,
      successCallback: () => refreshBedManagementPage(),
    });
  };

  const bedManagementRows = parseBedManagementRows(
    bedData,
    onClickUnassignSalesRep,
    onClickAssignSalesRep,
    unBeddedData,
  );

  const onDeleteFilter = (filterName) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      delete newFilters[filterName];
      return newFilters;
    });
  };

  const onDeleteViewFilter = (index) => {
    setViewFilters((prevFilters) => prevFilters.filter((_, i) => i !== index));
  };

  return (
    <div className="grow">
      {!isLoading && (
        <div className="mt-4 border border-solid border-gray-300 rounded-t-lg min-h-[56px] px-2 border-b-0 bg-white self-stretch flex items-center gap-2">
          <div className="flex gap-2 justify-center items-center">
            {viewFilters.length > 0 &&
              viewFilters.map((filter, index) => (
                <FilterBadge
                  key={index}
                  text={`${filter.type.label}: ${filter.value[0].label} ${
                    filter.value.length > 1 ? '...' : ''
                  } `}
                  className="bg-blue-50 text-blue-600"
                  onDelete={() => onDeleteViewFilter(index)}
                />
              ))}
            {Object.keys(selectedFilters).length > 0 &&
              Object.keys(selectedFilters).map(
                (key, index) =>
                  selectedFilters[key] && (
                    <FilterBadge
                      key={index}
                      className="bg-blue-50 text-blue-600"
                      text={parseLabel(selectedFilters, key)}
                      onDelete={() => onDeleteFilter(key)}
                    />
                  )
              )}
          </div>
        </div>
      )}
      <Table
        ref={tableRef}
        loading={isLoading}
        className="select-none"
        thead={{
          rows: getBedManagementHeadRows(),
          className: 'sticky top-0 z-10',
        }}
        tbody={{
          rows: bedManagementRows,
        }}
        paginator={{
          pageSize,
          setPageSize,
          onPageChange,
          selectedPage,
          initialPage,
          rowCount: bedDataTotal,
        }}
        wrapper={{
          style: { height: `calc(100vh - 260px)` },
          className: 'overflow-y-visible rounded-t-none relative',
        }}
      />
    </div>
  );
};

BedManagementTable.propTypes = {
  isLoading: PropTypes.bool,
  selectedFilters: PropTypes.object.isRequired,
  setSelectedFilters: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  setPageSize: PropTypes.func.isRequired,
  selectedPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  initialPage: PropTypes.number.isRequired,
  bedData: PropTypes.array.isRequired,
  bedDataTotal: PropTypes.number.isRequired,
  viewFilters: PropTypes.array.isRequired,
  setViewFilters: PropTypes.func.isRequired,
  unassignRep: PropTypes.func.isRequired,
  assignRep: PropTypes.func.isRequired,
  refreshBedManagementPage: PropTypes.func.isRequired,
  unBeddedData: PropTypes.array.isRequired,
};

const mapDispatchToProps = {
  unassignRep: unassignRepAsync.request,
  assignRep: assignRepAsync.request,
};

const mapStateToProps = (state) => ({
  unBeddedData: unBeddedSummariesSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(BedManagementTable);
