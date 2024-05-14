import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { polygonsTableColumns, sptConstants } from '../../lib';
import {
  requestPolygonDispositionsAsync,
  selectPolygonDispositions,
  selectPolygonDispositionsCount,
} from '@/redux/polygons';
import { requestTeamsListAsync, selectTeamsList } from '@/redux/teams';
import FilterableTable from '@/components/table/FilterableTable';
import { DropdownButton, Loader } from '@/components';
import { userSelector } from '@/redux/auth';
import { selectLoadingPolygonDispositions, selectLoadingTeamsList } from '@/redux/loading';

const AreaPolygonsTable = () => {
  const polygonRows = useSelector(selectPolygonDispositions);
  const totalCount = useSelector(selectPolygonDispositionsCount);
  const teamsList = useSelector(selectTeamsList);
  const user = useSelector(userSelector);
  const isLoadingDispositions = useSelector(selectLoadingPolygonDispositions);
  const isLoadingTeams = useSelector(selectLoadingTeamsList);

  const [sortParams, setSortParams] = useState({ name: 'polygon_id', order: 'asc' });
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [selectedPage, setSelectedPage] = useState(1);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestTeamsListAsync.request({ area_id: id }));
  }, [dispatch, id]);

  const updateTable = () => {
    const params = {
      id,
      type: 'area',
      order: sortParams.order,
      sort_by: sortParams.name,
      limit: pageSize,
      page: selectedPage,
    };

    if(searchText) {
      params.search = searchText;
    }

    dispatch(requestPolygonDispositionsAsync.request(params));
  };

  useEffect(() => {
    updateTable();
  }, [user, pageSize, sortParams, selectedPage, searchText]);

  const renderPolygonButton = () => {
    if (isLoadingTeams) {
      return <Loader />;
    }

    if (teamsList) {
      const options = [];

      teamsList.forEach((team) => {
        options.push({
          label: team.name,
          onClick: () => navigate(
            `/sales-planning/team/${team.team_id}?origin=areaPolygons&areaId=${id}`,
          ),
        });
      });

      return <DropdownButton label="Add Polygon" options={options} />;
    } else {
      return null;
    }
  };

  return (
    <FilterableTable
      leftControl={renderPolygonButton()}
      loading={isLoadingDispositions}
      columns={polygonsTableColumns}
      rows={polygonRows}
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

export default AreaPolygonsTable;
