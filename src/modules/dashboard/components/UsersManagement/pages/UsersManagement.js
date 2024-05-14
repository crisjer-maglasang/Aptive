import { LeadsManagementTable, UsersManagementTable } from '../components';
import { usersManagementConstants } from '../lib';

const UsersManagement = ({ type }) => {
  return (type === usersManagementConstants.ARCHIVED_USER_TYPE ? <UsersManagementTable /> : <LeadsManagementTable />);
};

export default UsersManagement;
