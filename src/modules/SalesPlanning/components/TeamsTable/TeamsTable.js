import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, CustomButton, Loader } from '@/components';
import { requestAreasListAsync, selectAreasList } from '@/redux/areas-new';
import { requestTeamsAsync } from '@/redux/teams';

import { sptConstants } from '../../lib';
import FilterableTable from '@/components/table/FilterableTable';
import { StatelessSearchDropdown } from '@/components/common/inputs';
import { userSelector } from '@/redux/auth';

const columns = [
  {
    align: 'right',
    width: 32,
    text: sptConstants.TEAM_CODE,
    sortable: true,
    id: 'team_id',
  },
  {
    align: 'left',
    text: sptConstants.TEAM_NAME,
    sortable: true,
    id: 'team_name',
  },
  {
    align: 'right',
    text: sptConstants.AREA_ID,
    sortable: true,
    id: 'area_id',
  },
  {
    align: 'left',
    text: sptConstants.AREA_NAME,
    sortable: true,
    id: 'area_name',
  },
  {
    align: 'right',
    text: sptConstants.TOTAL_REPS,
    sortable: true,
    id: 'total_reps',
  },
  {
    align: 'right',
    text: sptConstants.ACTIVE,
    sortable: true,
    id: 'active_customers',
  },
  {
    align: 'right',
    text: sptConstants.INACTIVE,
    sortable: true,
    id: 'inactive_customers',
  },
  {
    align: 'right',
    text: sptConstants.QUALIFIED_ADDRESSES,
    sortable: true,
    id: 'qualified_addresses',
  },
  {
    align: 'left',
    width: 24,
    text: '',
    sortable: false,
    id: 'view_map',
  },
  {
    align: 'left',
    width: 24,
    text: '',
    sortable: false,
    id: 'view_polygons',
  },
];

const TeamsTable = ({
  getTeams,
  getAreasList,
  areasList,
  user,
  loading,
  teamRows,
  totalCount,
}) => {
  const [areaId, setAreaId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [selectedPage, setSelectedPage] = useState(1);
  const [selection, setSelection] = useState(null);
  const [sortParams, setSortParams] = useState({ name: 'area_id', order: 'asc' });

  const areaOptions = () => {
    const options = areasList.map(({ area_id, area_name }) => ({
      name: area_name,
      value: area_id,
    }));

    return [{ name: sptConstants.ALL_AREAS, value: '' }, ...options];
  };

  function onFilterClick() {
    setAreaId(selection.value);
    setSelectedPage(1);
  }
  function onAreaChange(area) {
    setSelection(area);
  }
  function updateTable() {
    const params = {
      order: sortParams.order,
      sort_by: sortParams.name,
      limit: pageSize,
      page: selectedPage,
    };

    if(searchText) {
      params.search = searchText;
    }

    if(areaId) {
      params.area_id = areaId;
    }

    getTeams(params);
  }

  const AreaSelection = () => {
    return loading ?
      <Loader />
      : (
        <StatelessSearchDropdown
          displayProp="name"
          className="w-full md:w-56"
          label={sptConstants.FILTER_BY_AREAS}
          items={areaOptions()}
          onChange={onAreaChange}
          selected={selection}
          button={
            <Button onClick={onFilterClick}>{sptConstants.FILTER}</Button>
          }
        />
      );
  };

  useEffect(() => {
    updateTable();
  }, [user, areaId, pageSize, sortParams, selectedPage, searchText]);

  useEffect(() => {
    getAreasList();
  }, [user]);

  return (
    <FilterableTable
      leftControl={<AreaSelection />}
      loading={loading}
      columns={columns}
      rows={teamRows}
      pageSize={pageSize}
      setPageSize={setPageSize}
      sortParams={sortParams}
      onSortChange={setSortParams}
      onSearch={updateTable}
      searchPlaceholder={sptConstants.SEARCH_TEAMS}
      searchText={searchText}
      setSearchText={setSearchText}
      selectedPage={selectedPage}
      setSelectedPage={setSelectedPage}
      totalCount={totalCount}
    />
  );
};

// Redux
const mapStateToProps = (state) => {
  const { loading, teams } = state;

  // Format teams response into rows for the table
  const teamRows = [];
  let totalCount = 0;

  if(teams && teams.teams) {
    totalCount = teams.teams.data.total;

    for(const thisRow of teams.teams.data.data) {
      const mapUrl = `/sales-planning/team/${thisRow.team_id}`;
      const polygonUrl = `/sales-planning/polygons/team/${thisRow.team_id}`;

      const rowData = [
        thisRow.team_id,
        thisRow.team_name,
        thisRow.area_id,
        thisRow.area_name,
        thisRow.statistics.total_reps,
        thisRow.statistics.active_customers,
        thisRow.statistics.inactive_customers,
        thisRow.statistics.total_qualified_addresses,
      ];

      // Disable any links for teams that have no boundaries (which means no zipcode assignments and nothing to show)
      if(!thisRow.boundary) {
        rowData.push(<span className="cursor-default text-center text-disabled">{sptConstants.VIEW_MAP}</span>);
        rowData.push(<span className="cursor-default text-center text-disabled">{sptConstants.VIEW_POLYGONS}</span>);
      } else {
        rowData.push(<Link className="text-center text-primary-300" to={mapUrl}>{sptConstants.VIEW_MAP}</Link>);
        rowData.push(<Link className="text-center text-primary-300" to={polygonUrl}>{sptConstants.VIEW_POLYGONS}</Link>);
      }

      teamRows.push(rowData);
    }
  }

  return {
    areasList: selectAreasList(state),
    user: userSelector(state),
    loading: loading['teams'] && loading['teams'].isLoading,
    teamRows,
    totalCount,
  };
};

const mapDispatchToProps = {
  getAreasList: requestAreasListAsync.request,
  getTeams: requestTeamsAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamsTable);
