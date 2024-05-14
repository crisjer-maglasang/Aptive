import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { CustomFormElement } from '@/components';
import { addFsExcludeClass } from '@/lib/utils';
import { onboardingConstants } from '@/lib/';

const {
  ADDRESS_HISTORY_LABEL,
  ADDRESS_HISTORY_START_DATE_LABEL,
  ADDRESS_HISTORY_END_DATE_LABEL,
  ADDRESS_HISTORY_NAME,
  ADDRESS_HISTORY_START_DATE,
  ADDRESS_HISTORY_END_DATE,
} = onboardingConstants;

const ResidentialHistory = ({
  canEditField,
  onChangeHandler,
  onBlurTrimSpace,
}) => {
  // 10 years previous
  const minDate = new Date(`${new Date().getFullYear() - 10}-01-01T00:00:00`);
  const maxDate = new Date(`${new Date().getFullYear() + 10}-12-31T23:59:59`);

  const { register, getValues, trigger, formState: { errors } } = useFormContext();

  const { addressHistoryEndDate } = getValues();

  const onChangeHandlerWrapper = useCallback(async (event) => {
    onChangeHandler(event);

    const { name } = event.target;

    // Re-validate `Address History End Date` (if it has any value)
    // upon the `Address History Start Date` update because it depends on the latter.
    if (name === ADDRESS_HISTORY_START_DATE) {
      if (addressHistoryEndDate) {
        await trigger(ADDRESS_HISTORY_END_DATE);
      }
    }
  }, [
    onChangeHandler,
    trigger,
    addressHistoryEndDate,
  ]);

  return (
    <div className="flex justify-between gap-x-4">
      <div className="col-span-2 col-start-4 flex-auto">
        <CustomFormElement
          colSpan={2}
          id={ADDRESS_HISTORY_NAME}
          name={ADDRESS_HISTORY_NAME}
          label={ADDRESS_HISTORY_LABEL}
          type="text"
          onChange={onChangeHandlerWrapper}
          onBlur={(event) => onBlurTrimSpace(event, ADDRESS_HISTORY_NAME)}
          register={register}
          error={errors?.addressHistoryName}
          required
          className={addFsExcludeClass()}
          disabled={!canEditField(ADDRESS_HISTORY_NAME)}
        />
      </div>
      <div className="col-span-2 col-start-4 flex-1">
        <CustomFormElement
          colSpan={2}
          id={ADDRESS_HISTORY_START_DATE}
          name={ADDRESS_HISTORY_START_DATE}
          label={ADDRESS_HISTORY_START_DATE_LABEL}
          type="date"
          showYearDropdown
          minDate={minDate}
          maxDate={maxDate}
          onChange={onChangeHandlerWrapper}
          register={register}
          error={errors?.addressHistoryStartDate}
          required
          disabled={!canEditField(ADDRESS_HISTORY_START_DATE)}
        />
      </div>
      <div className="col-span-2 col-start-4 flex-1">
        <CustomFormElement
          colSpan={2}
          id={ADDRESS_HISTORY_END_DATE}
          name={ADDRESS_HISTORY_END_DATE}
          label={ADDRESS_HISTORY_END_DATE_LABEL}
          type="date"
          showYearDropdown
          minDate={minDate}
          maxDate={maxDate}
          onChange={onChangeHandlerWrapper}
          register={register}
          error={errors?.addressHistoryEndDate}
          required
          disabled={!canEditField(ADDRESS_HISTORY_END_DATE)}
        />
      </div>
    </div>
  );
};

ResidentialHistory.propTypes = {
  canEditField: PropTypes.func,
  onChangeHandler: PropTypes.func,
  onBlurTrimSpace: PropTypes.func,
};

export default ResidentialHistory;
