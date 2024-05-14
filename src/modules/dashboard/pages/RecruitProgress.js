import PropTypes from 'prop-types';
import { useEffect, useMemo, useState, createContext, useCallback } from 'react';
import { connect } from 'react-redux';
import { Loader, Paginator } from '@/components';
import {
  onboardingConstants,
} from '@/lib';
import { progressStatsConstants } from '@/lib/constants';
import { contractsRecruitsDataSelector, requestRecruitProgressStatsAsync } from '@/redux/contracts';

import {
  recruitersDataSelector,
  requestMyTreeUserContactAsync,
  requestRecruitProgressAsync,
  myTreePaginationFilteredCountSelector,
  requestRepStatusesAsync,
  myTreeSelector,
} from '@/redux/reps';

import {
  progressPageIsLoadingSelector,
  loadingRecruitProgressSelector,
} from '@/redux/loading';

import { isAdminSelector, isPartnerSelector, userRoleSelector } from '@/redux/auth';
import { SearchBar } from '@/components/common';
import dashboard from '@/lib/constants/dashboard';
import { StatsHeader } from '../components/StatsHeader';
import { RecruitProgressTable, UserProfile } from '../components';
import { useRecruitSearchTypeOptions } from '@/hooks';
import { dataKeys } from '@/lib/adapters';

const { RECRUIT } = dataKeys;

const RecruitProgressContext = createContext();

const { RECRUIT_ONBOARDING_PROGRESS } = onboardingConstants;
const { RECRUIT_PROGRESS_SEARCH_NAME, RECRUIT_PROGRESS_TYPE_FILTER_NAME } = dashboard;

const RecruitProgress = ({
  // State
  loading,
  recruitProgressLoading,
  filteredCount,
  statsHeaderData,
  recruitersData,
  reps,
  isAdmin,
  isPartner,

  // Dispatch
  requestRecruitProgressStats,
  requestRecruitProgress,
  requestMyTreeUserContact,
  requestRepStatuses,
  role,
}) => {
  const initialSearchText = '';
  const initialSearchType = RECRUIT;
  const initialPageSize = 10;
  const initialPage = 1;

  const searchTypeOptions = useRecruitSearchTypeOptions(role);

  const [currentCount, setCurrentCount] = useState(filteredCount);
  const [tileSelected, setTileSelected] = useState(progressStatsConstants[0].name);
  const [filters, setFilters] = useState(progressStatsConstants[0].filterOptions.filter);
  const [searchText, setSearchText] = useState(initialSearchText);
  const [searchType, setSearchType] = useState(initialSearchType);
  const [selectedPage, setSelectedPage] = useState(initialPage);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRecruit, setSelectedRecruit] = useState(null);
  const [receivedRep, setReceivedRep] = useState(null);

  const handleStatsTileClick = useCallback((name, filterOptions) => {
    setTileSelected(name);
    setFilters(filterOptions.filter);
    setSearchText(initialSearchText);
    setSearchType(initialSearchType);
    setSelectedPage(initialPage);

    // eslint consider the `initialSearchType` as a variable that value might be changed, however it's not true.
    // The `initialSearchType` assigned to constant and never change its value.
    // For this reason, disable the eslint warning.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchButtonClick = useCallback(({ searchText, searchType }) => {
    setSearchText(searchText);
    setSearchType(searchType);
    setSelectedPage(initialPage);
  }, []);

  const handlePageClick = useCallback(({ selected }) => {
    setSelectedPage(selected);
  }, [setSelectedPage]);

  const handleViewProfileClick = useCallback((recruit) => {
    setSelectedRecruit(recruit);
    setDrawerOpen(true);
  }, [setSelectedRecruit, setDrawerOpen]);

  const requestRecruitProgressParams = useMemo(() => ({
    ...(searchText && { search: searchText, search_type: searchType }),
    ...filters,
  }), [
    searchText,
    searchType,
    filters,
  ]);

  const reloadPageInfo = useCallback(() => {
    setSelectedPage(initialPage);
    requestRecruitProgressStats();
    requestRecruitProgress(requestRecruitProgressParams);
  }, [
    requestRecruitProgressStats,
    requestRecruitProgress,
    requestRecruitProgressParams,
  ]);

  useEffect(() => {
    requestRecruitProgressStats();
    requestRepStatuses();
  }, [requestRecruitProgressStats, requestRepStatuses]);

  useEffect(() => {
    requestRecruitProgress(requestRecruitProgressParams);
  }, [
    requestRecruitProgress,
    requestRecruitProgressParams,
  ]);

  useEffect(() => {
    setCurrentCount(filteredCount);
  }, [filteredCount]);

  useEffect(() => {
    if (selectedRecruit !== null) {
      requestMyTreeUserContact({ userId: selectedRecruit.id });
    }
  }, [selectedRecruit, requestMyTreeUserContact]);

  useEffect(() => {
    if (selectedRecruit !== null) {
      setReceivedRep(reps?.[selectedRecruit?.id]);
    }
  }, [reps, selectedRecruit]);

  const recruitProgressContextValue = useMemo(() => ({
    setOpen: setDrawerOpen,
    selectedRecruit,
    handleClick: handleViewProfileClick,
    open: drawerOpen,
    receivedRep,
    loading,
  }), [
    setDrawerOpen,
    selectedRecruit,
    handleViewProfileClick,
    drawerOpen,
    receivedRep,
    loading,
  ]);

  return (
    <div className="px-8">
      <StatsHeader
        constants={progressStatsConstants}
        data={statsHeaderData}
        selected={tileSelected}
        onTileClick={handleStatsTileClick}
        isDisabled={loading}
      />
      {recruitProgressLoading ? (
        <Loader />
      ) : (
        <div className="pt-4">
          <div className="pb-4 text-2xl font-semibold">
            {RECRUIT_ONBOARDING_PROGRESS}
          </div>
          <RecruitProgressContext.Provider value={recruitProgressContextValue}>
            <div className="mb-7 mt-1 flex justify-end items-center">
              <SearchBar
                searchType={searchType}
                searchText={searchText}
                typeOptions={searchTypeOptions}
                inputName={RECRUIT_PROGRESS_SEARCH_NAME}
                selectName={RECRUIT_PROGRESS_TYPE_FILTER_NAME}
                onSearchClick={handleSearchButtonClick}
                disabled={Boolean(loading)}
                isSearchTypeSupported
              />
            </div>
            <RecruitProgressTable
              recruitersData={recruitersData}
              offset={initialPageSize * (selectedPage - 1)}
              limit={initialPageSize}
            />
            <Paginator
              initialPage={initialPage}
              rowCount={currentCount}
              pageSize={initialPageSize}
              onPageChange={handlePageClick}
              selectedPage={selectedPage}
            />
            <UserProfile reloadPageInfo={reloadPageInfo} />
          </RecruitProgressContext.Provider>
        </div>
      )}
    </div>
  );
};

