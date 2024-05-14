import { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { XIcon } from '@heroicons/react/outline';
import person from '../../../../../assets/person.png';
import { Loader, SideDrawerWrapper } from '@/components';
import { GeneralInfo } from './ProfileTabs/GeneralInfo';
import { FilterableAgreementList } from './ProfileTabs/Agreements';
import { dashboardConstants } from '@/lib';
import { requestRepAsync, repSelector, requestRecruitingSeasonAsync } from '@/redux/reps';
import {
  agreementsDrawerIsLoadingSelector,
  recruitingSeasonIsLoadingSelector,
  repsLoadingSelector,
} from '@/redux/loading';
import { repContractsSelector, requestRepContractsAsync } from '@/redux/contracts';
import { removeAllErrorsAction } from '@/redux/errors';
import { AddContract, ViewContract } from '../Modals';
import { addFsExcludeClass } from '@/lib/utils';
import isEmpty from 'lodash/isEmpty';

const { AGREEMENTS, GENERAL } = dashboardConstants;

const Profile = (
  {
    onClose,
    isOpen,
    recruitId,
    rep,
    requestRep,
    requestRepContracts,
    requestRecruitingSeason,
    agreementsPerYears,
    loading,
    repIsLoading,
    removeErrors,
    recruit,
  },
) => {
  const [addContractOpen, setAddContractOpen] = useState(false);
  const [viewContractOpen, setViewContractOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState();
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (
      recruitId &&
      isOpen
    ) {
      requestRepContracts({ recruitId });
    }
  }, [
    isOpen,
    recruitId,
    requestRepContracts,
  ]);

  useEffect(() => {
    requestRecruitingSeason();
  }, [requestRecruitingSeason]);

  useEffect(() => {
    if (recruit?.recruit_id) {
      requestRep({ id: recruit?.recruit_id });
    }
  }, [requestRep, recruit]);

  const onAddNewClick = () => {
    setAddContractOpen(true);
  };

  const onAddNewClose = () => {
    setAddContractOpen(false);
  };

  const onContractClick = useCallback((contract) => {
    setSelectedContract(contract);
    setViewContractOpen(true);
  }, [setSelectedContract, setViewContractOpen]);

  const onViewContractClose = useCallback(({ reloadContracts }) => {
    setViewContractOpen(false);
    removeErrors();

    if (reloadContracts && recruitId && !loading) {
      requestRepContracts({ recruitId });
    }
  }, [setViewContractOpen, removeErrors, recruitId, loading, requestRepContracts]);

  const onProfileClose = useCallback(() => {
    onClose();
    setSelectedTab(0);
  }, [onClose]);

  const renderTab = (tab) => {
    if (tab === 0) {
      return loading? (
        <Loader />
      ) : (
        <FilterableAgreementList
          agreementsPerYears={agreementsPerYears || []}
          onAddNewClick={onAddNewClick}
          onContractClick={onContractClick}
          selectedUser={recruitId}
        />
      );
    } else if (tab === 1) {
      return repIsLoading ?
        <Loader /> :
        <GeneralInfo recruit={rep} />;
    }
  };

  const updateSelectedTab = (selectedTab) => {
    setSelectedTab(selectedTab);
    removeErrors();
  };

  const closeButtonRef = useRef(null);

  return (
    <>
      <SideDrawerWrapper isOpened={isOpen} onCloseModal={onProfileClose} large>
        <div className="px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center mb-4 space-x-4 lg:space-x-6">
              <img
                className={addFsExcludeClass('w-16 h-16 rounded-full lg:w-20 lg:h-20')}
                src={person}
                alt=""
              />
              <div className="space-y-1 text-lg font-medium leading-6 ">
                <h3 className={addFsExcludeClass()}>{!isEmpty(rep) && `${rep?.first_name} ${rep?.last_name}`}</h3>
                <p className="text-xs text-gray-400">
                  {/* TODO: Experienced Rep */}
                </p>
              </div>
            </div>
            <div className="flex items-center ml-3 h-7">
              <button
                className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:ring-2 focus:ring-aptivegreen"
                onClick={onProfileClose}
                ref={closeButtonRef}
              >
                <span className="sr-only">Close panel</span>
                <XIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-200">
          <div className="px-6">
            <nav className="flex -mb-px space-x-6">
              <button
                onClick={() => updateSelectedTab(0)}
                className={`${
                  selectedTab === 0
                    ? 'border-aptivegreen text-black font-bold border-b-4'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium border-b-2'
                } whitespace-nowrap pb-4 px-1 text-sm`}
              >
                {AGREEMENTS}
              </button>
              <button
                onClick={() => updateSelectedTab(1)}
                className={`${
                  selectedTab === 1
                    ? 'border-aptivegreen text-black font-bold border-b-4'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium border-b-2'
                } whitespace-nowrap pb-4 px-1 text-sm`}
              >
                {GENERAL}
              </button>
            </nav>
          </div>
        </div>
        {renderTab(selectedTab)}
      </SideDrawerWrapper>
      <AddContract
        recruit={rep}
        isOpen={addContractOpen}
        onClose={onAddNewClose}
      />
      <ViewContract
        recruit={rep}
        contract={selectedContract}
        isOpen={viewContractOpen}
        onClose={onViewContractClose}
      />
    </>
  );
};

const mapStateToProps = (state, { recruit }) => {
  const recruitId = recruit && recruit.recruit_id;

  return {
    loading: agreementsDrawerIsLoadingSelector(state) || recruitingSeasonIsLoadingSelector(state),
    repIsLoading: repsLoadingSelector(state),
    agreementsPerYears: repContractsSelector(state, recruitId),
    recruitId,
    rep: repSelector(state, recruitId),
  };
};

const mapDispatchToProps = {
  requestRepContracts: requestRepContractsAsync.request,
  requestRecruitingSeason: requestRecruitingSeasonAsync.request,
  requestRep: requestRepAsync.request,
  removeErrors: removeAllErrorsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
