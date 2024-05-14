import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { connect } from 'react-redux';
import { CustomFormElement } from '@/components';
import { onboardingConstants } from '@/lib';
import { selectSalesSeason } from '@/redux/seasons';
import { formatToDate, getSecondMondayOfFebruary } from '@/lib/utils';
import { recruitingSeasonSelector } from '@/redux/reps';
import PropTypes from 'prop-types';

const {
  EXPECTED_ARRIVAL_DATE,
  EXPECTED_ARRIVAL_DATE_LABEL,
  TENTATIVE_KNOCKING_START_DATE,
  TENTATIVE_KNOCKING_START_LABEL,
  TENTATIVE_KNOCKING_END_DATE,
  TENTATIVE_KNOCKING_END_LABEL,
  EXPECTED_ARRIVAL_DATE_MESSAGE,
  TENTATIVE_KNOCKING_START_MESSAGE,
  TENTATIVE_KNOCKING_END_MESSAGE,
  ACTUAL_START_DATE,
  ACTUAL_START_DATE_LABEL,
  ACTUAL_END_DATE,
  ACTUAL_END_DATE_LABEL,
} = onboardingConstants;

const ArrivalStatus = ({
  isAdmin,
  formLoading,
  canEditField,
  onChangeHandler,
  salesSeason,
  recruitingSeason,
}) => {
  const [canEditArrivalDates, setCanEditArrivalDates] = useState(true);
  const [datesLoaded, setDatesLoaded] = useState(false);

  const { register, getValues, trigger, formState: { errors } } = useFormContext();

  const {
    expectedArrivalDate,
    tentativeKnockingStartDate,
    tentativeKnockingEndDate,
    actualEndDate,
  } = getValues();

  // Only allow dates to be edited if they are empty or the date is before the second Monday of February
  useEffect(() => {
    if (typeof expectedArrivalDate !== 'undefined' && recruitingSeason && !datesLoaded) {
      const isBeforeFebruary = moment().isBefore(getSecondMondayOfFebruary(recruitingSeason.end_date));

      setDatesLoaded(true);
      setCanEditArrivalDates(
        isBeforeFebruary ||
        !expectedArrivalDate ||
        !tentativeKnockingStartDate ||
        !tentativeKnockingEndDate ||
        isAdmin,
      );
    } else if (formLoading) {
      setDatesLoaded(false);
    }
  }, [
    datesLoaded,
    recruitingSeason,
    formLoading,
    isAdmin,
    expectedArrivalDate,
    tentativeKnockingStartDate,
    tentativeKnockingEndDate,
  ]);

  const onChangeHandlerWrapper = useCallback(async (event) => {
    onChangeHandler(event);

    const { name } = event.target;

    // Re-validate `Expected Arrival Date` and `Tentative Knocking End Date` (if they have any value)
    // upon the `Tentative Knocking Start Date` update because they depend on the latter.
    if (name === TENTATIVE_KNOCKING_START_DATE) {
      if (expectedArrivalDate) {
        await trigger(EXPECTED_ARRIVAL_DATE);
      }

      if (tentativeKnockingEndDate) {
        await trigger(TENTATIVE_KNOCKING_END_DATE);
      }
    }

    if (name === ACTUAL_START_DATE) {
      if (actualEndDate) {
        await trigger(ACTUAL_END_DATE);
      }
    }
  }, [
    onChangeHandler,
    trigger,
    expectedArrivalDate,
    tentativeKnockingEndDate,
  ]);

  return (
    <>
      <div className="flex justify-between gap-x-4">
        <div className="col-span-2 col-start-4 flex-1">
          <CustomFormElement
            colSpan={4}
            id={EXPECTED_ARRIVAL_DATE}
            name={EXPECTED_ARRIVAL_DATE}
            label={EXPECTED_ARRIVAL_DATE_LABEL}
            type="date"
            onChange={onChangeHandlerWrapper}
            register={register}
            error={errors?.expectedArrivalDate}
            disabled={!(canEditField(EXPECTED_ARRIVAL_DATE) && canEditArrivalDates)}
            tooltipMessage={EXPECTED_ARRIVAL_DATE_MESSAGE}
            minDate={formatToDate(salesSeason?.summerStartDate)}
            maxDate={formatToDate(salesSeason?.summerEndDate)}
            required
          />
        </div>
        <div className="col-span-2 col-start-4 flex-1">
          <CustomFormElement
            colSpan={4}
            id={TENTATIVE_KNOCKING_START_DATE}
            name={TENTATIVE_KNOCKING_START_DATE}
            label={TENTATIVE_KNOCKING_START_LABEL}
            type="date"
            onChange={onChangeHandlerWrapper}
            register={register}
            error={errors?.tentativeKnockingStartDate}
            disabled={!(canEditField(TENTATIVE_KNOCKING_START_DATE) && canEditArrivalDates)}
            tooltipMessage={TENTATIVE_KNOCKING_START_MESSAGE}
            minDate={formatToDate(salesSeason?.summerStartDate)}
            maxDate={formatToDate(salesSeason?.summerEndDate)}
            required
          />
        </div>
        <div className="col-span-2 col-start-4 flex-1">
          <CustomFormElement
            colSpan={4}
            id={TENTATIVE_KNOCKING_END_DATE}
            name={TENTATIVE_KNOCKING_END_DATE}
            label={TENTATIVE_KNOCKING_END_LABEL}
            type="date"
            onChange={onChangeHandlerWrapper}
            register={register}
            error={errors.tentativeKnockingEndDate}
            disabled={!(canEditField(TENTATIVE_KNOCKING_END_DATE) && canEditArrivalDates)}
            tooltipMessage={TENTATIVE_KNOCKING_END_MESSAGE}
            minDate={formatToDate(salesSeason?.summerStartDate)}
            maxDate={formatToDate(salesSeason?.summerEndDate)}
            required
          />
        </div>
      </div>
      <div className="flex justify-between mt-4 gap-x-4 ">
        <div className="col-span-2 col-start-4 flex-1">
          <CustomFormElement
            colSpan={4}
            id={ACTUAL_START_DATE}
            name={ACTUAL_START_DATE}
            label={ACTUAL_START_DATE_LABEL}
            type="date"
            onChange={onChangeHandlerWrapper}
            register={register}
            error={errors.actualStartDate}
            disabled={!canEditField(ACTUAL_START_DATE)}
          />
        </div>
        <div className="col-span-2 col-start-4 flex-1">
          <CustomFormElement
            colSpan={4}
            id={ACTUAL_END_DATE}
            name={ACTUAL_END_DATE}
            label={ACTUAL_END_DATE_LABEL}
            type="date"
            onChange={onChangeHandlerWrapper}
            register={register}
            error={errors.actualEndDate}
            disabled={!canEditField(ACTUAL_END_DATE)}
          />
        </div>
      </div>
    </>
  );
};

ArrivalStatus.propTypes = {
  isAdmin: PropTypes.bool,
  formLoading: PropTypes.bool,
  canEditField: PropTypes.func,
  onChangeHandler: PropTypes.func,
  salesSeason: PropTypes.object,
  recruitingSeason: PropTypes.object,
};

const mapStateToProps = (state) => ({
  salesSeason: selectSalesSeason(state),
  recruitingSeason: recruitingSeasonSelector(state),
});

export default connect(mapStateToProps, null)(ArrivalStatus);