RecruitProgress.propTypes = {
  loading: PropTypes.bool,
  recruitProgressLoading: PropTypes.bool,
  filteredCount: PropTypes.number,
  statsHeaderData: PropTypes.exact({
    need_interview: PropTypes.number,
    onboarding_complete: PropTypes.number,
    pending: PropTypes.number,
    signed: PropTypes.number,
    true_signed: PropTypes.number,
  }),
  recruitersData: PropTypes.array,
  reps: PropTypes.object,
  isAdmin: PropTypes.bool,
  requestRecruitProgressStats: PropTypes.func,
  requestRecruitProgress: PropTypes.func,
  requestMyTreeUserContact: PropTypes.func,
  requestRepStatuses: PropTypes.func,
};

const mapStateToProps = (state) => ({
  loading: progressPageIsLoadingSelector(state),
  recruitProgressLoading: loadingRecruitProgressSelector(state),
  filteredCount: myTreePaginationFilteredCountSelector(state),
  statsHeaderData: contractsRecruitsDataSelector(state),
  recruitersData: recruitersDataSelector(state),
  reps: myTreeSelector(state),
  isAdmin: isAdminSelector(state),
  isPartner: isPartnerSelector(state),
  role: userRoleSelector(state),
});

const mapDispatchToProps = {
  requestRecruitProgressStats: requestRecruitProgressStatsAsync.request,
  requestRecruitProgress: requestRecruitProgressAsync.request,
  requestMyTreeUserContact: requestMyTreeUserContactAsync.request,
  requestRepStatuses: requestRepStatusesAsync.request,
};

export { RecruitProgressContext };

export default connect(mapStateToProps, mapDispatchToProps)(RecruitProgress);
