import { DropdownButton } from '@/modules/Housing/components/common';
import { CustomButton, Loader } from '@/components/common';
import LedgersTable from '../components/LedgersTable';
import { useCallback, useState, useEffect, useRef } from 'react';
import {
  isExportLedgersLoadingSelector,
  isImportLedgersLoadingSelector,
  isImportLedgersTemplateLoadingSelector,
  isLedgerListLoadingSelector,
} from '@/modules/Housing/redux/loading';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import LedgerModal from '../components/Ledger/LedgerModal';
import {
  importLedgersAsync,
  importLedgersTemplateAsync,
  exportLedgersAsync,
  resetSelectedLedgerAction,
  requestLedgersAsync,
  ledgerListSelector,
  ledgerTotalSelector,
  setSelectedLedgerAction,
} from '@/modules/Housing/redux/ledger';
import {
  requestBranchesSummariesAsync,
  requestTeamsSummariesAsync,
  branchesSummariesSelector,
  teamsSummariesSelector,
} from '@/modules/Housing/redux/area';
import {
  requestDealersAsync,
  requestPartnershipsAsync,
  dealersSelector,
  partnershipsSelector,
} from '@/modules/Housing/redux/partnership';
import {
  requestPaymentTypesAsync,
  requestComplexSummariesAsync,
  requestPaymentMethodsAsync,
  complexSummariesSelector,
  paymentMethodsSelector,
  paymentTypesSelector,
} from '@/modules/Housing/redux/apartment';
import { parseFilters } from '@/modules/Housing/modules/Ledger/lib';

const initialPageSize = 10;
const initialPage = 1;
const downloadOptions = [
  {
    format: 'csv',
    label: 'Download CSV',
    action: exportLedgersAsync.request,
  },
  {
    format: 'xlsx',
    label: 'Download Excel',
    action: exportLedgersAsync.request,
  },
  {
    format: 'csv',
    label: 'Download CSV Import Template',
    action: importLedgersTemplateAsync.request,
  },
  {
    format: 'xlsx',
    label: 'Download Excel Import Template',
    action: importLedgersTemplateAsync.request,
  },
];
const uploadOptions = [
  {
    format: 'csv',
    mimetype: 'text/csv,text/plain',
    label: 'Upload CSV',
  },
  {
    format: 'xlsx',
    mimetype:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    label: 'Upload Excel',
  },
];

