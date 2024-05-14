import { useCallback, useMemo, useState, useEffect } from 'react';
import { OfficeBuildingIcon } from '@heroicons/react/outline';
import { CustomButton } from '@/components';
import { Button } from '@/modules/Housing/components/common';
import LedgerFooter from './LedgerFooter';
import LedgerHeader from './LedgerHeader';
import LedgerInfo from './LedgerInfo';
import LedgerHistory from './LedgerHistory';
import { ledgerValidationSchema } from './LedgerValidationSchema';
import { connect } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import {
  createLedgerAsync,
  editLedgerAsync,
  archiveLedgerAsync,
  unArchiveLedgerAsync,
  ledgerSelector,
  createNoteAsync,
} from '@/modules/Housing/redux/ledger';
import {
  branchesSummariesSelector,
  requestTeamsSummariesAsync,
  teamsSummariesSelector,
} from '@/modules/Housing/redux/area';
import {
  apartmentSummariesSelector,
  paymentMethodsSelector,
  paymentTypesSelector,
  requestApartmentSummariesAsync,
} from '@/modules/Housing/redux/apartment';
import {
  partnershipsSelector,
  requestPartnershipsAsync,
  dealersSelector,
} from '@/modules/Housing/redux/partnership';
import PropTypes from 'prop-types';
import NotesForm from '../Notes/NotesForm';
import { useStableCallback } from '@/hooks';
import { PageLoader } from '@/components/common';
import { isLedgerFormLoadingSelector } from '@/modules/Housing/redux/loading';
import { formatNumberToCurrencyString, formatDate } from '@/lib/utils';
import { useLedgerEditable } from '@/modules/Housing/hooks';

const LedgerForm = ({
  onClose,
  ledger,
  branches,
  dealers,
  teams,
  partnerships,
  apartments,
  paymentTypes,
  paymentMethods,
  requestTeamsSummaries,
  requestPartnerships,
  requestApartmentSummaries,
  createLedger,
  editLedger,
  createNote,
  archiveLedger,
  unArchiveLedger,
  isLedgerFormLoading,
  refreshLedgers,
}) => {
  const teamOptions = useMemo(() => {
    if (!teams) {
      return [];
    }

    return teams.map((team) => ({
      name: team?.label,
      value: team?.value,
    }));
  }, [teams]);

  const [noteValue, setNoteValue] = useState('');
  const [isSearchTab, setIsSearchTab] = useState(false);

  const methods = useForm({
    defaultValues: {
      ...ledger,
      amount_paid: formatNumberToCurrencyString(ledger.amount_paid, 2),
      amount_to_pay: formatNumberToCurrencyString(ledger.amount_to_pay, 2),
      furniture_damaged: formatNumberToCurrencyString(
        ledger.furniture_damaged,
        2,
      ),
      rep_utilities: formatNumberToCurrencyString(ledger.rep_utilities, 2),
      apartment_charges: formatNumberToCurrencyString(
        ledger.apartment_charges,
        2,
      ),
      date_due: formatDate(ledger.date_due, 'YYYY-MM-DD'),
      date_paid: formatDate(ledger.date_paid, 'YYYY-MM-DD'),
    },
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(ledgerValidationSchema),
  });

  const {
    handleSubmit,
    formState: { isValid, isDirty },
    setValue,
    getValues,
    reset,
  } = methods;

  const { dealer_id, branch_id } = getValues();

  const onFormClose = () => {
    reset();
    onClose();
    refreshLedgers();
  };

  const createLedgerNote = (ledgerId) => {
    if (noteValue === '') {
      onFormClose();
    } else {
      createNote({
        data: { ledgerRecordId: ledgerId, note: noteValue },
        successCallback: onFormClose,
      });
    }
  };

  const handleClickArchive = () => {
    if (ledger.is_deleted) {
      unArchiveLedger({ ledgerId: ledger.id, successCallback: onFormClose });

      return;
    }
    archiveLedger({ ledgerId: ledger.id, successCallback: onFormClose });
  };

  const handleSubmitForm = useStableCallback(() => {
    if (ledger.id) {
      if(ledger.is_editable) {
        editLedger({
          ledgerRecordId: ledger.id,
          data: getValues(),
          successCallback: () => createLedgerNote(ledger.id),
        });
      } else {
        createLedgerNote(ledger.id);
      }
    } else {
      createLedger({
        data: getValues(),
        successCallback: (ledgerId) => createLedgerNote(ledgerId),
      });
    }
  });

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;

      setValue(name, value, { shouldValidate: true, shouldDirty: true });
    },
    [setValue],
  );

  const handleTeamChange = async ({ target: { value } }) => {
    setValue('team_id', value);
    if (value) {
      await requestApartmentSummaries({ team_id: value });
    }
  };

  const handleBranchChange = async ({ target: { value } }) => {
    setValue('branch_id', value);

    if (dealer_id && value) {
      await requestTeamsSummaries({ dealer_id: dealer_id, branch_id: value });
    }
  };

  const handleDealerChange = async ({ target: { value } }) => {
    setValue('dealer_id', value);
    if (value) {
      await requestPartnerships({ dealer_id: value });
    }

    if (branch_id && value) {
      await requestTeamsSummaries({ branch_id: branch_id, dealer_id: value });
    }
  };

  const { canEditField } = useLedgerEditable({ ledgerId: ledger.id, isEditable: ledger.is_editable });

  const handleClickHistory = () => {
    setIsSearchTab(true);
  };

  useEffect(() => {
    if (ledger.id) {
      requestApartmentSummaries({ team_id: ledger.team_id });
    }
  }
  , [ledger.id]);

  return (
    <div className="w-[989px]">
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(handleSubmitForm)}>
          <LedgerHeader>
            <div className="flex justify-between">
              <div className="flex items-center">
                <OfficeBuildingIcon color="gray" className="mr-2 w-6 h-6" />
                {ledger.id ? (
                  <h1 className="font-semibold text-lg">
                    Ledger record: #
                    {ledger.id}
                  </h1>
                ) : (
                  <h1 className="font-semibold text-lg">
                    Add new ledger record
                  </h1>
                )}
              </div>
              {ledger.id && (
                <div className="flex items-center gap-8">
                  {!isSearchTab && (
                    <Button
                      color={'default'}
                      className={
                        'font-inter text-base font-normal leading-6 text-right text-gray-700'
                      }
                      onClick={handleClickHistory}
                    >
                      View history
                    </Button>
                  )}
                  <Button
                    color={'default'}
                    className={
                      'font-inter text-base font-normal leading-6 text-right text-gray-700 border border-gray-300 rounded-md px-3 py-2'
                    }
                    onClick={handleClickArchive}
                  >
                    {ledger.is_deleted ? 'Unarchive ledger' : 'Archive ledger'}
                  </Button>
                </div>
              )}
            </div>
          </LedgerHeader>
          <div className="flex flex-wrap overflow-hidden">
            {!isSearchTab ? (
              <>
                <div className="p-6 w-full sm:w-2/3 sm:h-[474px] overflow-hidden sm:overflow-y-auto">
                  {isLedgerFormLoading ? (
                    <PageLoader />
                  ) : (
                    <LedgerInfo
                      branches={branches}
                      apartments={apartments}
                      teams={teamOptions}
                      dealers={dealers}
                      partnerships={partnerships}
                      paymentMethods={paymentMethods}
                      paymentTypes={paymentTypes}
                      onTeamChange={handleTeamChange}
                      onBranchChange={handleBranchChange}
                      onDealerChange={handleDealerChange}
                      onChangeHandler={handleChange}
                      canEditField={canEditField}
                      ledgerId={ledger.id}
                    />
                  )}
                </div>
                <div className="w-full sm:w-1/3 overflow-hidden">
                  <NotesForm setNoteValue={setNoteValue} note={noteValue} ledgerId={ledger.id} />
                </div>
              </>
            ) : (
              <LedgerHistory
                ledgerId={ledger.id}
                onClickBack={() => setIsSearchTab(false)}
              />
            )}
          </div>
          <LedgerFooter>
            <div className="flex">
              <div className="ml-auto">
                <CustomButton
                  color="white"
                  onClick={onClose}
                  className={'mr-4 text-gray-600 hover:bg-gray-100'}
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  type="submit"
                  color="active"
                  disabled={!isValid || !isDirty}
                >
                  Submit
                </CustomButton>
              </div>
            </div>
          </LedgerFooter>
        </form>
      </FormProvider>
    </div>
  );
};

