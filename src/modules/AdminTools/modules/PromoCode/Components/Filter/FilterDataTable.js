import PropTypes from 'prop-types';

import FilterRequestDataTable from './FilterRequestDataTable';
import Filters from './Filters';
import Header from '@/modules/AdminTools/components/SettingDataTable/Header';

const FilterDataTable = ({
  headerOptions,
  tableOptions,
  filters,
  filterOptions,
  ...props
}) => {
  const hasSetting = props.data?.length > 0;

  return (
    <div>
      <Header {...headerOptions} />
      <hr className="my-8" />
      <Filters {...{ filters, filterOptions }} />
      <hr className="my-8" />
      {hasSetting && (
        <FilterRequestDataTable {...{ ...props, ...tableOptions }} />
      )}
      {!hasSetting && <div>No data</div>}
    </div>
  );
};

FilterDataTable.propTypes = {
  data: PropTypes.array.isRequired,
  headerOptions: PropTypes.any.isRequired,
  tableOptions: PropTypes.any.isRequired,
  filters: PropTypes.object.isRequired,
  filterOptions: PropTypes.array.isRequired,
};

export default FilterDataTable;
