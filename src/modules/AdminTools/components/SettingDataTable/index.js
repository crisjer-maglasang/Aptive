import PropTypes from 'prop-types';

import Header from './Header';
import SearchableDataTable from '../DataTable/SearchableDataTable';

const SettingDataTable = ({
  data,
  headerOptions,
  tableOptions,
}) => {
  const hasSetting = data?.length > 0;

  return (
    <div>
      <Header {...headerOptions} />
      <hr className="my-8" />
      {hasSetting && <SearchableDataTable {...{ data, ...tableOptions }} />}
      {!hasSetting && <div>No data</div>}
    </div>
  );
};

SettingDataTable.propTypes = {
  data: PropTypes.array.isRequired,
  headerOptions: PropTypes.any.isRequired,
  tableOptions: PropTypes.any.isRequired,
};

export default SettingDataTable;