const Ledger = ({
  archived,
  importLedgers,
  importLedgersLoading,
  exportLedgersLoading,
  importLedgersTemplateLoading,
  isLedgerTableLoading,
  ledgers,
  getLedgers,
  dealers,
  branches,
  teams,
  partnerships,
  typeOfPayments,
  complexes,
  paymentMethods,
  requestBranchesSummaries,
  requestTeamsSummaries,
  requestDealersSummaries,
  requestPartnershipsSummaries,
  requestTypeOfPaymentsSummaries,
  requestComplexSummaries,
  requestPaymentMethodsSummaries,
  ledgersTotal,
  resetSelected,
}) => {
  const dispatch = useDispatch();
  const [selectedFileOption, setSelectedFileOption] = useState('');
  const [triggerUpload, setTriggerUpload] = useState(false);
  const fileInput = useRef();
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [selectedPage, setSelectedPage] = useState(initialPage);
  const [filters, setFilters] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const params = {
      page: {
        number: selectedPage,
        size: pageSize,
      },
      archived: archived,
      ...parseFilters(filters),
      ...(searchValue && { search_query: searchValue }),
    };
    getLedgers(params);
  }, [getLedgers, selectedPage, pageSize, archived]);

  useEffect(() => {
    if (selectedPage !== initialPage) {
      setSelectedPage(initialPage);
    } else {
      getLedgers({
        page: {
          number: initialPage,
          size: pageSize,
        },
        archived: archived,
        ...parseFilters(filters),
        ...(searchValue && { search_query: searchValue }),
      });
    }
  }, [filters, searchValue]);

  useEffect(() => {
    requestDealersSummaries();
    requestBranchesSummaries();
    requestTeamsSummaries();
    requestPartnershipsSummaries();
    requestTypeOfPaymentsSummaries();
    requestComplexSummaries();
    requestPaymentMethodsSummaries();
  }, []);

  useEffect(() => {
    if (triggerUpload) {
      fileInput?.current?.click();
      setTriggerUpload(false);
    }
  }, [triggerUpload]);

  const refreshLedgers = () => {
    setSelectedPage(initialPage);
    setFilters([]);
    setSearchValue('');
    getLedgers({
      page: {
        number: initialPage,
        size: pageSize,
      },
      archived: archived,
    });
  };

  const onPageChange = useCallback(({ selected }) => {
    setSelectedPage(selected);
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    importLedgers({
      format: selectedFileOption?.format,
      file,
      successCallback: refreshLedgers,
    });
    event.target.value = null;
  };

  const handleUploadTypeChange = (option) => {
    setTriggerUpload(true);
    setSelectedFileOption(option);
  };

  const handleLedgerDownload = (option) => {
    if (option) {
      const params = {
        archived: archived,
        ...parseFilters(filters),
        ...(searchValue && { search_query: searchValue }),
      };
      dispatch(option.action({ format: option.format, ...params }));
    }
  };

  const onLedgerModalClose = useCallback(() => {
    resetSelected();
    setIsOpen(false);
  }, [resetSelected]);

  return (
    <div className="grow p-6">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-gray-900 text-[32px] font-normal leading-10">
          {archived ? 'Ledger Archive' : 'Ledger records'}
        </span>
        <div className="justify-end items-center gap-4 inline-flex">
          <CustomButton
            color={'white'}
            onClick={() => setIsOpen(true)}
            className={
              'px-2 py-1 rounded-2xl border border-gray-200 justify-start flex gap-1 items-center focus:ring-0'
            }
          >
            <div className="text-right text-gray-900 text-xs font-normal font-['Inter'] leading-none">
              Add new Ledger
            </div>
          </CustomButton>
          {exportLedgersLoading || importLedgersTemplateLoading ? (
            <Loader />
          ) : (
            <DropdownButton
              color={'white'}
              options={downloadOptions}
              buttonClassName={
                'px-2 py-1 rounded-2xl border border-gray-200 justify-start items-center gap-1 flex'
              }
              label={downloadOptions[0].label}
              labelClassName={
                'text-right text-xs font-normal font-["Inter"] leading-none'
              }
              iconClassName={'w-3 h-3 relative'}
              onChange={handleLedgerDownload}
            />
          )}
          {importLedgersLoading ? (
            <Loader />
          ) : (
            <DropdownButton
              color={'white'}
              options={uploadOptions}
              buttonClassName={
                'px-2 py-1 rounded-2xl border border-gray-200 justify-start items-center gap-1 flex'
              }
              label={uploadOptions[0].label}
              labelClassName={
                'text-right text-xs font-normal font-["Inter"] leading-none'
              }
              iconClassName={'w-3 h-3 relative'}
              onChange={handleUploadTypeChange}
            />
          )}
          <input
            type="file"
            ref={fileInput}
            className="hidden"
            accept={selectedFileOption?.mimetype}
            onChange={handleFileUpload}
          />
        </div>
      </div>

      <LedgersTable
        isLoading={isLedgerTableLoading}
        ledgers={ledgers}
        filters={filters}
        setFilters={setFilters}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        pageSize={pageSize}
        setPageSize={setPageSize}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        initialPage={initialPage}
        onPageChange={onPageChange}
        archived={archived}
        setIsModalOpen={setIsOpen}
        dealers={dealers}
        branches={branches}
        teams={teams}
        partnerships={partnerships}
        typeOfPayments={typeOfPayments}
        complexes={complexes}
        paymentMethods={paymentMethods}
        ledgersTotal={ledgersTotal}
        refreshLedgers={refreshLedgers}
      />
      <LedgerModal
        isOpen={isOpen}
        onClose={onLedgerModalClose}
        refreshLedgers={refreshLedgers}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  importLedgersLoading: isImportLedgersLoadingSelector(state),
  exportLedgersLoading: isExportLedgersLoadingSelector(state),
  importLedgersTemplateLoading: isImportLedgersTemplateLoadingSelector(state),
  isLedgerTableLoading: isLedgerListLoadingSelector(state),
  ledgers: ledgerListSelector(state),
  branches: branchesSummariesSelector(state),
  teams: teamsSummariesSelector(state),
  dealers: dealersSelector(state),
  partnerships: partnershipsSelector(state),
  typeOfPayments: paymentTypesSelector(state),
  complexes: complexSummariesSelector(state),
  paymentMethods: paymentMethodsSelector(state),
  ledgersTotal: ledgerTotalSelector(state),
});

const mapDispatchToProps = {
  importLedgers: importLedgersAsync.request,
  getLedgers: requestLedgersAsync.request,
  resetSelected: resetSelectedLedgerAction,
  requestBranchesSummaries: requestBranchesSummariesAsync.request,
  requestTeamsSummaries: requestTeamsSummariesAsync.request,
  requestDealersSummaries: requestDealersAsync.request,
  requestPartnershipsSummaries: requestPartnershipsAsync.request,
  requestTypeOfPaymentsSummaries: requestPaymentTypesAsync.request,
  requestComplexSummaries: requestComplexSummariesAsync.request,
  requestPaymentMethodsSummaries: requestPaymentMethodsAsync.request,
  setSelectedLedger: setSelectedLedgerAction,
};

Ledger.propTypes = {
  archived: PropTypes.bool,
  importLedgers: PropTypes.func,
  importLedgersLoading: PropTypes.bool,
  exportLedgersLoading: PropTypes.bool,
  importLedgersTemplateLoading: PropTypes.bool,
  ledgers: PropTypes.array,
  getLedgers: PropTypes.func,
  dealers: PropTypes.array,
  branches: PropTypes.array,
  teams: PropTypes.array,
  partnerships: PropTypes.array,
  typeOfPayments: PropTypes.array,
  complexes: PropTypes.array,
  paymentMethods: PropTypes.array,
  ledgersTotal: PropTypes.number,
  resetSelected: PropTypes.func,
  requestBranchesSummaries: PropTypes.func,
  requestTeamsSummaries: PropTypes.func,
  requestDealersSummaries: PropTypes.func,
  requestPartnershipsSummaries: PropTypes.func,
  requestTypeOfPaymentsSummaries: PropTypes.func,
  requestComplexSummaries: PropTypes.func,
  requestPaymentMethodsSummaries: PropTypes.func,
  refreshLedgers: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ledger);
