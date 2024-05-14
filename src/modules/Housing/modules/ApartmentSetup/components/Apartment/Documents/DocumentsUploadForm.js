import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useRef, useState, useCallback } from 'react';
import { FormProvider } from 'react-hook-form';
import ApartmentFormWrapper from '../Modal/ApartmentFormWrapper';
import { CustomButtonGroup, CustomFormElement } from '@/components/common';
import { useFormActions, fileAcceptValidation } from '@/modules/Housing/modules/ApartmentSetup/lib/';
import { apartmentFormLoadingSelector } from '@/modules/Housing/redux/loading';
import {
  apartmentConstants,
} from '@/modules/Housing/lib';
import {
  apartmentDataSelector,
  documentUploadDataSelector,
  documentsListSelector,
  deleteDocumentAsync,
} from '@/modules/Housing/redux/apartment';
import { useApartmentEditable } from '@/modules/Housing/hooks';

import { saveAs } from 'file-saver';
import heic2any from 'heic2any';
import { DocumentIcon, DownloadIcon, ArchiveIcon } from '@heroicons/react/outline';
import { ImageModal, ConfirmationModal } from '@/components';

const FILE_UPLOAD = 'file_upload';
const {
  DOCUMENT_UPLOAD_FORM_TITLE,
  DOCUMENT_UPLOAD_FORM_NAME,
  DOCUMENT_UPLOAD_NAME,
  DELETE_DOCUMENT_CONFIRMATION_TITLE,
  DELETE_DOCUMENT_CONFIRMATION_MESSAGE,
  DELETE_DOCUMENT_CONFIRMATIONS_BUTTON,
  DELETE_DOCUMENT_CONFIRMATION_CANCEL,
} = apartmentConstants;

