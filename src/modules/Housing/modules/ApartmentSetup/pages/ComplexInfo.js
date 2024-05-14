import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ArrowCircleLeftIcon } from '@heroicons/react/outline';
import { PATH } from '@/modules/Housing/routing/apartmentSetup';
import {
  archiveComplexAsync,
  requestComplexAsync, resetSelectedComplexAction,
  selectedComplexSelector,
  setIsHideMenuAction,
} from '@/modules/Housing/redux/apartment';
import { Outlet, useParams } from 'react-router';
import { ComplexInfoSidebar, ComplexNav } from '../components';
import {
  isComplexLoadingSelector,
} from '@/modules/Housing/redux/loading';
import { Loader } from '@/components/common';
import { ConfirmationModal } from '@/components/modals';
import { apartmentConstants } from '@/modules/Housing/lib';

const {
  ARCHIVE_COMPLEX_CONFIRMATION_TITLE,
  ARCHIVE_COMPLEX_CONFIRMATION_MESSAGE,
  ARCHIVE_COMPLEX_CONFIRMATIONS_BUTTON,
  ARCHIVE_COMPLEX_CONFIRMATION_CANCEL,
} = apartmentConstants;

const ComplexInfo = ({
  setIsHideMenu,
  getComplex,
  selectedComplex,
  isComplexLoading,
  archiveComplex,
  resetSelectedComplex,
}) => {
  const navigate = useNavigate();
  const { teamId, complexId } = useParams();
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  useEffect(() => {
    getComplex({ complexId });
    setIsHideMenu(true);

    return () => {
      setIsHideMenu(false);
    };
  }, [setIsHideMenu]);

  const handleClickBack = () => {
    resetSelectedComplex();

    if (teamId) {
      navigate(`${PATH}/team/${teamId}`);
    } else {
      navigate(PATH, { state: { viewOption: 'complex' } });
    }
  };

  const onConfirmationArchive = () => {
    archiveComplex({ complexId });
    setConfirmationOpen(false);
    handleClickBack();
  };

  const onConfirmationBack = () => {
    setConfirmationOpen(false);
  };

  const onArchiveClick = () => {
    setConfirmationOpen(true);
  };

  return (
    <>
      <div className="w-full flex bg-white border-b border-gray-200 pl-8 pr-8">
        <div className="mt-4 mb-4 mr-8 w-1/5">
          <div
            onClick={handleClickBack}
            className="text-gray-600 hover:text-gray-900 inline-flex items-center hover:bg-gray-50 hover:cursor-pointer hover:bg-white align-middle"
          >
            <ArrowCircleLeftIcon className="h-6 w-6 mr-2" aria-hidden="true" />
            <span className="text-sm">Back to Complexes</span>
          </div>
        </div>
        <div className="w-3/5">
          <ComplexNav teamId={teamId} complexId={complexId} />
        </div>
        <div className="w-1/5 flex items-center justify-end text-gray-600">
          {!isComplexLoading && !selectedComplex.is_archived && <button onClick={onArchiveClick}>Archive Complex</button>}
          <ConfirmationModal
            isOpened={confirmationOpen}
            modalWidth="max-w-[592px] w-full"
            onCancel={onConfirmationBack}
            onAction={onConfirmationArchive}
            title={ARCHIVE_COMPLEX_CONFIRMATION_TITLE}
            message={ARCHIVE_COMPLEX_CONFIRMATION_MESSAGE}
            cancelLabel={ARCHIVE_COMPLEX_CONFIRMATION_CANCEL}
            confirmLabel={ARCHIVE_COMPLEX_CONFIRMATIONS_BUTTON}
          />
        </div>
      </div>
      <div className="grow flex max-w-full m-8">
        <div className="w-1/5 border flex flex-col mr-8 rounded-xl bg-white">
          {isComplexLoading ? <Loader className="pt-6" /> : (
            <ComplexInfoSidebar complex={selectedComplex} />
          )}
        </div>
        <div className="w-4/5 flex flex-col border rounded-xl bg-white pt-0">
          <Outlet />
        </div>
      </div>
    </>
  );
};

ComplexInfo.propTypes = {
  setIsHideMenu: PropTypes.func,
  getTeamInfo: PropTypes.func,
  getComplex: PropTypes.func,
  selectedComplex: PropTypes.object,
  isCreateComplexLoading: PropTypes.bool,
  resetSelectedComplex: PropTypes.func,
};

const mapStateToProps = (state) => ({
  selectedComplex: selectedComplexSelector(state),
  isComplexLoading: isComplexLoadingSelector(state),
});

const mapDispatchToProps = {
  setIsHideMenu: setIsHideMenuAction,
  getComplex: requestComplexAsync.request,
  archiveComplex: archiveComplexAsync.request,
  resetSelectedComplex: resetSelectedComplexAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComplexInfo);
