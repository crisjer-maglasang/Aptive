import { Table, WizardProfileModal } from '@/components';
import { isArchivedLeadsLoadingSelector } from '../../redux/loading';
import { requestArchivedLeadsAsync, archivedLeadsSelector, archivedLeadsTotalSelector } from '../../redux/leads';
import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getHeadRows, parseLeadRows } from '../../lib/helpers';
import { SearchBar } from '@/components/common';
import { usersManagementConstants } from '../../lib/constants';
import { default as ArchivedSelectType } from '../RepTypeSelect/ArchivedSelectType';

const initialPageSize = 10;
const initialPage = 1;
const initialSearch = '';

const {
  LEAD_MANAGEMENT_SEARCH_NAME,
  SEARCH_LEADS,
} = usersManagementConstants;

const LeadsManagementTable = ({
  leads,
  leadsTotal,
  leadsLoading,
  getArchivedLeadsRequest,
}) => {
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [selectedPage, setSelectedPage] = useState(initialPage);
  const [searchText, setSearchText] = useState(initialSearch);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState();

  const onPageChange = useCallback(({ selected }) => {
    setSelectedPage(selected);
  }, []);

  const onSearchClick = useCallback(({ searchText }) => {
    setSearchText(searchText);
    setSelectedPage(initialPage);
  }, []);

  const getLeads = ({ search, selectedPage, pageSize }) => {
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

    getArchivedLeadsRequest(params);
  };

  useEffect(() => {
    getLeads({ search: searchText, selectedPage, pageSize });
  }, [pageSize, searchText, selectedPage]);

  const onActionCompleted = () => {
    getLeads({ search: searchText, selectedPage, pageSize });
  };

  const onViewUserClick = useCallback((userId) => {
    setSelectedUserId(userId);
    setProfileOpen(true);
  }, []);

  const onProfileClose = useCallback(() => {
    setProfileOpen(false);
  }, []);

  const leadRows = parseLeadRows(leads, onActionCompleted, onViewUserClick);

  return (
    <>
      <div className="px-8 py-6 bg-white border-b">
        <div className="flex items-center justify-between">
          <ArchivedSelectType type="lead" />
          <SearchBar
            inputName={LEAD_MANAGEMENT_SEARCH_NAME}
            searchText={searchText}
            onSearchClick={onSearchClick}
            placeholder={SEARCH_LEADS}
            disabled={Boolean(leadsLoading)}
          />
        </div>
      </div>
      <div className="px-8">
        <div className="mt-10">
          <Table
            loading={leadsLoading}
            thead={{
              rows: getHeadRows(),
            }}
            tbody={{
              rows: leadRows,
            }}
            paginator={{
              rowCount: leadsTotal,
              pageSize: pageSize,
              setPageSize: setPageSize,
              onPageChange: onPageChange,
              selectedPage: selectedPage,
              initialPage: initialPage,
            }}
          />
        </div>
        <WizardProfileModal
          isOpen={profileOpen}
          onClose={onProfileClose}
          isPersonalWizard={false}
          userId={selectedUserId}
          reloadPageInfo={onActionCompleted}
        />
      </div>
    </>
  );
};

LeadsManagementTable.propTypes = {};

const mapStateToProps = (state) => ({
  leads: archivedLeadsSelector(state),
  leadsTotal: archivedLeadsTotalSelector(state),
  leadsLoading: isArchivedLeadsLoadingSelector(state),
});

const mapDispatchToProps = {
  getArchivedLeadsRequest: requestArchivedLeadsAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeadsManagementTable);
