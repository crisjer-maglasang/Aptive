import { Table } from '@/components';
import { SearchBar } from '@/components/common';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useState } from 'react';
import {
  AddFilterButton,
  FilterDropdownButton,
  Button,
} from '@/modules/Housing/components/common';
import {
  getLedgerHeadRows,
  parseLedgerRows,
} from '@/modules/Housing/modules/Ledger/lib';
import { ledgerConstants } from '@/modules/Housing/lib';
import { payStatus } from '@/modules/Housing/lib/constants';
import { setSelectedLedgerAction, archiveLedgerAsync, unArchiveLedgerAsync } from '@/modules/Housing/redux/ledger';
import { useDraggable } from '@/modules/Housing/hooks';

const { LEDGER_SEARCH_NAME } = ledgerConstants;

const LedgersTable = ({
  // Own Props
  initialPage,
  pageSize,
  setPageSize,
  selectedPage,
  onPageChange,
  ledgers,
  ledgersTotal,
  filters,
  setFilters,
  searchValue,
  setSearchValue,
  branches,
  teams,
  dealers,
  partnerships,
  typeOfPayments,
  complexes,
  paymentMethods,
  isLoading,
  archiveLedger,
  unArchiveLedger,
  archived,
  setIsModalOpen,
  setSelectedLedger,
  refreshLedgers,
}) => {
  const [filterValueOptions, setFilterValueOptions] = useState([]);
  const { tableRef } = useDraggable(isLoading);

  const onClickArchive = (ledgerId) => {
    const action = archived ? unArchiveLedger : archiveLedger;

    action({
      ledgerId,
      successCallback: () => refreshLedgers(),
    });
  };

  const ledgerRows = parseLedgerRows(ledgers ?? [], archived, onClickArchive);

  const handleSearchClick = ({ searchText }) => {
    setSearchValue(searchText);
  };

  const filterTypeOptions = [
    {
      onClick: () => setFilterValueOptions(branches),
      label: 'Branch',
      value: 'branch_ids',
      type: 'dropdown',
    },
    {
      onClick: () => {
        setFilterValueOptions(
          teams.map((team) => ({ name: team.label, value: team.value })),
        );
      },
      label: 'Team',
      value: 'team_ids',
      type: 'dropdown',
    },
    {
      onClick: () => setFilterValueOptions(dealers),
      label: 'Dealer',
      value: 'dealer_ids',
      type: 'dropdown',
    },
    {
      onClick: () => setFilterValueOptions(partnerships),
      label: 'Partnership',
      value: 'partnership_ids',
      type: 'dropdown',
    },
    {
      onClick: () => setFilterValueOptions(typeOfPayments),
      label: 'Type of Payment',
      value: 'payment_type_ids',
      type: 'dropdown',
    },
    {
      onClick: () => setFilterValueOptions(complexes),
      label: 'Complex',
      value: 'complex_ids',
      type: 'dropdown',
    },
    {
      onClick: () => setFilterValueOptions(paymentMethods),
      label: 'Payment Method',
      value: 'payment_method_ids',
      type: 'dropdown',
    },
    {
      onClick: () => setFilterValueOptions(payStatus),
      label: 'Paid Status',
      value: 'pay_status_ids',
      type: 'dropdown',
    },
    {
      onClick: () => {},
      label: 'Date Due',
      value: 'date_due',
      type: 'daterange',
    },
    {
      onClick: () => {},
      label: 'Date Paid',
      value: 'date_paid',
      type: 'daterange',
    },
  ];

  return (
    <>
      {!isLoading && (
        <div className="mt-4 border border-solid border-gray-300 rounded-t-lg p-2 border-b-0 bg-white self-stretch flex items-center justify-between">
          <SearchBar
            searchText={searchValue}
            inputName={LEDGER_SEARCH_NAME}
            onSearchClick={handleSearchClick}
          />
          <div className="mr-4 flex items-center gap-6">
            {filters.map((filter, index) => {
              let options, type;
              switch (filter.type.value) {
                case 'branch_ids':
                  options = branches;
                  type = 'dropdown';
                  break;
                case 'team_ids':
                  options = teams.map((team) => ({ name: team.label, value: team.value }));
                  type = 'dropdown';
                  break;
                case 'dealer_ids':
                  options = dealers;
                  type = 'dropdown';
                  break;
                case 'partnership_ids':
                  options = partnerships;
                  type = 'dropdown';
                  break;
                case 'payment_type_ids':
                  options = typeOfPayments;
                  type = 'dropdown';
                  break;
                case 'complex_ids':
                  options = complexes;
                  type = 'dropdown';
                  break;
                case 'payment_method_ids':
                  options = paymentMethods;
                  type = 'dropdown';
                  break;
                case 'pay_status_ids':
                  options = payStatus;
                  type = 'dropdown';
                  break;
                case 'date_paid':
                  type = 'daterange';
                  break;
                case 'date_due':
                  type = 'daterange';
                  break;
                default:
                  break;
              }

              return (
                <FilterDropdownButton
                  buttonClassName="border border-gray-200 rounded-lg px-4 py-2 gap-1 inline-flex items-center"
                  iconClassName="w-4 h-4 text-gray-600"
                  labelClassName="text-gray-600 text-based font-normal sm:text-xs leading-none"
                  filterValueOptions={options}
                  filters={filters}
                  setFilters={setFilters}
                  key={index}
                  index={index}
                  type={type}
                />
              );
            })}

            <AddFilterButton
              filterTypeOptions={filterTypeOptions}
              filterValueOptions={filterValueOptions}
              setFilters={setFilters}
              filters={filters}
              label={'+ Add Filters'}
            />
            <div>
              <Button
                color={'default'}
                onClick={() => setFilters([])}
                className="text-gray-600 text-right font-normal sm:text-xs leading-none border-none shadow-none"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
      )}
      <Table
        ref={tableRef}
        loading={isLoading}
        className="select-none"
        thead={{ rows: getLedgerHeadRows() }}
        tbody={{
          rows: ledgerRows,
          data: ledgers,
          classNames: 'hover:cursor-pointer',
          onSelect: (rowData) => {
            if (!rowData) {
              return;
            }
            setIsModalOpen(true);
            setSelectedLedger(rowData);
          },
        }}
        paginator={{
          pageSize,
          setPageSize,
          onPageChange,
          selectedPage,
          initialPage,
          rowCount: ledgersTotal,
        }}
        wrapper={{
          className: 'overflow-y-visible rounded-t-none',
        }}
      />
    </>
  );
};

LedgersTable.propTypes = {
  initialPage: PropTypes.number,
  pageSize: PropTypes.number,
  setPageSize: PropTypes.func,
  selectedPage: PropTypes.number,
  onPageChange: PropTypes.func,
  ledgers: PropTypes.array,
  ledgersTotal: PropTypes.number,
  filters: PropTypes.array,
  setFilters: PropTypes.func,
  searchValue: PropTypes.string,
  branches: PropTypes.array,
  teams: PropTypes.array,
  dealers: PropTypes.array,
  partnerships: PropTypes.array,
  typeOfPayments: PropTypes.array,
  complexes: PropTypes.array,
  paymentMethods: PropTypes.array,
  isLoading: PropTypes.bool,
  archiveLedger: PropTypes.func,
  unArchiveLedger: PropTypes.func,
  archived: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
  setSelectedLedger: PropTypes.func,
  refreshLedgers: PropTypes.func,
  setSearchValue: PropTypes.func,
};

const mapDispatchToProps = {
  setSelectedLedger: setSelectedLedgerAction,
  archiveLedger: archiveLedgerAsync.request,
  unArchiveLedger: unArchiveLedgerAsync.request,
};

export default connect(null, mapDispatchToProps)(LedgersTable);
