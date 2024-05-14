import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { UserAddIcon, XIcon } from '@heroicons/react/outline';

import {
  addRepAsync,
  requestSalesProgramsAsync,
  selectSalesPrograms,
  experienceOptionsSelector,
} from '@/redux/reps';
import { ErrorBox, Loader, SideDrawerWrapper } from '@/components';
import { repsLoadingSelector, recruiterManagersLoadingSelector } from '@/redux/loading';

import {
  requestRecruitersAsync,
  requestRecruiterManagersAsync,
  requestRecruitingOfficesAsync,
  selectRecruiters,
  selectRecruitingOffices,
} from '@/redux/recruiters';

import { addRepErrorsSelector, removeAllErrorsAction } from '@/redux/errors';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { validationSchema } from '@/modules/dashboard/forms/LeadForm/LeadValidationSchema';
import { dashboardConstants, onboardingConstants, onboardingDataValues } from '@/lib';
import { v4 as uuidv4 } from 'uuid';
import RequiredInfo from './RequiredInfo';
import RecruiterInfo from './RecruiterInfo';
import ExperienceList from '@/modules/recruits/components/LicensingInfo/RepExperience/ExperienceList';
import { combineLeadData } from '@/modules/dashboard/lib';
import { getLeadExperienceFields } from '@/modules/dashboard/lib/configs';
import PropTypes from 'prop-types';
import { useFeatureFlag } from 'configcat-react';

const {
  EMAIL_NAME,
  SSN_LAST_FOUR_NAME,
  RECRUITER_NAME,
  RECRUITING_OFFICE_NAME,
  PHONE_NAME,
  SALES_PROGRAM_NAME,
  SALES_PROGRAM_FEATURE_FLAG_NAME,
} = dashboardConstants;

const {
  HAS_REP_EXPERIENCE,
  REP_EXPERIENCES_DATA_NAME,
  FIRST_NAME,
  LAST_NAME,
  DATE_OF_BIRTH,
} = onboardingConstants;

const requiredInfoDefault = {
  [FIRST_NAME]: '',
  [LAST_NAME]: '',
  [EMAIL_NAME]: '',
  [PHONE_NAME]: '',
  [SSN_LAST_FOUR_NAME]: '',
  [DATE_OF_BIRTH]: '',
  [HAS_REP_EXPERIENCE]: onboardingDataValues.ZERO_VALUE,
  [REP_EXPERIENCES_DATA_NAME]: [],
  [SALES_PROGRAM_NAME]: [],
};

const recruiterInfoDefault = {
  [RECRUITER_NAME]: 0,
  [RECRUITING_OFFICE_NAME]: 0,
};

