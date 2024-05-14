import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { sptConstants } from '../../lib';
import { requestAreasAsync } from '@/redux/areas-new';
import FilterableTable from '@/components/table/FilterableTable';
import { userSelector } from '@/redux/auth';

const columns = [
  {
    align: 'right',
    width: 24,
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
    id: 'view_polygon',
  },
];

const AreasTable = ({
  getAreas,
  user,
  loading,
  areaRows,
  totalCount,
}) => {
  const [searchText, setSearchText] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [selectedPage, setSelectedPage] = useState(1);
  const [sortParams, setSortParams] = useState({ name: 'area_id', order: 'asc' });

  const updateTable = () => {
    const params = {
      order: sortParams.order,
      sort_by: sortParams.name,
      limit: pageSize,
      page: selectedPage,
    };

    if(searchText) {
      params.search = searchText;
    }

    getAreas(params);
  };

  useEffect(() => {
    updateTable();
  }, [user, pageSize, sortParams, selectedPage, searchText]);

  return (
    <FilterableTable
      loading={loading.areas}
      columns={columns}
      rows={areaRows}
      pageSize={pageSize}
      setPageSize={setPageSize}
      sortParams={sortParams}
      onSortChange={setSortParams}
      searchText={searchText}
      searchPlaceholder={sptConstants.SEARCH_AREAS}
      setSearchText={setSearchText}
      selectedPage={selectedPage}
      setSelectedPage={setSelectedPage}
      totalCount={totalCount}
    />
  );
};

const mapStateToProps = (state) => {
  const { loading, area } = state;

  // Format areas response into rows
  const areaRows = [];
  let totalCount = 0;
  if(area && area.areas) {
    totalCount = area.areas?.data?.total;
    const data = area.areas?.data?.data;

    for(const thisArea of data) {
      const {
        area_id,
        area_name,
        statistics: { active_customers, inactive_customers, total_qualified_addresses } = {},
      } = thisArea ?? {};
      const mapUrl = `/sales-planning/area/${thisArea.area_id}`;
      const polygonUrl = `/sales-planning/polygons/area/${thisArea.area_id}`;

      areaRows.push([
        area_id,
        area_name,
        active_customers,
        inactive_customers,
        total_qualified_addresses,
        <Link className="text-center text-primary-300" to={mapUrl}>{sptConstants.VIEW_MAP}</Link>,
        <Link className="text-center text-primary-300" to={polygonUrl}>{sptConstants.VIEW_POLYGONS}</Link>,
        /*<div className="grid grid-cols-2">
          <Link className="text-center text-primary-300" to={mapUrl}>{sptConstants.VIEW_MAP}</Link>
          <Link className="text-center text-primary-300" to={polygonUrl}>{sptConstants.VIEW_POLYGONS}</Link>
        </div>*/
      ]);
    }
  }

  return {
    user: userSelector(state),
    loading: {
      areas: loading['areas'] && loading['areas'].isLoading,
    },
    areaRows,
    totalCount,
  };
};

const mapDispatchToProps = {
  getAreas: requestAreasAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(AreasTable);