const DocumentsUploadForm = ({
  // Own Props
  complex,
  apartmentId,
  nextStep,
  documentsList,
  onClose,
  // State / Dispatch
  isApartmentLoading,
  documentUploadData,
  selectedApartment,
  deleteDocument,
}) => {
  const formRef = useRef(null);
  const canEditField = useApartmentEditable({ isArchived: selectedApartment.is_archived });
  const [documentFileShowName, setDocumentFileShowName] = useState('');
  const [isOpenPreviewModal, setIsOpenPreviewModal] = useState(false);
  const [image, setImage] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [documentID, setDocumentID] = useState(null);

  const {
    methods,
    handleSubmitForm,
  } = useFormActions({
    formData: documentUploadData,
    nextStep,
    apartmentId,
    complexId: complex?.id,
    selected: selectedApartment,
    formDataName: DOCUMENT_UPLOAD_FORM_NAME,
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = methods;

  const handleFileChange = useCallback((event) => {
    const { name, type, files } = event.target;
    const fileValidation = fileAcceptValidation(files[0].name, files[0].size);
    if (fileValidation.status) {
      if (type === 'file') {
        setDocumentFileShowName(files[0].name);
        setValue(name, files[0], {});
      } else {
        setValue(name, '', {});
      }
    } else {
      setValue(name, '', {});
      setDocumentFileShowName(fileValidation.msg);
    }
  }, [
    setValue,
  ]);

  const handleImageClose = useCallback(() => {
    setIsOpenPreviewModal(false);
  }, [setIsOpenPreviewModal]);

  async function downloadFile(file) {
    const { download_url: url, file_name: fileName, ext: ext } = file;

    const res = await fetch(url, { method: 'GET' });

    let resultBlob;
    if (ext === 'heic') {
      const blob = await res.blob();
      resultBlob = heic2any({ blob, toType: 'jpeg' });
    } else {
      resultBlob = await res.blob();
    }

    saveAs(resultBlob, fileName);
  }

  const onFormSubmitSuccess = useCallback(() => {
    setValue(DOCUMENT_UPLOAD_NAME, '', { shouldValidate: true });
    setDocumentFileShowName('');
  }, [setDocumentFileShowName]);

  function handleOpenPreview(item) {
    setImage({
      url: item.download_url,
      title: item.file_name,
    });

    setIsOpenPreviewModal(true);
  }

  const onConfirmationDelete = () => {
    deleteDocument({
      data: documentID,
      complexId: complex?.id,
      apartmentId: apartmentId,
    });
    setDocumentID(null);
    setConfirmationOpen(false);
  };

  const onConfirmationBack = () => {
    setDocumentID(null);
    setConfirmationOpen(false);
  };

  const onDeleteClick = (id) => {
    setDocumentID(id);
    setConfirmationOpen(true);
  };

  function displayDocumentsList() {
    return documentsList.map((item, index) => (
      <div key={index} className="flex items-center py-4 border-b border-gray-200">
        <div className="flex-shrink-0 w-16 h-16 mr-4">
          {item.type === 'normal' && (
            <DocumentIcon className="h-16 w-16 text-black-500" aria-hidden="true" />
          )}
          {item.type === 'image' && (
            <img src={item.download_url} alt="Thumbnail" className="w-full h-full object-cover rounded" />
          )}
        </div>
        <div className="flex flex-col flex-grow">
          <p className="text-lg font-medium">{item.file_name}</p>
          <p className="text-sm text-gray-500">
            {`Uploaded At: ${item.uploaded_at}`}
          </p>
          {(item.type === 'image' || item.type === 'pdf') &&
          (
            <div className="text-left">
              <button onClick={() => handleOpenPreview(item)} className="text-blue-500 hover:underline" type="button">
                View File
              </button>
            </div>
          )}
        </div>
        <button type="button" className="ml-auto mr-2 text-red-500 hover:text-red-700" onClick={() => onDeleteClick(item.id)}>
          <ArchiveIcon className="h-8 w-8 text-black-500" aria-hidden="true" />
        </button>
        <button type="button" className="ml-auto text-blue-500 hover:text-blue-700" onClick={() => downloadFile(item)}>
          <DownloadIcon className="h-8 w-8 text-black-500" aria-hidden="true" />
        </button>
      </div>
    ));
  }

  return (
    <ApartmentFormWrapper ref={formRef} step={6} title={DOCUMENT_UPLOAD_FORM_TITLE} isLoading={isApartmentLoading}>
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(() => handleSubmitForm(onFormSubmitSuccess))}>
          <div className="p-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-1">
            <CustomFormElement
              id={FILE_UPLOAD}
              name={FILE_UPLOAD}
              type="file"
              inputFileName={DOCUMENT_UPLOAD_NAME}
              inputFileId={DOCUMENT_UPLOAD_NAME}
              onChange={handleFileChange}
              register={register}
              error={errors?.[DOCUMENT_UPLOAD_NAME]}
              disabled={!canEditField(DOCUMENT_UPLOAD_NAME)}
            />
          </div>
          {documentFileShowName.length > 0 && (
            <div className="bg-blue-100 p-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-1">
              <p className="ml-3 text-sm text-blue-700">{documentFileShowName}</p>
            </div>
          )}

          <CustomButtonGroup
            orientation="right"
            onCancelClick={onClose}
            wrapperClassName="pt-6 pr-6"
            saveText="Submit"
            withSubmit
            disabledSave={selectedApartment.is_archived}
          />
        </form>
      </FormProvider>
      <div className="container mx-auto py-8 px-8">
        {documentsList && displayDocumentsList()}
      </div>
      <ImageModal image={image?.url} title={image?.title} onClose={handleImageClose} isOpen={isOpenPreviewModal} />
      <ConfirmationModal
        isOpened={confirmationOpen}
        modalWidth="max-w-[592px] w-full"
        onCancel={onConfirmationBack}
        onAction={onConfirmationDelete}
        title={DELETE_DOCUMENT_CONFIRMATION_TITLE}
        message={DELETE_DOCUMENT_CONFIRMATION_MESSAGE}
        cancelLabel={DELETE_DOCUMENT_CONFIRMATION_CANCEL}
        confirmLabel={DELETE_DOCUMENT_CONFIRMATIONS_BUTTON}
      />
    </ApartmentFormWrapper>
  );
};

DocumentsUploadForm.propTypes = {
  complex: PropTypes.object,
  apartmentId: PropTypes.number,
  nextStep: PropTypes.object,
  onClose: PropTypes.func,
  isApartmentLoading: PropTypes.bool,
  documentUploadData: PropTypes.object,
  documentsList: PropTypes.array,
  createApartment: PropTypes.func,
  updateApartment: PropTypes.func,
  deleteDocument: PropTypes.func,
  selectedApartment: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isApartmentLoading: apartmentFormLoadingSelector(state),
  selectedApartment: apartmentDataSelector(state),
  documentUploadData: documentUploadDataSelector(state),
  documentsList: documentsListSelector(state),
});

const mapDispatchToProps = {
  deleteDocument: deleteDocumentAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsUploadForm);
