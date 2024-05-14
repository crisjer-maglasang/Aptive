import SidebarHeader from './SidebarHeader';
import SidebarCard from './SidebarCard';
import { SearchBar } from '@/components/common';
import { housingConstants } from '@/modules/Housing/lib/constants';
import { CustomFormElement } from '@/components';
import { Loader } from '@/components/common';
import { useDraggable } from '@/modules/Housing/hooks';
import { addFsExcludeClass } from '@/lib/utils';
import classNames from 'classnames';
import {
  defaultSelectOption,
  bedManagementConstants,
} from '@/modules/Housing/lib';
import { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  requestTeamsSummariesAsync,
  teamsSummariesSelector,
} from '@/modules/Housing/redux/area';
import {
  requestComplexSummariesAsync,
  complexSummariesSelector,
} from '@/modules/Housing/redux/apartment';
import {
  requestUnBeddedSummariesAsync,
  unBeddedSummariesSelector,
} from '@/modules/Housing/redux/bedManagement';
import { isBedManagementSidebarLoadingSelector } from '@/modules/Housing/redux/loading';
import PropTypes from 'prop-types';

const {
  TEAM_LABEL,
  TEAM_NAME,
  COMPLEX_LABEL,
  COMPLEX_NAME,
  SEARCH_SPS__NAME,
  SEARCH_REPS__NAME,
  SEARCH_REPS__LABEL,
  SEARCH_SPS__LABEL,
  VIEW_BY_COMPLEX,
  VIEW_BY_TEAM,
} = bedManagementConstants;

const Sidebar = ({
  viewOption,
  requestComplexSummaries,
  complexes,
  requestTeamsSummaries,
  teams,
  requestUnBeddedSummaries,
  unBeddedSummaries,
  isLoading,
  selectedSeason,
  refreshSidebar,
}) => {
  const [selectedFilter, setSelectedFilter] = useState({
    team_id: '',
    complex_id: '',
  });
  const [selectedSearch, setSelectedSearch] = useState('');
  const [selectedBedAllotmentType, setSelectedBedAllotmentType] =
    useState('rep');

  const { tableRef } = useDraggable(isLoading);

  useEffect(() => {
    requestUnBeddedSummaries({
      bed_allotment_type: selectedBedAllotmentType,
      search_query: selectedSearch,
      season_period: selectedSeason,
      ...selectedFilter,
    });
  }, [
    requestUnBeddedSummaries,
    selectedFilter,
    selectedBedAllotmentType,
    selectedSearch,
    selectedSeason,
    refreshSidebar,
  ]);

  useEffect(() => {
    setSelectedFilter((prevState) => {
      return { ...prevState, team_id: '', complex_id: '' };
    });
    setSelectedSearch('');
  }, [viewOption]);

  useEffect(() => {
    const params = {
      season_period: selectedSeason,
    };
    if (viewOption === VIEW_BY_COMPLEX) {
      requestTeamsSummaries(params);
    } else {
      requestComplexSummaries(params);
    }
  }, [
    requestComplexSummaries,
    requestTeamsSummaries,
    viewOption,
    selectedSeason,
  ]);

  const parseTeams = useCallback(() => {
    return teams.map((team) => ({
      name: team.label,
      value: team.value,
    }));
  }, [teams]);

  const handleHeaderChange = useCallback(
    (value) => () => {
      setSelectedBedAllotmentType(value);
      setSelectedFilter((prevState) => {
        return { ...prevState, team_id: '', complex_id: '' };
      });
      setSelectedSearch('');
    },
    [setSelectedBedAllotmentType, setSelectedFilter, setSelectedSearch]
  );

  const handleSearchClick = ({ searchText }) => {
    setSelectedSearch(searchText);
  };

  const onChangeHandler = useCallback(
    (event) => {
      const { name, value } = event.target;

      setSelectedFilter((prevState) => {
        return { ...prevState, [name]: value };
      });
    },
    [setSelectedFilter]
  );

  return (
    <div className="w-[330px] h-full border border-gray-200 rounded-lg bg-white">
      <SidebarHeader
        onChange={handleHeaderChange}
        selectedBedAllotmentType={selectedBedAllotmentType}
      />
      <div className="flex flex-col gap-6 p-6 mb-16">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <CustomFormElement
              id={viewOption === VIEW_BY_COMPLEX ? TEAM_NAME : COMPLEX_NAME}
              name={viewOption === VIEW_BY_COMPLEX ? TEAM_NAME : COMPLEX_NAME}
              label={
                viewOption === VIEW_BY_COMPLEX ? TEAM_LABEL : COMPLEX_LABEL
              }
              colSpan={3}
              type="select"
              selectOptions={
                viewOption === VIEW_BY_COMPLEX
                  ? [...defaultSelectOption, ...parseTeams(teams)]
                  : [...defaultSelectOption, ...complexes]
              }
              onChange={onChangeHandler}
              className={addFsExcludeClass()}
              value={
                selectedFilter[
                  viewOption === VIEW_BY_COMPLEX ? 'team_id' : 'complex_id'
                ]
              }
            />
            <SearchBar
              searchText={selectedSearch}
              inputName={
                selectedBedAllotmentType === 'rep'
                  ? SEARCH_REPS__NAME
                  : SEARCH_SPS__NAME
              }
              label={
                selectedBedAllotmentType === 'rep'
                  ? SEARCH_REPS__LABEL
                  : SEARCH_SPS__LABEL
              }
              onSearchClick={handleSearchClick}
              labelClassName="text-sm font-medium text-gray-700 mb-0.5"
              inputClassName="shadow-sm block sm:text-sm border-r-0 rounded-md rounded-r-none border-gray-300 focus:border-aptivegreen focus:border-r focus:border-r-aptivegreen focus:outline-none focus:ring-1 focus:ring-aptivegreen"
              iconClassName="border-l-0 rounded-l-none shadow-sm border-gray-300"
            />
            <div
              className={classNames(
                'h-[392px] overflow-y-auto divide-y no-scrollbar',
                unBeddedSummaries.length === 0 &&
                  'flex justify-center items-center'
              )}
              ref={tableRef}
            >
              {unBeddedSummaries.length
                ? unBeddedSummaries.map((summary) => (
                    <SidebarCard key={summary.id} {...summary} />
                  ))
                : housingConstants.NO_DATA_TO_DISPLAY}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  complexes: complexSummariesSelector(state),
  teams: teamsSummariesSelector(state),
  unBeddedSummaries: unBeddedSummariesSelector(state),
  isLoading: isBedManagementSidebarLoadingSelector(state),
});

const mapDispatchToProps = {
  requestComplexSummaries: requestComplexSummariesAsync.request,
  requestTeamsSummaries: requestTeamsSummariesAsync.request,
  requestUnBeddedSummaries: requestUnBeddedSummariesAsync.request,
};

Sidebar.propTypes = {
  viewOption: PropTypes.string,
  requestComplexSummaries: PropTypes.func,
  complexes: PropTypes.array,
  requestTeamsSummaries: PropTypes.func,
  teams: PropTypes.array,
  requestUnBeddedSummaries: PropTypes.func,
  unBeddedSummaries: PropTypes.array,
  isLoading: PropTypes.bool,
  selectedSeason: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
