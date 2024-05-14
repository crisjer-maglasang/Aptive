import { CustomButton } from '@/components'
import { dashboardConstants, mergeClassName } from '@/lib'
import { CalendarIcon, XIcon } from '@heroicons/react/outline'
import PropTypes from 'prop-types'
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CalendarContainer as BaseCalendarContainer, default as DatePicker } from 'react-datepicker'
import MaskedTextInput from 'react-text-mask'
import { RangeChoices } from '.'
import { FILTER_VALUES } from '../../../'
import { dateInputMask, formatDate, isAfter, isBefore, isSameDay, isValid, ONE_MONTH_AGO, parseValue, TODAY } from './utils'

const DateRange = ({
  name,
  value,
  onChange,
}) => {
  const datePicker = useRef()
  const [middleValue, setMiddleValueRaw] = useState(parseValue(value))

  /**
   * TODO: CSS class react-datepicker__day--selecting-range-end not add properly in react-datepicker v4.8.0 (currently installed).
   *       Remove this workaround after this fix https://github.com/Hacker0x01/react-datepicker/pull/3595 will be published.
   */
  const dayClassName = useCallback(function (date) {
    const selecting = this.selectingDate ?? this.preSelection

    return (
      (this.startDate && !this.endDate) // selecting starts, no selection applied yet
      &&
      (isSameDay(date, this.startDate) || isAfter(date, this.startDate))
      &&
      (isSameDay(date, selecting) || (!selecting && isSameDay(date, this.startDate)))
    ) ? 'react-datepicker__day--selecting-range-end' : null
  }, [])

  const setMiddleValue = useCallback((newValue) => {
    setMiddleValueRaw((prevValue) => parseValue(newValue, prevValue))
  }, [])

  const onRangeChange = useCallback((event) => {
    setMiddleValue(event.target.value)
  }, [setMiddleValue])

  const onDatesChange = useCallback((newValue) => {
    setMiddleValue(newValue)
  }, [setMiddleValue])

  const onDateInputChange = useCallback((event) => {
    const regex = /([a-z]{3,}) (\d{2}), (\d{4})/i
    const isValidDateEdge = (date, edge) => (
      {
        startDate: (date) => {
          if (!isValid(date)) {
            return false
          }

          return isSameDay(date, TODAY) || isBefore(date, TODAY)
        },
        endDate: (date) => {
          if (!isValid(date)) {
            return false
          }

          return isSameDay(date, middleValue.startDate) || isAfter(date, middleValue.startDate)
        },
      }[edge](date)
    )

    if (!event.target.value.match(regex)) {
      return
    }

    const date = new Date(event.target.value)

    if (!isValidDateEdge(date, event.target.name)) {
      return
    }

    setMiddleValue(event.target.name === 'startDate' ? [date, undefined] : [undefined, date])
  }, [middleValue.startDate, setMiddleValue])

  const onSpaceKeyDown = useCallback((event) => {
    if (event.keyCode !== 32) {
      return
    }

    event.preventDefault()
    datePicker.current.setOpen(!datePicker.current.isCalendarOpen())
  }, [])

  const onClearClick = useCallback((event) => {
    // Prevent event from being fired on date range input component.
    event.stopPropagation()

    datePicker.current.clear()

    onChange({
      target: {
        name: name,
        value: FILTER_VALUES.DEFAULT,
      },
    })
  }, [name, onChange])

  const onCancelClick = useCallback(() => {
    datePicker.current.setOpen(false)
  }, [])

  const onApplyClick = useCallback(() => {
    const isValidDateRange = ({ isCustomRange, startDate, endDate }) => isCustomRange ? startDate && endDate : true

    if (isValidDateRange(middleValue)) {
      onChange({
        target: {
          name: name,
          value: middleValue.isCustomRange ? [middleValue.startDate, middleValue.endDate] : middleValue.range,
        },
      })
    }

    datePicker.current.setOpen(false)
  }, [middleValue, name, onChange])

  const onCalendarOpen = useCallback(() => {
    setMiddleValue(value)
  }, [setMiddleValue, value])

  const onCalendarClose = useCallback(() => {
    setMiddleValue(value)
  }, [setMiddleValue, value])

  const Input = useMemo(() => (
    forwardRef(({
      placeholder,
      onClick,
    }, ref) => (
      <div
        ref={ref}
        className={
          mergeClassName(
            'flex items-center bg-white border border-gray-300 rounded-md text-sm leading-4 text-gray-500',
            'focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300',
            { 'ring-1 ring-primary-300 border-primary-300': datePicker.current?.isCalendarOpen() },
          )
        }
        tabIndex={0}
        onClick={onClick}
        onKeyDown={onSpaceKeyDown}
      >
        <span className="py-2.5 px-3 grow cursor-text">{placeholder}</span>
        <div className="flex items-center bg-gray-50 border-l border-inherit rounded-r-md ml-auto py-2 px-3 space-x-2 text-primary-300">
          <CalendarIcon className="w-5 h-5 hover:text-primary-400 cursor-pointer" aria-hidden="true" />
          <button
            className="focus:outline-none hover:text-primary-400"
            onClick={onClearClick}
            tabIndex={-1}
          >
            <XIcon className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    ))
  ), [onClearClick, onSpaceKeyDown])

  const CalendarContainer = useMemo(() => (
    ({
      className,
      children,
      ...props
    }) => (
      <div className="flex bg-white border border-gray-300 shadow rounded-lg">
        <div className="py-5 px-4">
          <div className="flex flex-col w-[176px] space-y-1">
            <RangeChoices
              checked={middleValue.range}
              onChange={onRangeChange}
            />
          </div>
        </div>
        <div className="border-l border-gray-300">
          <div className="py-4 px-4">
            <div className="flex items-center">
              <MaskedTextInput
                name="startDate"
                type="text"
                autoComplete="off"
                className={
                  mergeClassName(
                    'w-0 grow border border-gray-300 rounded-md text-sm text-gray-500',
                    'focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300',
                    'placeholder:text-gray-400',
                  )
                }
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
                className={
                  mergeClassName(
                    'w-0 grow border border-gray-300 rounded-md text-sm text-gray-500',
                    'focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300',
                    'placeholder:text-gray-400',
                  )
                }
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
          <div className="flex justify-end border-t border-gray-300 py-5 px-6 space-x-4">
            <CustomButton
              className="px-6 font-normal"
              color="white"
              onClick={onCancelClick}
            >
              {dashboardConstants.FILTER_ACTION_CANCEL}
            </CustomButton>
            <CustomButton
              className="px-6 font-normal"
              color="green"
              onClick={onApplyClick}
            >
              {dashboardConstants.FILTER_ACTION_APPLY_RANGE}
            </CustomButton>
          </div>
        </div>
      </div>
    )
  ), [
    middleValue.endDate,
    middleValue.range,
    middleValue.startDate,
    onApplyClick,
    onCancelClick,
    onDateInputChange,
    onRangeChange,
  ])

  /**
   * In case if date range was changed via Range Choices control,
   * need to update Pre Selection explicitly.
   */
  useEffect(() => {
    if (middleValue.endDate) {
      datePicker.current.setPreSelection(middleValue.endDate)
    }
  }, [middleValue.endDate])

  return (
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
      dayClassName={dayClassName}
      customInput={<Input />}
      calendarContainer={CalendarContainer}
      selectsRange={true}
      shouldCloseOnSelect={false}
      showDisabledMonthNavigation={true}
      useWeekdaysShort={true}
      showPopperArrow={false}
      popperClassName="!p-1"
      popperPlacement="bottom"
    />
  )
}

DateRange.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.oneOf([
      FILTER_VALUES.DEFAULT,
      FILTER_VALUES.YESTERDAY,
      FILTER_VALUES.TODAY,
      FILTER_VALUES.LAST_7_DAYS,
      FILTER_VALUES.LAST_14_DAYS,
      FILTER_VALUES.LAST_60_DAYS,
      FILTER_VALUES.LAST_90_DAYS,
      FILTER_VALUES.CUSTOM_RANGE,
    ]),
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default DateRange
