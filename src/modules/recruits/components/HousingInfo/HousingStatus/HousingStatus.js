import { useFormContext } from 'react-hook-form';
import { CustomFormElement } from '@/components';
import { housingStatusRadioConfig } from '@/lib/configs';
import { onboardingConstants, onboardingDataValues } from '@/lib';
import { addFsExcludeClass } from '@/lib/utils';
import { CustomErrorMessage } from '@/components/common/Form';
import { apartmentStatusesSelector } from '@/redux/reps';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { Icon } from '@/components/common';

const {
  APARTMENT_STATUS_SINGLE_OWN_ROOM_NAME,
  APARTMENT_STATUS_SINGLE_SHARED_ROOM_NAME,
  APARTMENT_STATUS_FEMALE_OWN_ROOM_NAME,
  APARTMENT_STATUS_FEMALE_SHARED_ROOM_NAME,
  APARTMENT_STATUS_MARRIED_NAME,

  SINGLE_OWN_ROOM_MESSAGE,
  SINGLE_SHARED_ROOM_MESSAGE,
  FEMALE_OWN_ROOM_MESSAGE,
  FEMALE_SHARED_ROOM_MESSAGE,
  MARRIED_MESSAGE,
} = onboardingConstants;

const {
  HOUSING_STATUS_LABEL,
  NEEDS_HOUSING,
  HOUSING_TYPE,
  HOUSING_TYPE_LABEL,
  NUM_OF_ROOMS,
  REQUEST_ROOMMATE_LABEL,
  ROOMMATE_REQUEST,
  REP_ACKNOWLEDGMENT,
  HOUSING_ACKNOWLEDGE_LABEL,
} = onboardingConstants;