LedgerForm.propTypes = {
  ledger: PropTypes.object,
  note: PropTypes.string,
  notes: PropTypes.array,
  dealers: PropTypes.array,
  teams: PropTypes.array,
  branches: PropTypes.array,
  apartments: PropTypes.array,
  paymentMethods: PropTypes.array,
  paymentTypes: PropTypes.array,
  partnerships: PropTypes.array,
  requestTeamsSummaries: PropTypes.func,
  requestApartmentSummaries: PropTypes.func,
  requestPartnerships: PropTypes.func,
  createLedger: PropTypes.func,
  editLedger: PropTypes.func,
  createNote: PropTypes.func,
  onClose: PropTypes.func,
  archiveLedger: PropTypes.func,
  unArchiveLedger: PropTypes.func,
  isLedgerFormLoading: PropTypes.bool,
  refreshLedgers: PropTypes.func,
};

const mapStateToProps = (state) => ({
  ledger: ledgerSelector(state),
  teams: teamsSummariesSelector(state),
  dealers: dealersSelector(state),
  branches: branchesSummariesSelector(state),
  apartments: apartmentSummariesSelector(state),
  paymentMethods: paymentMethodsSelector(state),
  paymentTypes: paymentTypesSelector(state),
  partnerships: partnershipsSelector(state),
  isLedgerFormLoading: isLedgerFormLoadingSelector(state),
});

const mapDispatchToProps = {
  requestTeamsSummaries: requestTeamsSummariesAsync.request,
  requestApartmentSummaries: requestApartmentSummariesAsync.request,
  requestPartnerships: requestPartnershipsAsync.request,
  createLedger: createLedgerAsync.request,
  editLedger: editLedgerAsync.request,
  createNote: createNoteAsync.request,
  archiveLedger: archiveLedgerAsync.request,
  unArchiveLedger: unArchiveLedgerAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(LedgerForm);
