import { Menu, Transition } from '@headlessui/react';
import { Fragment, useCallback, useRef, useEffect, useState, useMemo } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { formatToDate, getEndOfYear, getStartOfYear, mergeClassName } from '@/lib/utils';
import PropTypes from 'prop-types';
import { CustomFormElement } from '@/components/common';
import ChangeStatusModal from '../ChangeStatusModal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { StatusDateValidationSchema } from '../StatusDateValidationSchema';
import { onboardingConstants, dashboardConstants } from '@/lib/constants';
import { updateRepsStatusAsync } from '@/redux/sales-operations';
import { selectIsUpdateStatusLoading } from '@/redux/loading';
import { repStatusesSelector } from '@/redux/reps';
import { connect } from 'react-redux';
import classNames from 'classnames';

const {
  ACTUAL_END_DATE_LABEL,
  SP_START_DATE_LABEL,
} = onboardingConstants;

const {
  REP_STATUS_NAME,
} = dashboardConstants;

const StatusDropdown = ({
  isDisabled,
  onChange,
  repStatuses,
  updateRepsStatus,
  repsToChangeStatus,
  wrapperClassName,
  label,
}) => {
  const [datePickerName, setDatePickerName] = useState(null);
  const [datePickerLabel, setDatePickerLabel] = useState(null);
  const [datePickerValue, setDatePickerValue] = useState(null);
  const [isStatusModal, setIsStatusModal] = useState(false);
  const [repsStatusCode, setRepsStatusCode] = useState('');
  const [repsStatus, setRepsStatus] = useState(null);
  const isMounted = useRef(true);

  const currentYear = (new Date()).getFullYear();
  const minDate = getStartOfYear(currentYear - 1);
  const maxDate = getEndOfYear(currentYear + 1);

  const wrapperClasses = useMemo(
    () => classNames(
      wrapperClassName ? wrapperClassName : 'absolute left-4 p-1',
    ),
    [wrapperClassName],
  );

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(StatusDateValidationSchema),
    context: { repStatuses },
  });

  const openStatusModal = useCallback(() => {
    setIsStatusModal(true);
  }, []);

  const closeStatusModal = useCallback(() => {
    clearErrors();
    setIsStatusModal(false);
    setRepsStatusCode('');
  }, [clearErrors]);

  const onUpdateRepsStatus = useCallback((newRepsStatusData) => {
    const statusParams = {
      status: newRepsStatusData ? newRepsStatusData[REP_STATUS_NAME] : repsStatusCode,
      reps: repsToChangeStatus,
    };

    if (datePickerName) {
      statusParams[datePickerName] = datePickerValue;
    }

    updateRepsStatus({
      statusParams: statusParams,
      onSuccess: () => {
        onChange();
      },
    });

    if (isMounted.current && isStatusModal) {
      closeStatusModal();
    } else if (isMounted.current) {
      setRepsStatusCode('');
    }
  }, [
    repsStatusCode,
    repsToChangeStatus,
    datePickerName,
    updateRepsStatus,
    isStatusModal,
    datePickerValue,
    closeStatusModal,
    onChange,
  ]);

  const onChangeDatepickerHandler = useCallback((event) => {
    const { name, value } = event.target;

    setValue(name, value, { shouldValidate: true });
    setDatePickerValue(value);
  }, [setValue]);

  const changeStatus = (newRepStatusCode) => () => {
    setRepsStatusCode(newRepStatusCode);
    setValue(REP_STATUS_NAME, newRepStatusCode, { shouldValidate: true });

    const status = repStatuses.find((status) => status.statusCode === newRepStatusCode);

    if (status) {
      setRepsStatus(status);
    }

    if (!status || !newRepStatusCode) {
      return;
    }

    if (status.isLossOfAccess || status.shouldBeUpdatedWithStartDate || status.shouldBeUpdatedWithEndDate) {
      openStatusModal();
    } else {
      onUpdateRepsStatus({ [REP_STATUS_NAME]: newRepStatusCode });
    }

    if (status.shouldBeUpdatedWithStartDate) {
      setDatePickerName('start_date');
      setDatePickerLabel(SP_START_DATE_LABEL);
    } else if (status.shouldBeUpdatedWithEndDate) {
      setDatePickerName('actual_end_date');
      setDatePickerLabel(ACTUAL_END_DATE_LABEL);
    } else {
      setDatePickerName(null);
      setDatePickerLabel(null);
    }

    setValue(datePickerName, '', { shouldValidate: false });
    setDatePickerValue(null);
  };

  return (
    <>
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className={wrapperClasses} disabled={isDisabled}>
              {label ?? ''}
              <ChevronDownIcon className="w-4 h-4 stroke-gray-400" />
            </Menu.Button>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                as="ul"
                className=" absolute left-0 top-7 w-56 rounded-lg bg-white shadow-popup z-[1]"
              >
                {repStatuses.map((repStatus, i) => (
                  <Menu.Item as="li" key={repStatus.statusCode}>
                    <button
                      type="button"
                      className={mergeClassName(
                        'w-full py-2.5 px-4 text-sm text-left text-gray-600 hover:bg-gray-50 transition-color duration-200',
                        { 'border-b': Boolean(repStatuses[i + 1]) },
                      )}
                      onClick={changeStatus(repStatus.statusCode)}
                    >
                      {repStatus.statusTitle}
                    </button>
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
      <ChangeStatusModal
        isOpened={isStatusModal}
        status={repsStatusCode}
        onCancel={closeStatusModal}
        onAction={handleSubmit(onUpdateRepsStatus)}
        getConfirmationMessage={(status, statusText) => repsStatus?.isLossOfAccess
          ? `By changing the user status to “${statusText}“, this user will not have access to their profile or other information.`
          : ''
        }
        repStatuses={repStatuses}
      >
        {datePickerName && datePickerLabel && (
          <CustomFormElement
            register={register}
            id={datePickerName}
            name={datePickerName}
            label={datePickerLabel}
            formValue={datePickerValue}
            type="date"
            minDate={formatToDate(minDate)}
            maxDate={formatToDate(maxDate)}
            showYearDropdown
            onChange={onChangeDatepickerHandler}
            required
            error={errors?.[datePickerName]}
            disabled={false}
            formElementWrapperClassName="my-2"
          />
        )}
      </ChangeStatusModal>
    </>
  );
};

StatusDropdown.propTypes = {
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
  updateRepsStatus: PropTypes.func,
  repStatuses: PropTypes.arrayOf(PropTypes.object),
  wrapperClassName: PropTypes.string,
  repsToChangeStatus: PropTypes.array,
  label: PropTypes.string,
};

const mapStateToProps = (state) => ({
  repStatuses: repStatusesSelector(state),
  isStatusUpdating: selectIsUpdateStatusLoading(state),
});

const mapDispatchToProps = {
  updateRepsStatus: updateRepsStatusAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusDropdown);