const AddLead = ({
  formErrors,
  onClose,
  isOpen,
  repIsLoading,
  recruiters,
  recruitingOffices,
  requestRecruiters,
  requestRecruiterManagers,
  requestRecruitingOffices,
  recruiterManagersIsLoading,
  addRep,
  removeErrors,
  salesPrograms,
  requestSalesPrograms,
  experienceOptions,
}) => {
  const { value: isSalesProgramEnabled } = useFeatureFlag(
    SALES_PROGRAM_FEATURE_FLAG_NAME,
    false,
  );
  const [recruiterInfo, setRecruiterInfo] = useState(recruiterInfoDefault);

  const methods = useForm({
    defaultValues: requiredInfoDefault,
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema, { abortEarly: false }),
    context: { isExperienceRequired: true },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = methods;

  const { [SALES_PROGRAM_NAME]: selectedSalesProgram } = getValues();

  const errorRows = useMemo(() => {
    return formErrors?.length ? formErrors.map((error) => (
      <ErrorBox message={error.message} key={uuidv4()} />
    )) : [];
  }, [formErrors]);

  // Load the recruiters if they haven't been loaded yet
  useEffect(() => {
    if (recruiters?.length === 0) {
      requestRecruiters();
      requestRecruitingOffices();
    }
    if (isSalesProgramEnabled && salesPrograms?.length === 0) {
      requestSalesPrograms();
    }
  }, [
    isSalesProgramEnabled,
    recruiters,
    requestRecruiters,
    requestRecruitingOffices,
    requestSalesPrograms,
    salesPrograms,
  ]);

  // Load managers for the selected recruiter if they haven't loaded yet
  useEffect(() => {
    const recruiter = recruiters.find((rec) => rec.value === recruiterInfo[RECRUITER_NAME]);

    if (!recruiter) {
      return;
    }

    if (!recruiter.managers) {
      requestRecruiterManagers({ recruiterId: recruiterInfo[RECRUITER_NAME] });
    }
  }, [
    recruiterInfo?.[RECRUITER_NAME],
    recruiters,
    recruitingOffices,
    requestRecruiterManagers,
    setRecruiterInfo,
    setValue,
  ]);

  const onChangeRequiredInfo = (event) => {
    const { name, value } = event.target || event;

    setValue(name, value, { shouldValidate: true });
  };

  const onChangeRecruiterInfo = (name, value) => {
    setValue(name, value, { shouldValidate: true });

    setRecruiterInfo({
      ...recruiterInfo,
      [name]: value,
    });
  };

  const closeModal = (param) => {
    // Clear out the form for next time
    removeErrors();
    setRecruiterInfo(recruiterInfoDefault);
    reset(requiredInfoDefault);
    onClose(param);
  };

  const handleSubmitForm = useCallback(() => {
    const newLead = combineLeadData(getValues());

    addRep({
      newLead,
      successCallback: ({ rep }) => closeModal({ rep }),
    });
  }, [getValues, addRep]);

  const closeButtonRef = useRef(null);

  return (
    <SideDrawerWrapper isOpened={isOpen} onCloseModal={closeModal} large>
      <div className="px-4 py-4 border-b border-gray-200 sm:px-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4 lg:space-x-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-aptivegreen">
              <UserAddIcon
                color="white"
                className="w-6 h-6"
                aria-hidden="true"
              />
            </div>
            <div className="space-y-1 text-lg font-bold leading-6 ">
              <h3>Add New Recruit</h3>
            </div>
          </div>
          <div className="flex items-center ml-3 h-7">
            <button
              className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:ring-2 focus:ring-aptivegreen"
              onClick={closeModal}
              ref={closeButtonRef}
            >
              <span className="sr-only">Close panel</span>
              <XIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 px-6 py-5 bg-gray-100 border-b border-gray-200 sm:px-6">
        <>{errorRows?.length > 0 && <>{errorRows}</>}</>
        <FormProvider {...methods}>
          <form noValidate className="pt-4" onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="px-3 pb-6 bg-white border border-gray-200 rounded-md shadow-sm">
              <RequiredInfo
                errors={errors}
                onChangeField={onChangeRequiredInfo}
                register={register}
                isSalesProgramEnabled={isSalesProgramEnabled}
                salesProgramsOptions={salesPrograms?.map((program) => ({ name: program.label, value: program.id }))}
                selectedSalesProgram={selectedSalesProgram}
                experienceOptions={experienceOptions}
              />
              <ExperienceList
                constants={getLeadExperienceFields()}
                canEditField={() => true}
                onChangeHandler={onChangeRequiredInfo}
                wrapperClassName="mt-6"
              />
            </div>
            <div className="px-3 pb-6 mt-6 bg-white border border-gray-200 rounded-md shadow-sm">
              <RecruiterInfo
                data={recruiterInfo}
                errors={errors}
                recruiters={recruiters || []}
                recruitingOffices={recruitingOffices || []}
                recruiterManagersIsLoading={recruiterManagersIsLoading}
                onChangeField={onChangeRecruiterInfo}
                register={register}
              />
            </div>
            <div className="flex flex-row-reverse px-6 py-6 mt-6 border-t border-gray-200">
              {repIsLoading ? (
                <div className="flex justify-center mt-2 ml-4 max-h-8">
                  <Loader />
                </div>
              ) : (
                <button
                  type="submit"
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-aptivegreen hover:bg-aptivegreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aptivegreen-500 sm:ml-3 sm:w-40 sm:text-sm"
                >
                  Save
                </button>
              )}
              <button
                type="button"
                className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aptivegreen sm:mt-0 sm:ml-3 sm:w-20 sm:text-sm"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </SideDrawerWrapper>
  );
};

const mapStateToProps = (state) => ({
  repIsLoading: repsLoadingSelector(state),
  recruiters: selectRecruiters(state),
  recruitingOffices: selectRecruitingOffices(state),
  salesPrograms: selectSalesPrograms(state),
  recruiterManagersIsLoading: recruiterManagersLoadingSelector(state),
  formErrors: addRepErrorsSelector(state),
  experienceOptions: experienceOptionsSelector(state),
});

const mapDispatchToProps = {
  requestRecruiters: requestRecruitersAsync.request,
  requestRecruiterManagers: requestRecruiterManagersAsync.request,
  requestRecruitingOffices: requestRecruitingOfficesAsync.request,
  requestSalesPrograms: requestSalesProgramsAsync.request,
  addRep: addRepAsync.request,
  removeErrors: removeAllErrorsAction,
};

AddLead.propTypes = {
  salesPrograms: PropTypes.array,
  requestSalesPrograms: PropTypes.func,
  experienceOptions: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLead);
