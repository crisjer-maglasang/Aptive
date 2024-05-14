import { CustomButton } from '@/components';
import { dashboardConstants } from '@/lib';
import {
  computeRequestFilters,
  SalesOperationsExport,
  SalesOperationsFilters,
  SalesOperationsFilterTags,
  SalesOperationsRepsTable,
  SalesOperationsStats,
  SummerDropdownFilter,
  defaultFilters,
  normalizeRequestFilters,
  FILTER_NAMES,
} from '@/modules/dashboard/components';
import {
  repStatusesSelector,
  requestExperienceOptionsAsync,
  requestRepStatusesAsync,
  requestApartmentStatusesAsync,
} from '@/redux/reps';
import { isEqual } from 'lodash-es';
import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { SearchBar } from '@/components/common';
import { requestSoRepsAsync } from '@/redux/sales-operations';
import { soRepsLoadingSelector } from '@/redux/loading';
import PropTypes from 'prop-types';
import { userRoleSelector } from '@/redux/auth';
import { useRecruitSearchTypeOptions } from '@/hooks';
import { dataKeys } from '@/lib/adapters';

const { RECRUIT } = dataKeys;
const initialPage = 1;
const initialPageSize = 10;
const initialSearchType = RECRUIT;

const SalesOperations = ({
  repsLoading,
  requestExperienceOptions,
  requestApartmentStatuses,
  requestRepStatuses,
  getReps,
  role,
  repStatuses,
}) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFiltersRaw] = useState(defaultFilters);
  const [requestFilters, setRequestFilters] = useState(computeRequestFilters(defaultFilters));
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [selectedPage, setSelectedPage] = useState(initialPage);
  const [searchText, setSearchText] = useState('');
  const [searchType, setSearchType] = useState(initialSearchType);

  const searchTypeOptions = useRecruitSearchTypeOptions(role);

  const getRepsWithFilters = () => {
    const params = {
      page: {
        number: selectedPage,
        size: pageSize,
      },
      filter: {},
    };

    const normalizedFilters = normalizeRequestFilters(requestFilters);
    normalizedFilters.forEach(({ name, value }) => {
      params.filter[name] = value;
    });

    if (searchText) {
      params.filter.search = searchText;
      params.filter.search_type = searchType;
    }

    getReps(params);
  };

  useEffect(() => {
    getRepsWithFilters();
  }, [requestFilters, pageSize, searchText, searchType, selectedPage]);

  useEffect(() => {
    requestExperienceOptions();
    requestRepStatuses();
    requestApartmentStatuses();
  }, [requestExperienceOptions, requestRepStatuses, requestApartmentStatuses]);

  const onSearchClick = useCallback(({ searchText, searchType }) => {
    setSearchText(searchText);
    setSearchType(searchType);
    setSelectedPage(initialPage);
  }, []);

  const onPageChange = useCallback(({ selected }) => {
    setSelectedPage(selected);
  }, []);

  const setFilters = useCallback((nextFilters) => {
    const nextRequestFilters = computeRequestFilters(nextFilters);

    if (!isEqual(filters, nextFilters)) {
      setFiltersRaw(nextFilters);
    }

    if (!isEqual(requestFilters, nextRequestFilters)) {
      setRequestFilters(nextRequestFilters);
    }
  }, [filters, requestFilters]);

  const toggleFiltersModal = useCallback(() => {
    setFiltersOpen(!filtersOpen);
  }, [filtersOpen]);

  return (
    <>
      <div className="px-8 py-3.5 bg-white border-b">
        <div className="flex items-center">
          <div className="shrink-0 text-gray-900 font-semibold">
            {dashboardConstants.SALES_OPERATIONS}
          </div>
          <SalesOperationsFilterTags
            filters={filters}
            setFilters={setFilters}
            getText={(name, value) => name === FILTER_NAMES.STATUS
              ? repStatuses.find((repStatus) => repStatus.statusCode === value)?.statusTitle
              : value}
          />
          <div className="flex ml-auto space-x-2">
            <SummerDropdownFilter
              filters={filters}
              setFilters={setFilters}
            />
            <CustomButton
              color="white"
              onClick={toggleFiltersModal}
              className="px-6 text-gray-500 font-normal"
            >
              {dashboardConstants.FILTERS}
            </CustomButton>
            <SalesOperationsExport
              requestFilters={requestFilters}
              search={searchText}
              searchType={searchType}
            />
          </div>
        </div>
      </div>
      <div className="px-8">
        <SalesOperationsStats
          requestFilters={requestFilters}
          filters={filters}
          setFilters={setFilters}
          searchText={searchText}
          searchType={searchType}
        />
        <div className="mt-6 mb-7 flex justify-end items-center">
          <SearchBar
            searchType={searchType}
            searchText={searchText}
            typeOptions={searchTypeOptions}
            inputName={dashboardConstants.REP_SEARCH_NAME}
            selectName={dashboardConstants.REP_TYPE_FILTER_NAME}
            disabled={Boolean(repsLoading)}
            onSearchClick={onSearchClick}
            isSearchTypeSupported={!!searchTypeOptions.length}
          />
        </div>
        <SalesOperationsRepsTable
          getReps={getRepsWithFilters}
          pageSize={pageSize}
          setPageSize={setPageSize}
          onPageChange={onPageChange}
          selectedPage={selectedPage}
          initialPage={initialPage}
          recruitingSeasonId={filters?.recruitingSeason}
        />
      </div>
      <SalesOperationsFilters
        modalOpen={filtersOpen}
        closeModal={toggleFiltersModal}
        filters={filters}
        setFilters={setFilters}
        defaultFilters={defaultFilters}
      />
    </>
  );
};

SalesOperations.propTypes = {
  repsLoading: PropTypes.bool,
  getReps: PropTypes.func,
  requestExperienceOptions: PropTypes.func,
  requestApartmentStatuses: PropTypes.func,
  requestRepStatuses: PropTypes.func,
  role: PropTypes.string,
  repStatuses: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => ({
  repsLoading: soRepsLoadingSelector(state),
  role: userRoleSelector(state),
  repStatuses: repStatusesSelector(state),
});

const mapDispatchToProps = {
  getReps: requestSoRepsAsync.request,
  requestExperienceOptions: requestExperienceOptionsAsync.request,
  requestApartmentStatuses: requestApartmentStatusesAsync.request,
  requestRepStatuses: requestRepStatusesAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesOperations);
