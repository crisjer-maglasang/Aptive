import { Table } from '@/components';
import { dashboardConstants } from '@/lib';
import { usersLoadingSelector } from '@/redux/loading';
import { requestUsersAsync, manageUsersSelector, manageUsersTotalSelector } from '@/redux/users';
import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getHeadRows, parseUserRows } from './utils';
import { SearchBar } from '@/components/common';
import dashboard from '@/lib/constants/dashboard';
import ArchivedSelectType from '../RepTypeSelect/ArchivedSelectType';

const initialPageSize = 10;
const initialPage = 1;
const initialSearch = '';

const UsersManagementTable = ({
  users,
  usersTotal,
  usersLoading,
  getUsersRequest,
}) => {
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [selectedPage, setSelectedPage] = useState(initialPage);
  const [searchText, setSearchText] = useState(initialSearch);

  const onPageChange = useCallback(({ selected }) => {
    setSelectedPage(selected);
  }, []);

  const onSearchClick = useCallback(({ searchText }) => {
    setSearchText(searchText);
    setSelectedPage(initialPage);
  }, []);

  const getUsers = ({ search, selectedPage, pageSize }) => {
    const params = {
      page: {
        number: selectedPage,
        size: pageSize,
      },
      filter: {},
    };

    if (search) {
      params.filter.search = search;
    }

    getUsersRequest(params);
  };

  useEffect(() => {
    getUsers({ search: searchText, selectedPage, pageSize });
  }, [pageSize, searchText, selectedPage]);

  const onActionCompleted = () => {
    getUsers({ search: searchText, selectedPage, pageSize });
  };

  const userRows = parseUserRows(users, onActionCompleted);

  return (
    <>
      <div className="px-8 py-6 bg-white border-b">
        <div className="flex items-center justify-between">
          <ArchivedSelectType type="user" />
          <SearchBar
            inputName={dashboard.USER_MANAGEMENT_SEARCH_NAME}
            searchText={searchText}
            onSearchClick={onSearchClick}
            placeholder={dashboardConstants.SEARCH_REPS}
            disabled={Boolean(usersLoading)}
          />
        </div>
      </div>
      <div className="px-8">
        <div className="mt-10">
          <Table
            loading={usersLoading}
            thead={{
              rows: getHeadRows(),
            }}
            tbody={{
              rows: userRows,
            }}
            paginator={{
              rowCount: usersTotal,
              pageSize: pageSize,
              setPageSize: setPageSize,
              onPageChange: onPageChange,
              selectedPage: selectedPage,
              initialPage: initialPage,
            }}
          />
        </div>
      </div>
    </>
  );
};

UsersManagementTable.propTypes = {};

const mapStateToProps = (state) => ({
  users: manageUsersSelector(state),
  usersTotal: manageUsersTotalSelector(state),
  usersLoading: usersLoadingSelector(state),
});

const mapDispatchToProps = {
  getUsersRequest: requestUsersAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersManagementTable);
