import {
  DropdownButton,
  FilterButton,
} from '@/modules/Housing/components/common';
import { Loader } from '@/components/common';
import { AdjustmentsIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';
import { useEffect, useState, useCallback, useMemo } from 'react';
import BedsHistoryTable from '../components/BedsHistoryTable';
import { connect, useDispatch } from 'react-redux';
import {
  requestBedsHistoryAsync,
  exportBedsHistoriesAsync,
  bedsHistoryListSelector,
  bedsHistoryTotalSelector,
} from '@/modules/Housing/redux/bedsHistory';
import {
  isBedsHistoryLoadingSelector,
  isBedsHistoryExportLoadingSelector,
} from '@/modules/Housing/redux/loading';
import {
  parseFilters,
  countNumberOfFilters,
} from '@/modules/Housing/modules/BedsHistory/lib';
import {
  requestTeamsSummariesAsync,
  teamsSummariesSelector,
} from '@/modules/Housing/redux/area';
import {
  requestComplexSummariesAsync,
  complexSummariesSelector,
  apartmentSummariesSelector,
  requestApartmentSummariesAsync,
} from '@/modules/Housing/redux/apartment';
import { bedsHistoryConstants } from '@/modules/Housing/lib';

const {
  USER_TYPE_FILTER__LABEL,
  TEAM_FILTER__LABEL,
  SEASON_FILTER__LABEL,
  COMPLEX_FILTER__LABEL,
  UNIT_FILTER__LABEL,
  BED_TYPE_FILTER__LABEL,
  MOVE_TYPE_FILTER__LABEL,
  DATE_RANGE_FILTER__LABEL,
  VIEW_BY_USER,
} = bedsHistoryConstants;

const initialPage = 1;
const initialPageSize = 10;

const filterOptions = [
  {
    name: USER_TYPE_FILTER__LABEL,
    subItems: [{ value: 'Service Pro' }, { value: 'Sales Rep' }],
  },
  {
    name: TEAM_FILTER__LABEL,
    subItems: 'searchForm',
  },
  {
    name: SEASON_FILTER__LABEL,
    subItems: [
      { value: 'Pre season' },
      { value: 'Regular season' },
      { value: 'Post season' },
    ],
  },
  {
    name: COMPLEX_FILTER__LABEL,
    subItems: 'searchForm',
  },
  {
    name: UNIT_FILTER__LABEL,
    subItems: 'searchForm',
  },
  {
    name: BED_TYPE_FILTER__LABEL,
    subItems: [{ value: 'Bed' }, { value: 'Couch' }],
  },
  {
    name: MOVE_TYPE_FILTER__LABEL,
    subItems: [{ value: 'Assigned' }, { value: 'Unassigned' }],
  },
  {
    name: DATE_RANGE_FILTER__LABEL,
    subItems: 'dateRange',
  },
];

const downloadOptions = [
  {
    format: 'csv',
    label: 'Download CSV',
    action: exportBedsHistoriesAsync.request,
  },
  {
    format: 'xlsx',
    label: 'Download Excel',
    action: exportBedsHistoriesAsync.request,
  },
];

const BedsHistory = ({
  getBedsHistory,
  bedsHistories,
  bedsHistoryTotal,
  isHistoryTableLoading,
  isExportLoading,
  teams,
  complexes,
  apartments,
  requestTeamsSummaries,
  requestComplexSummaries,
  requestApartmentSummaries,
}) => {
  const dispatch = useDispatch();
  const [viewOption, setViewOption] = useState('user');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [selectedPage, setSelectedPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const count = countNumberOfFilters(selectedFilters);

  const teamOptions = useMemo(() => {
    if (!teams) {
      return [];
    }

    return teams.map((team) => ({
      name: team?.label,
      value: team?.value,
    }));
  }, [teams]);

  const apartmentOptions = useMemo(() => {
    if (!apartments) {
      return [];
    }

    return apartments.map((apartment) => ({
      name: apartment?.label,
      value: apartment?.value,
    }));
  }, [apartments]);

  useEffect(() => {
    requestTeamsSummaries();
    requestComplexSummaries();
    requestApartmentSummaries();
  }, []);

  useEffect(() => {
    getBedsHistory({
      page: {
        number: selectedPage,
        size: pageSize,
      },
      ...parseFilters(
        selectedFilters,
        teamOptions,
        complexes,
        apartmentOptions
      ),
      ...(searchValue && { search_query: searchValue }),
    });
  }, [getBedsHistory, selectedPage, pageSize]);

  useEffect(() => {
    if (selectedPage !== initialPage) {
      setSelectedPage(initialPage);
    } else {
      getBedsHistory({
        page: {
          number: initialPage,
          size: pageSize,
        },
        ...parseFilters(
          selectedFilters,
          teamOptions,
          complexes,
          apartmentOptions
        ),
        ...(searchValue && { search_query: searchValue }),
      });
    }
  }, [selectedFilters, searchValue]);

  const handleHistoryDownload = (option) => {
    if (option) {
      const params = {
        format: option.format,
        page: {
          number: selectedPage,
          size: pageSize,
        },
        ...parseFilters(selectedFilters, teamOptions, complexes, apartmentOptions),
        ...(searchValue && { search_query: searchValue }),
      };
      dispatch(option.action(params));
    }
  };

  const onPageChange = useCallback(({ selected }) => {
    setSelectedPage(selected);
  }, []);

  return (
    <div className="grow p-6">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-gray-900 text-[32px] font-normal leading-10">
          Bed management history
        </span>
        <div className="justify-end items-center gap-4 inline-flex">
          <DropdownButton
            label={viewOption === 'user' ? VIEW_BY_USER : '...'}
          />
          <FilterButton
            options={filterOptions}
            label={
              <div className="gap-1 inline-flex items-center">
                <AdjustmentsIcon className="w-3 h-3" />
                {count > 0 ? `Filters (${count})` : 'Filters'}
              </div>
            }
            setSelectedFilters={setSelectedFilters}
            selectedFilters={selectedFilters}
          />
          {isExportLoading ? (
            <Loader className="mx-6" />
          ) : (
            <DropdownButton
              options={downloadOptions}
              label="Download"
              onChange={handleHistoryDownload}
              dropdownPosition="left"
            />
          )}
        </div>
      </div>
      <BedsHistoryTable
        bedsHistories={bedsHistories}
        bedsHistoryTotal={bedsHistoryTotal}
        pageSize={pageSize}
        setPageSize={setPageSize}
        selectedPage={selectedPage}
        initialPage={initialPage}
        isLoading={isHistoryTableLoading}
        onPageChange={onPageChange}
        setSelectedFilters={setSelectedFilters}
        selectedFilters={selectedFilters}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  bedsHistories: bedsHistoryListSelector(state),
  bedsHistoryTotal: bedsHistoryTotalSelector(state),
  isHistoryTableLoading: isBedsHistoryLoadingSelector(state),
  isExportLoading: isBedsHistoryExportLoadingSelector(state),
  teams: teamsSummariesSelector(state),
  complexes: complexSummariesSelector(state),
  apartments: apartmentSummariesSelector(state),
});

const mapDispatchToProps = {
  getBedsHistory: requestBedsHistoryAsync.request,
  requestTeamsSummaries: requestTeamsSummariesAsync.request,
  requestComplexSummaries: requestComplexSummariesAsync.request,
  requestApartmentSummaries: requestApartmentSummariesAsync.request,
};

BedsHistory.propTypes = {
  getBedsHistory: PropTypes.func.isRequired,
  bedsHistories: PropTypes.array.isRequired,
  bedsHistoryTotal: PropTypes.number.isRequired,
  isHistoryTableLoading: PropTypes.bool,
  isExportLoading: PropTypes.bool,
  teams: PropTypes.array,
  complexes: PropTypes.array,
  apartments: PropTypes.array,
  requestTeamsSummaries: PropTypes.func.isRequired,
  requestComplexSummaries: PropTypes.func.isRequired,
  requestApartmentSummaries: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BedsHistory);
