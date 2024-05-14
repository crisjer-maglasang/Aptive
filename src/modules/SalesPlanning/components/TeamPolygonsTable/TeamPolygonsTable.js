import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { polygonsTableColumns } from '../../lib';
import {
  requestPolygonDispositionsAsync,
  selectPolygonDispositions,
  selectPolygonDispositionsCount,
} from '@/redux/polygons';
import PageableTable from '@/components/table/PageableTable';
import { Button } from '@/components';
import { userSelector } from '@/redux/auth';
import { selectLoadingPolygonDispositions } from '@/redux/loading';

const TeamPolygonsTable = () => {
  const polygonRows = useSelector(selectPolygonDispositions);
  const totalCount = useSelector(selectPolygonDispositionsCount);
  const user = useSelector(userSelector);
  const isLoadingDispositions = useSelector(selectLoadingPolygonDispositions);

  const [sortParams, setSortParams] = useState({ name: 'polygon_id', order: 'asc' });
  const [pageSize, setPageSize] = useState(10);
  const [selectedPage, setSelectedPage] = useState(1);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateTable = () => {
    const params = {
      id,
      type: 'team',
      order: sortParams.order,
      sort_by: sortParams.name,
      limit: pageSize,
      page: selectedPage,
    };

    dispatch(requestPolygonDispositionsAsync.request(params));
  };

  useEffect(() => {
    updateTable();
  }, [user, pageSize, sortParams, selectedPage]);

  return (
    <PageableTable
      leftControl={(
        <Button onClick={() => navigate(`/sales-planning/team/${id}?origin=teamPolygons`)}>
          Add Polygon
        </Button>
      )}
      loading={isLoadingDispositions}
      columns={polygonsTableColumns}
      rows={polygonRows}
      pageSize={pageSize}
      setPageSize={setPageSize}
      sortParams={sortParams}
      onSortChange={setSortParams}
      selectedPage={selectedPage}
      setSelectedPage={setSelectedPage}
      totalCount={totalCount}
    />
  );
};

export default TeamPolygonsTable;
