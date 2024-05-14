import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { FilterableRecruitTable, Loader } from '@/components';
import { StatsHeader } from '@/modules/dashboard/components';
import {
  requestDownlineAsync,
  allLeadsStatsHeaderDataSelector,
  downlineSelector,
  allLeadsFilteredCountSelector,
  requestExperienceOptionsAsync,
} from '@/redux/reps';
import { allLeadsStatsLoadingSelector, downlineLoadingSelector } from '@/redux/loading';
import { isAdminSelector, userRoleSelector } from '@/redux/auth';
import { requestContractStatsAsync } from '@/redux/contracts';
import { dashboardConstants } from '@/lib';
import { getAllLeadsStatsConstants } from '@/lib/constants';
import { dataKeys } from '@/lib/adapters';
import { useSortTable } from '@/hooks';
import { Profile, AddLead } from '../components/AllLeads';

const { RECRUIT } = dataKeys;

const AllLeads = ({
  // State
  downlineLoading,
  statsLoading,
  filteredCount,
  statsHeaderData,
  repsDownline,
  role,
  isAdmin,

  // Dispatch
  requestContractStats,
  requestDownline,
  requestExperienceOptions,
}) => {
  const initialSearchText = '';
  const initialSearchType = RECRUIT;
  const initialPageSize = 10;
  const initialPage = 1;

  const statsHeaderConstants = useMemo(() => getAllLeadsStatsConstants(isAdmin), [isAdmin]);

  const [currentRecruits, setCurrentRecruits] = useState(repsDownline);
  const [currentCount, setCurrentCount] = useState(filteredCount);
  const [tileSelected, setTileSelected] = useState(statsHeaderConstants[0].name);
  const [filters, setFilters] = useState(statsHeaderConstants[0].filterOptions.filter);
  const [searchText, setSearchText] = useState(initialSearchText);
  const [searchType, setSearchType] = useState(initialSearchType);
  const [selectedPage, setSelectedPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [recruitProfileOpen, setRecruitProfileOpen] = useState(false);
  const [addLeadOpen, setAddLeadOpen] = useState(false);
  const [selectedRecruit, setSelectedRecruit] = useState();
  const { getSortParam, sortQueryParams, onSortParamsChange, resetSorting } = useSortTable();

  const onSelectRecruit = ({ recruit }) => {
    setSelectedRecruit(recruit);
    setRecruitProfileOpen(true);
  };

  const onProfileClose = () => {
    setRecruitProfileOpen(false);
  };

  const onAddNewClick = () => {
    setAddLeadOpen(true);
  };

  const onAddLeadClose = ({ rep }) => {
    setAddLeadOpen(false);

    if (rep) {
      onSelectRecruit({ recruit: { ...rep } });
    }
  };

  const agreementFilterChange = (agreementType) => {
    setFilters({
      statuses: [...agreementType],
    });
  }

  const handleStatsTileClick = useCallback((name, filterOptions) => {
    setFilters(filterOptions.filter);
    setTileSelected(name);
    setSelectedPage(initialPage);
    resetSorting();
  }, [initialSearchType, resetSorting]);

  const requestDownlineParams = useMemo(() => ({
    ...(searchText && { search: searchText, search_type: searchType }),
    ...filters,
    ...(sortQueryParams && { sort: sortQueryParams }),
    page: { number: selectedPage, size: pageSize },
  }), [
    searchText,
    searchType,
    filters,
    sortQueryParams,
    selectedPage,
    pageSize,
  ]);

  useEffect(() => {
    requestContractStats();
  }, [requestContractStats]);

  useEffect(() => {
    requestDownline(requestDownlineParams);
    requestContractStats(requestDownlineParams);
    requestExperienceOptions();
  }, [
    requestDownline,
    requestDownlineParams,
    requestExperienceOptions,
  ]);

  useEffect(() => {
    setCurrentRecruits(repsDownline);
  }, [repsDownline]);

  useEffect(() => {
    setCurrentCount(filteredCount);
  }, [filteredCount]);

  return (
    <div className="px-8">
      <StatsHeader
        constants={statsHeaderConstants}
        data={statsHeaderData}
        selected={tileSelected}
        onTileClick={handleStatsTileClick}
        isDisabled={statsLoading}
      />

      {downlineLoading ? (
        <Loader />
      ) : (
        <div className="mt-5">
          <div className="flex flex-row-reverse">
            <button
              type="button"
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-aptivegreen hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aptivegreen"
              onClick={onAddNewClick}
            >
              {dashboardConstants.ADD_LEAD}
            </button>
          </div>
          <FilterableRecruitTable
            role={role}
            recruits={currentRecruits}
            onSelect={onSelectRecruit}
            tileSelected={tileSelected}
            searchText={searchText}
            setSearchText={setSearchText}
            searchType={searchType}
            setSearchType={setSearchType}
            getSortParam={getSortParam}
            onSortChange={onSortParamsChange}
            totalCount={currentCount}
            initialPage={initialPage}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            onAgreementChange={agreementFilterChange}
            filters={filters?.statuses}
          />
        </div>
      )}

      <Profile
        recruit={selectedRecruit}
        isOpen={recruitProfileOpen}
        onClose={onProfileClose}
      />
      <AddLead isOpen={addLeadOpen} onClose={onAddLeadClose} />
    </div>
  );
};

AllLeads.propTypes = {
  downlineLoading: PropTypes.bool,
  statsLoading: PropTypes.bool,
  // TODO: update type after reworking handleResponseError() at src/redux/helpers/create-request-saga.js
  errors: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  filteredCount: PropTypes.number,
  statsHeaderData: PropTypes.exact({
    agreementsSent: PropTypes.number,
    agreementsSigned: PropTypes.number,
    downlineCount: PropTypes.number,
    pendingSignature: PropTypes.number,
  }),
  repsDownline: PropTypes.array,
  role: PropTypes.string,
  isAdmin: PropTypes.bool,
  requestContractStats: PropTypes.func,
  requestDownline: PropTypes.func,
  onAgreementChange: PropTypes.func,
  requestExperienceOptions: PropTypes.func,
};

const mapStateToProps = (state) => ({
  downlineLoading: downlineLoadingSelector(state),
  statsLoading: allLeadsStatsLoadingSelector(state),
  filteredCount: allLeadsFilteredCountSelector(state),
  statsHeaderData: allLeadsStatsHeaderDataSelector(state),
  repsDownline: downlineSelector(state),
  role: userRoleSelector(state),
  isAdmin: isAdminSelector(state),
});

const mapDispatchToProps = {
  requestContractStats: requestContractStatsAsync.request,
  requestDownline: requestDownlineAsync.request,
  requestExperienceOptions: requestExperienceOptionsAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllLeads);
