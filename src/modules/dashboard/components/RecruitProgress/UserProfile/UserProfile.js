import { Fragment, useState, useContext, useEffect } from 'react';
import { Dialog, Menu, Transition, Tab } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { connect } from 'react-redux';
import { Loader, DocumentsList, AttachmentsList, SideDrawerWrapper } from '@/components';
import person from '../../../../../assets/person.png';
import { RecruitProgressContext } from '../../../pages/RecruitProgress';
import { requestRepContractsAsync } from '@/redux/contracts';
import { myTreeContactLoadingSelector } from '@/redux/loading';
import { isAdminSelector, isContractEditableSelector } from '@/redux/auth';
import ProfileTab from './ProfileTab';
import { addFsExcludeClass } from '@/lib/utils';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const UserProfile = ({
  contracts,
  requestRepContracts,
  loading,
  reloadPageInfo,
  isAdmin,
  isContractEditable,
}) => {
  const { open, setOpen, receivedRep } = useContext(RecruitProgressContext);
  const [documents, setDocuments] = useState({});

  useEffect(() => {
    if (receivedRep) {
      requestRepContracts(
        receivedRep.recruit_id
          ? { recruitId: receivedRep.recruit_id }
          : { userId: receivedRep.user_id },
      );
    }
  }, [receivedRep, requestRepContracts]);

  useEffect(() => {
    const recruitId = receivedRep?.recruit_id;
    const agreements =
      contracts && contracts[recruitId] ? contracts[recruitId].contractsPerYears : null;

    setDocuments(agreements ?? {});
  }, [contracts, receivedRep?.recruit_id]);

  const onClose = () => {
    setOpen(false);
    setDocuments({});
  };

  const onUserDeleted = () => {
    onClose();
    reloadPageInfo();
  };

  return (
    <SideDrawerWrapper isOpened={open} onCloseModal={onClose} extraLarge>
      <div className="px-4 py-6 sm:px-6 bg-aptivegreen">
        <div className="flex items-start justify-between">
          <Dialog.Title className="text-lg font-medium text-gray-900" />
          <div className="flex items-center ml-3 h-7">
            <button
              type="button"
              className="text-white rounded-md opacity-50 bg-aptivegreen hover:opacity-100 focus:ring-2 focus:ring-white-500"
              onClick={() => setOpen(false)}
            >
              <span className="sr-only">Close panel</span>
              <XIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      {/* Main */}
      {loading ? (
        <Loader />
      ) : (
        <div className="divide-y divide-gray-200">
          <div>
            <div className="h-16 bg-aptivegreen sm:h-2 lg:h-16" />
            <div className="-mt-12">
              <div>
                <div className="flex justify-between px-4">
                  <div className="inline-flex pb-6 overflow-hidden border-4 border-white rounded-full">
                    <img
                      className={addFsExcludeClass('flex-shrink-0 w-24 h-24 rounded-full sm:h-24 sm:w-24 lg:w-32 lg:h-32')}
                      src={receivedRep?.profile_img || person}
                      alt="profile_picture"
                    />
                  </div>
                  <div className="flex justify-end">
                    <span className="inline-flex ml-3">
                      <Menu
                        as="div"
                        className="relative inline-block mt-16 text-left"
                      >
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="src/components/forms#"
                                    className={classNames(
                                      active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                      'block px-4 py-2 text-sm',
                                    )}
                                  >
                                    View profile
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="src/components/forms#"
                                    className={classNames(
                                      active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                      'block px-4 py-2 text-sm',
                                    )}
                                  >
                                    Copy profile link
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-8 mt-6 sm:flex-1">
                <div className="pt-2 -mt-14 -pb-2">
                  <div className="flex items-center">
                    <div className="flex items-center ml-6">
                      <h3 className={addFsExcludeClass('font-bold text-gray-900 text-l sm:text-2xl')}>
                        {`${receivedRep?.first_name} ${receivedRep?.last_name}`}
                      </h3>
                    </div>
                    {receivedRep?.rep_role && (
                      <div className="flex items-center h-8 ml-4 w-36">
                        <span className="inline-flex items-center justify-center w-full h-px py-2 text-xs border-transparent rounded-full shadow-xs border-xs font-xs text-aptivegreen-dark bg-aptivegreen-lighter xs:flex-1">
                          {receivedRep?.rep_role}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex flex-col pt-10">
                      <Tab.Group>
                        <Tab.List className="flex justify-around pl-4 w-96">
                          <Tab as={Fragment}>
                            {({ selected }) => (
                              <button
                                className={
                                  selected
                                    ? 'border-aptivegreen opacity-100 text-black font border-b-2 whitespace-nowrap pb-4 px-1 text-sm'
                                    : 'border-aptivegreen opacity-50 hover:opacity-100 text-black font whitespace-nowrap pb-4 px-1 text-sm'
                                }
                              >
                                Profile
                              </button>
                            )}
                          </Tab>
                          <Tab as={Fragment}>
                            {({ selected }) => (
                              <button
                                className={
                                  selected
                                    ? 'border-aptivegreen opacity-100 text-black font border-b-2 whitespace-nowrap pb-4 px-1 text-sm'
                                    : 'border-aptivegreen opacity-50 hover:opacity-100 text-black font whitespace-nowrap pb-4 px-1 text-sm'
                                }
                              >
                                Documents
                              </button>
                            )}
                          </Tab>
                          {isAdmin && (
                            <Tab as={Fragment}>
                              {({ selected }) => (
                                <button
                                  className={
                                    selected
                                      ? 'border-aptivegreen opacity-100 text-black font border-b-2 whitespace-nowrap pb-4 px-1 text-sm'
                                      : 'border-aptivegreen opacity-50 hover:opacity-100 text-black font whitespace-nowrap pb-4 px-1 text-sm'
                                  }
                                >
                                  Attachments
                                </button>
                              )}
                            </Tab>
                          )}
                        </Tab.List>

                        <div>
                          <Tab.Panels className="border-t border-aptivegray-600">
                            <Tab.Panel>
                              <ProfileTab
                                rep={receivedRep}
                                onUserDeleted={onUserDeleted}
                              />
                            </Tab.Panel>
                            <Tab.Panel className="px-6 py-5 border-b bg-gray-100 h-screen max-w-2xl overflow-y-scroll">
                              <DocumentsList
                                isSeparated
                                documents={documents}
                                recruitId={receivedRep?.recruit_id}
                                selectedUser={receivedRep?.recruit_id}
                                isEditable={isContractEditable}
                              />
                            </Tab.Panel>
                            {isAdmin && (
                              <Tab.Panel className="px-6 py-5 border-b bg-gray-100 h-screen max-w-2xl overflow-y-scroll">
                                <AttachmentsList
                                  userId={receivedRep?.user_id || null}
                                />
                              </Tab.Panel>
                            )}
                          </Tab.Panels>
                        </div>
                      </Tab.Group>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </SideDrawerWrapper>
  );
};

const mapStateToProps = (state) => ({
  loading: myTreeContactLoadingSelector(state),
  contracts: state.contracts,
  isAdmin: isAdminSelector(state),
  isContractEditable: isContractEditableSelector(state),
});

const mapDispatchToProps = {
  requestRepContracts: requestRepContractsAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
