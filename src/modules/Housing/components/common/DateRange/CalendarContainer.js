import { CalendarContainer as BaseCalendarContainer } from 'react-datepicker';
import MaskedTextInput from 'react-text-mask';
import { RangeChoices } from '.';
import {
  dateInputMask,
  formatDate,
  isAfter,
  isBefore,
  isSameDay,
  isValid,
  ONE_MONTH_AGO,
  TODAY,
} from './utils';
import { CustomButton } from '@/components';
import { Button } from '../';
import { dashboardConstants, mergeClassName } from '@/lib';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { formatDate as dateFormatter } from '@/lib/utils';

const CalendarContainer = ({
  className,
  children,
  middleValue,
  setMiddleValue,
  filters,
  setFilters,
  onCancelClick,
  onClickDelete,
  setIsFilterValueOpen,
  selectedFilterField,
  index,
  ...props
}) => {
  const onRangeChange = useCallback(
    (event) => {
      setMiddleValue(event.target.value);
    },
    [setMiddleValue],
  );

  const onDateInputChange = useCallback(
    (event) => {
      const regex = /([a-z]{3,}) (\d{2}), (\d{4})/i;
      const isValidDateEdge = (date, edge) =>
        ({
          startDate: (date) => {
            if (!isValid(date)) {
              return false;
            }

            return isSameDay(date, TODAY) || isBefore(date, TODAY);
          },
          endDate: (date) => {
            if (!isValid(date)) {
              return false;
            }

            return (
              isSameDay(date, middleValue.startDate) ||
              isAfter(date, middleValue.startDate)
            );
          },
        }[edge](date));

      if (!event.target.value.match(regex)) {
        return;
      }

      const date = new Date(event.target.value);

      if (!isValidDateEdge(date, event.target.name)) {
        return;
      }

      setMiddleValue(
        event.target.name === 'startDate'
          ? [date, undefined]
          : [undefined, date],
      );
    },
    [middleValue.startDate, setMiddleValue],
  );

  const onApplyClick = useCallback(() => {
    const startDate = middleValue.startDate
      ? dateFormatter(middleValue.startDate, 'YYYY-MM-DD')
      : '';
    const starDateDisplay = middleValue.startDate
      ? formatDate(middleValue.startDate)
      : '';
    const endDate = middleValue.endDate
      ? dateFormatter(middleValue.endDate, 'YYYY-MM-DD')
      : '';
    const endDateDisplay = middleValue.endDate
      ? formatDate(middleValue.endDate)
      : '';
    if(index !== undefined) {
      const newFilters = [...filters];
      newFilters[index].value = [
        { value: startDate, label: starDateDisplay },
        { value: endDate, label: endDateDisplay },
      ];
      setFilters(newFilters);
    } else {
      const indexOfDuplicatedField = filters.findIndex(
        (el) => el.type.value === selectedFilterField.value,
      );
      if (indexOfDuplicatedField !== -1) {
        setFilters([
          ...filters.slice(0, indexOfDuplicatedField),
          ...filters.slice(indexOfDuplicatedField + 1),
          { type: selectedFilterField, value: [
            { value: startDate, label: starDateDisplay },
            { value: endDate, label: endDateDisplay },
          ] },
        ]);
      } else {
        setFilters([
          ...filters,
          {
            type: selectedFilterField,
            value: [
              { value: startDate, label: starDateDisplay },
              { value: endDate, label: endDateDisplay },
            ],
          },
        ]);
      }
    }

    setIsFilterValueOpen(false);
  }, [
    middleValue,
    filters,
    setFilters,
    selectedFilterField,
    setIsFilterValueOpen,
    index,
  ]);

  return (
    <div className="flex bg-white border border-gray-300 shadow-md rounded-lg">
      <div className="py-5 px-4">
        <div className="flex flex-col w-[176px] space-y-1">
          <RangeChoices checked={middleValue.range} onChange={onRangeChange} />
        </div>
      </div>
      <div className="border-l border-gray-300">
        <div className="py-4 px-4">
          <div className="flex items-center">
            <MaskedTextInput
              name="startDate"
              type="text"
              autoComplete="off"
              className={mergeClassName(
                'w-0 grow border border-gray-300 rounded-md text-sm text-gray-500',
                'focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500',
                'placeholder:text-gray-400',
              )}
              placeholder={formatDate(ONE_MONTH_AGO)}
              value={formatDate(middleValue.startDate)}
              mask={dateInputMask}
              guide={false}
              onChange={onDateInputChange}
            />
            <span className="mx-2 text-sm text-gray-900">and</span>
            <MaskedTextInput
              name="endDate"
              type="text"
              autoComplete="off"
              className={mergeClassName(
                'w-0 grow border border-gray-300 rounded-md text-sm text-gray-500',
                'focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500',
                'placeholder:text-gray-400',
              )}
              placeholder={formatDate(TODAY)}
              value={formatDate(middleValue.endDate)}
              mask={dateInputMask}
              guide={false}
              onChange={onDateInputChange}
            />
          </div>
        </div>
        <div className="flex justify-center border-t border-gray-300 py-4 px-8 text-xs text-gray-900">
          <BaseCalendarContainer
            className={mergeClassName(className, 'react-datepicker--seamless')}
            {...props}
          >
            {children}
          </BaseCalendarContainer>
        </div>
        <div className="flex justify-end border-t border-gray-300 py-5 px-2 space-x-4">
          <CustomButton
            className="px-6 font-normal"
            color="white"
            onClick={onClickDelete}
          >
            {dashboardConstants.FILTER_ACTION_RESET_FILTERS}
          </CustomButton>
          <Button
            className="px-6 font-normal rounded-lg"
            color="blue"
            onClick={onApplyClick}
          >
            {dashboardConstants.FILTER_ACTION_APPLY_RANGE}
          </Button>
        </div>
      </div>
    </div>
  );
};

CalendarContainer.defaultProps = {
  className: '',
  children: null,
};

CalendarContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  middleValue: PropTypes.object.isRequired,
  setMiddleValue: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  setIsFilterValueOpen: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired,
  selectedFilterField: PropTypes.object,
  index: PropTypes.number,
};

export default CalendarContainer;