const HousingStatus = ({
  apartmentStatuses,
  canEditField,
  onChangeHandler,
}) => {
  const { register, getValues, setValue, formState: { errors } } = useFormContext();

  const { needsHousing, housingType } = getValues();

  const [isNeededToPopulateRooms, setIsNeededToPopulateRooms] = useState(false);
  const [roomsSelectOptions, setRoomsSelectOptions] = useState([]);

  const chooseIcon = (statusName) => {
    switch (statusName) {
      case APARTMENT_STATUS_SINGLE_OWN_ROOM_NAME:
        return (
          <Icon
            id={SINGLE_OWN_ROOM_MESSAGE}
            icon="info"
            message={SINGLE_OWN_ROOM_MESSAGE}
          />
        );
      case APARTMENT_STATUS_SINGLE_SHARED_ROOM_NAME:
        return (
          <Icon
            id={SINGLE_SHARED_ROOM_MESSAGE}
            icon="info"
            message={SINGLE_SHARED_ROOM_MESSAGE}
          />
        );
      case APARTMENT_STATUS_FEMALE_OWN_ROOM_NAME:
        return (
          <Icon
            id={FEMALE_OWN_ROOM_MESSAGE}
            icon="info"
            message={FEMALE_OWN_ROOM_MESSAGE}
          />
        );
      case APARTMENT_STATUS_FEMALE_SHARED_ROOM_NAME:
        return (
          <Icon
            id={FEMALE_SHARED_ROOM_MESSAGE}
            icon="info"
            message={FEMALE_SHARED_ROOM_MESSAGE}
          />
        );
      case APARTMENT_STATUS_MARRIED_NAME:
        return (
          <Icon
            id={MARRIED_MESSAGE}
            icon="info"
            message={MARRIED_MESSAGE}
          />
        );
      default:
        return null;
    }
  };

  const apartmentStatusSelectOptions = useMemo(() => {
    return [
      ...apartmentStatuses.map(({ id, status_label, status_name }) => ({
        id: status_label,
        label: status_label,
        value: String(id),
        child: chooseIcon(status_name),
      })),
    ];
  }, [apartmentStatuses]);

  useEffect(() => {
    if (!needsHousing || needsHousing === onboardingDataValues.NO_VALUE) {
      return;
    }

    let isNeededToPopulateRoomsTemp = false;
    let maxRooms = 1;

    apartmentStatuses.forEach((apartmentStatus) => {
      if (parseInt(apartmentStatus.id) === parseInt(housingType) && apartmentStatus.max_rooms_per_status > 1) {
        isNeededToPopulateRoomsTemp = true;
        maxRooms = apartmentStatus.max_rooms_per_status;
      }
    });

    if (!isNeededToPopulateRoomsTemp) {
      setValue(NUM_OF_ROOMS, 1);
    }

    const roomsOptions = [];

    for (let i = 1; i <= maxRooms; i++) {
      roomsOptions.push({ value: i, name: `${i} Room${i > 1 ? 's' : ''}` });
    }

    setIsNeededToPopulateRooms(isNeededToPopulateRoomsTemp);
    setRoomsSelectOptions(roomsOptions);
  }, [needsHousing, apartmentStatuses, housingType, onChangeHandler, setValue]);

  return (
    <>
      <CustomFormElement
        label={HOUSING_STATUS_LABEL}
        type="radio"
        register={register}
        id={NEEDS_HOUSING}
        name={NEEDS_HOUSING}
        radioOptions={housingStatusRadioConfig}
        formElementWrapperClassName="mt-4"
        onChange={onChangeHandler}
        orientation="horizontal"
        required
        disabled={!canEditField(NEEDS_HOUSING)}
        isOpen={needsHousing === housingStatusRadioConfig[0].value}
      />
      {needsHousing === housingStatusRadioConfig[0].value && (
        <div className="grid grid-cols-2 p-5 border-t-0 border-b border-l border-r rounded-b-lg shadow-sm bg-gray-50">
          <div className="w-full col-span-1">
            <CustomFormElement
              type="radio"
              id={HOUSING_TYPE}
              register={register}
              error={errors?.housingType}
              name={HOUSING_TYPE}
              label={HOUSING_TYPE_LABEL}
              radioOptions={apartmentStatusSelectOptions}
              orientation="vertical"
              panelWrapperClassName="justify-between"
              onChange={onChangeHandler}
              disabled={!canEditField(HOUSING_TYPE)}
            />
            {isNeededToPopulateRooms && (
              <div className="pt-2">
                <CustomFormElement
                  colSpan={2}
                  id={NUM_OF_ROOMS}
                  name={NUM_OF_ROOMS}
                  type="select"
                  selectOptions={roomsSelectOptions}
                  onChange={onChangeHandler}
                  register={register}
                  error={errors?.numOfRooms}
                  required
                  disabled={!canEditField(NUM_OF_ROOMS)}
                />
              </div>
            )}
          </div>
          <div className="w-full col-span-2 pl-4">
            <CustomFormElement
              type="text"
              label={REQUEST_ROOMMATE_LABEL}
              name={ROOMMATE_REQUEST}
              id={ROOMMATE_REQUEST}
              error={errors?.roommateRequest}
              placeholder="Ex: First Name, etc"
              register={register}
              onChange={onChangeHandler}
              disabled={!canEditField(ROOMMATE_REQUEST)}
              className={addFsExcludeClass()}
            />
          </div>
          <div className="grid col-span-3 pt-4 pr-2">
            <CustomFormElement
              label={HOUSING_ACKNOWLEDGE_LABEL}
              type="checkbox"
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-aptivegreen"
              id={REP_ACKNOWLEDGMENT}
              register={register}
              name={REP_ACKNOWLEDGMENT}
              orientation="vertical"
              required
              panelWrapperClassName="justify-items-end"
              error={errors?.repAcknowledgment}
              onChange={onChangeHandler}
              disabled={!canEditField(REP_ACKNOWLEDGMENT)}
            />
          </div>
        </div>
      )}
      {errors?.needsHousing?.message && (
        <CustomErrorMessage text={errors?.needsHousing?.message} />
      )}
    </>
  );
};

HousingStatus.propTypes = {
  apartmentStatuses: PropTypes.arrayOf(PropTypes.object),
  canEditField: PropTypes.func,
  onChangeHandler: PropTypes.func,
};
const mapStateToProps = (state) => ({
  apartmentStatuses: apartmentStatusesSelector(state),
});

export default connect(mapStateToProps)(HousingStatus);
