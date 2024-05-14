import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  default as DatePicker,
} from 'react-datepicker';
import { DateInput, CalendarContainer } from '.';
import {
  parseValue,
  TODAY,
} from './utils';
import { parseISO } from 'date-fns';

const DateRange = ({
  filters,
  setFilters,
  selectedFilterField,
  onCancelClick,
  onClickDelete,
  setIsFilterValueOpen,
  index,
}) => {
  const [value, setValue] = useState('__default');
  const datePicker = useRef();
  const [middleValue, setMiddleValueRaw] = useState(parseValue(value));

  useEffect(() => {
    if (index !== undefined) {
      const filterValue = filters[index]?.value;
      if(filterValue[0].value === '' && filterValue[1].value === '') {
        setValue('__default');
        setMiddleValueRaw(parseValue('__default'));
        return;
      } else if (filterValue[0].value === '') {
        setValue([null, parseISO(filterValue[1].value)]);
        setMiddleValueRaw(parseValue([null, parseISO(filterValue[1].value)]));
      } else if (filterValue[1].value === '') {
        setValue([parseISO(filterValue[0].value), null]);
        setMiddleValueRaw(parseValue([parseISO(filterValue[0].value), null]));
      } else {
        const [startDate, endDate] = filterValue.map((value) => parseISO(value.value));
        setValue([startDate, endDate]);
        setMiddleValueRaw(parseValue([startDate, endDate]));
      }
    } 
  }, [index]);

  const setMiddleValue = useCallback((newValue) => {
    setMiddleValueRaw((prevValue) => parseValue(newValue, prevValue));
  }, []);

  const onDatesChange = useCallback(
    (newValue) => {
      setMiddleValue(newValue);
    },
    [setMiddleValue],
  );

  const onCalendarOpen = useCallback(() => {
    setMiddleValue(value);
  }, [setMiddleValue, value]);

  const onCalendarClose = useCallback(() => {
    setMiddleValue(value);
  }, [setMiddleValue, value]);

  const CalendarContainerElement = useCallback(
    (props) => {
      return (
        <CalendarContainer
          middleValue={middleValue}
          setMiddleValue={setMiddleValue}
          filters={filters}
          setFilters={setFilters}
          selectedFilterField={selectedFilterField}
          onCancelClick={onCancelClick}
          setIsFilterValueOpen={setIsFilterValueOpen}
          index={index}
          onClickDelete={onClickDelete}
          {...props}
        />
      );
    },
    [middleValue, filters, setFilters, setMiddleValue, selectedFilterField, onCancelClick, setIsFilterValueOpen],
  );

  useEffect(() => {
    if (middleValue.endDate) {
      datePicker.current.setPreSelection(middleValue.endDate);
    }
  }, [middleValue.endDate]);

  return (
    <div
      id="dropdown"
      className="absolute right-0 z-10 w-72 text-base list-none bg-white rounded-lg shadow-md border border-gray-200"
    >
      <DatePicker
        ref={datePicker}
        startDate={middleValue.startDate}
        endDate={middleValue.endDate}
        openToDate={middleValue.endDate}
        placeholderText={middleValue.placeholder}
        maxDate={TODAY}
        onChange={onDatesChange}
        onCalendarOpen={onCalendarOpen}
        onCalendarClose={onCalendarClose}
        customInput={<DateInput />}
        calendarContainer={CalendarContainerElement}
        selectsRange={true}
        shouldCloseOnSelect={false}
        showDisabledMonthNavigation={true}
        useWeekdaysShort={true}
        showPopperArrow={false}
        popperClassName="!p-1"
        popperPlacement="bottom"
        open
      />
    </div>
  );
};

DateRange.propTypes = {
  filters: PropTypes.array.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  selectedFilterField: PropTypes.object,
  index: PropTypes.number,
  setIsFilterValueOpen: PropTypes.func.isRequired,
};

export default DateRange;
