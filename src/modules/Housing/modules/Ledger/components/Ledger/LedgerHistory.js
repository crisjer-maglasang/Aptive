import { useState, useEffect, useCallback } from 'react';
import { Table } from '@/components';
import { Breadcrumbs } from '@/components/common';
import { parseLedgerHistoryRows, getLedgerHistoryHeadRows } from '@/modules/Housing/modules/Ledger/lib';
import { ledgerConstants } from '@/modules/Housing/lib';
import { addFsExcludeClass, mergeClassName } from '@/lib/utils';
import { SearchIcon } from '@heroicons/react/outline';
import { parseLedgerHistory } from '@/modules/Housing/modules/Ledger/lib';
import PropTypes from 'prop-types';
import { ledgerHistorySelector, ledgerHistoryTotalSelector, requestLedgerHistoryAsync } from '@/modules/Housing/redux/ledger';
import { isLedgerHistoryLoadingSelector } from '@/modules/Housing/redux/loading';
import { connect } from 'react-redux';

const { LEDGER_HISTORY_SEARCH_NAME } = ledgerConstants;

const LedgerHistory = ({
  ledgerId,
  onClickBack,
  getLedgerHistory,
  ledgerHistory,
  historiesTotal,
  isLoading,
}) => {
  const initialPage = 1;
  const initialPageSize = 10;

  const [selectedPage, setSelectedPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const ledgerHistoryFormatted = parseLedgerHistory(ledgerHistory);

  useEffect(() => {
    if (ledgerId) {
      getLedgerHistory({
        ledgerId,
        page: {
          number: selectedPage,
          size: pageSize,
        },
      });
    }
  }, [ledgerId, selectedPage, pageSize, getLedgerHistory]);

  const onPageChange = useCallback(({ selected }) => {
    setSelectedPage(selected);
  }, []);

  const ledgerHistoryRows = parseLedgerHistoryRows(ledgerHistoryFormatted);
  const breadcrumbLinks = [
    {
      linkName: 'Back to Ledger info',
      to: '#',
      action: () => onClickBack(),
    },
    {
      linkName: 'History',
      to: '#',
    },
  ];

  return (
    <div className="sm:h-[474px] w-full overflow-y-auto">
      <div className="py-4 px-4 w-full justify-between flex">
        <div className="items-center flex">
          <Breadcrumbs
            breadcrumbLinks={breadcrumbLinks}
            activeLinkIndex={1}
          />
        </div>
      </div>
      <div className="w-full sm:w-full overflow-hidden sm:overflow-y-auto">
        <Table
          loading={isLoading}
          thead={{ rows: getLedgerHistoryHeadRows() }}
          tbody={{
            rows: ledgerHistoryRows,
          }}
          paginator={{
            pageSize,
            setPageSize,
            onPageChange,
            selectedPage,
            initialPage,
            rowCount: historiesTotal,
          }}
          wrapper={{
            className: 'rounded-none',
          }}
        />
      </div>
    </div>
  );
};

LedgerHistory.propTypes = {
  getLedgerHistory: PropTypes.func,
  ledgerHistory: PropTypes.array,
  historiesTotal: PropTypes.number,
  onClickBack: PropTypes.func,
  ledgerId: PropTypes.number,
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  ledgerHistory: ledgerHistorySelector(state),
  historiesTotal: ledgerHistoryTotalSelector(state),
  isLoading: isLedgerHistoryLoadingSelector(state),
});

const mapDispatchToProps = {
  getLedgerHistory: requestLedgerHistoryAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(LedgerHistory);
