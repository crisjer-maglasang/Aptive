import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  DropdownButton,
  FilterButton,
  AddFilterButton,
} from '@/modules/Housing/components/common';
import { AdjustmentsIcon } from '@heroicons/react/outline';
import { BedManagementSidebar, BedManagementTable } from '../components';
import { housingConstants } from '@/modules/Housing/lib';
import {
  requestComplexSummariesAsync,
  complexSummariesSelector,
} from '@/modules/Housing/redux/apartment';
import {
  requestTeamsSummariesAsync,
  teamsSummariesSelector,
} from '@/modules/Housing/redux/area';
import {
  requestBedManagementAsync,
  bedManagementDataSelector,
  bedManagementDataTotalSelector,
} from '@/modules/Housing/redux/bedManagement';
import { selectedSeasonSelector } from '@/modules/Housing/redux/season';
import { isBedManagementTableLoadingSelector } from '@/modules/Housing/redux/loading';
import { countNumberOfFilters } from '@/modules/Housing/modules/BedsHistory/lib';
import { bedManagementConstants } from '@/modules/Housing/lib';
import {
  parseFilters,
  parseViewFilter,
} from '@/modules/Housing/modules/BedManagement/lib';

const { initialPage, initialPageSize } = housingConstants;
const {
  SEASON_FILTER_LABEL,
  HOUSING_TYPE_FILTER_LABEL,
  ROOMS_FILTER_LABEL,
  BEDS_FILTER_LABEL,
  VIEW_BY_COMPLEX,
  VIEW_BY_TEAM,
} = bedManagementConstants;

const filterOptions = [
  {
    name: HOUSING_TYPE_FILTER_LABEL,
    subItems: [
      { value: 'Single' },
      { value: 'Single female' },
      { value: 'Married' },
      { value: 'Married office' },
      { value: 'M/OA' },
      { value: 'Not in apartments' },
      { value: 'Office apartment' },
    ],
  },
  {
    name: ROOMS_FILTER_LABEL,
    subItems: [
      { value: '1 bedroom' },
      { value: '2 bedrooms' },
      { value: '3 bedrooms' },
    ],
  },
  {
    name: BEDS_FILTER_LABEL,
    subItems: [{ value: '1 bed' }, { value: '2 beds' }, { value: '3 beds' }],
  },
  {
    name: SEASON_FILTER_LABEL,
    subItems: [
      { value: 'Pre season' },
      { value: 'Regular season' },
      { value: 'Post season' },
    ],
  },
];

const BedManagement = ({
  getBedManagement,
  bedManagementData,
  bedManagementDataTotal,
  isTableLoading,
  requestComplexSummaries,
  requestTeamsSummaries,
  complexes,
  teams,
  selectedSeason,
}) => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [selectedPage, setSelectedPage] = useState(initialPage);
  const [filterValueOptions, setFilterValueOptions] = useState([]);
  const [filters, setFilters] = useState([]);
  const [refreshSidebar, setRefreshSidebar] = useState(false);

  const count = countNumberOfFilters(selectedFilters);

  const viewOptions = [
    {
      onClick: () => setFilterValueOptions(complexes),
      label: VIEW_BY_COMPLEX,
      value: 'complex_ids',
      type: 'dropdown',
    },
    {
      onClick: () => {
        setFilterValueOptions(
          teams.map((team) => ({ name: team.label, value: team.value }))
        );
      },
      label: VIEW_BY_TEAM,
      value: 'team_ids',
      type: 'dropdown',
    },
  ];

  const viewOption = filters[0]?.type?.label ?? viewOptions[0].label;

  useEffect(() => {
    getBedManagementData();
  }, [selectedPage, pageSize, getBedManagement]);

  useEffect(() => {
    if (selectedPage !== initialPage) {
      setSelectedPage(initialPage);
    } else {
      getBedManagementData();
    }
  }, [selectedFilters, filters, selectedSeason]);

  const getBedManagementData = () => {
    getBedManagement({
      page: {
        number: selectedPage,
        size: pageSize,
      },
      ...parseFilters(selectedFilters),
      ...parseViewFilter(filters[0]),
      recruiting_season_id: selectedSeason.value,
    });
  };

  const refreshBedManagementPage = () => {
    setRefreshSidebar(!refreshSidebar);
    getBedManagementData();
  }

  useEffect(() => {
    requestComplexSummaries();
    requestTeamsSummaries();
  }, []);

  const onPageChange = useCallback(({ selected }) => {
    setSelectedPage(selected);
  }, []);

  return (
    <div className="grow p-6">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-gray-900 text-[32px] font-normal leading-10">
          Bed management
        </span>
        <div className="justify-end items-center gap-4 inline-flex">
          <AddFilterButton
            buttonClassName="px-2 py-1 rounded-2xl border border-gray-200 justify-start items-center gap-1 flex bg-white"
            label={viewOption}
            labelClassName="text-right text-xs font-normal font-['Inter'] leading-none"
            iconClassName="w-3 h-3 text-gray-900"
            filterTypeOptions={viewOptions}
            filterValueOptions={filterValueOptions}
            setFilters={setFilters}
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
          <DropdownButton
            options={[]}
            dropdownPosition="left"
            label="Download"
            onChange={() => {}}
          />
        </div>
      </div>
      <div className="w-full">
        <div className="float-left mr-4">
          <BedManagementSidebar
            viewOption={viewOption}
            selectedSeason={
              parseFilters(selectedFilters).season_period ?? 'regular_season'
            }
            refreshSidebar={refreshSidebar}
          />
        </div>
        <div className="grow">
          <BedManagementTable
            isLoading={isTableLoading}
            initialPage={initialPage}
            selectedPage={selectedPage}
            onPageChange={onPageChange}
            setPageSize={setPageSize}
            pageSize={pageSize}
            viewFilters={filters}
            setViewFilters={setFilters}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            bedDataTotal={bedManagementDataTotal}
            bedData={bedManagementData}
            refreshBedManagementPage={refreshBedManagementPage}
          />
        </div>
        <div className="clear-both" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  bedManagementData: bedManagementDataSelector(state),
  bedManagementDataTotal: bedManagementDataTotalSelector(state),
  isTableLoading: isBedManagementTableLoadingSelector(state),
  complexes: complexSummariesSelector(state),
  teams: teamsSummariesSelector(state),
  selectedSeason: selectedSeasonSelector(state),
});

const mapDispatchToProps = {
  getBedManagement: requestBedManagementAsync.request,
  requestComplexSummaries: requestComplexSummariesAsync.request,
  requestTeamsSummaries: requestTeamsSummariesAsync.request,
};

BedManagement.propTypes = {
  getBedManagement: PropTypes.func.isRequired,
  bedManagementData: PropTypes.array.isRequired,
  bedManagementDataTotal: PropTypes.number.isRequired,
  isTableLoading: PropTypes.bool,
  requestComplexSummaries: PropTypes.func,
  requestTeamsSummaries: PropTypes.func,
  complexes: PropTypes.array,
  teams: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(BedManagement);
