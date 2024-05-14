import { dashboardConstants } from '@/lib'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { RangeChoice } from '.'
import { FILTER_VALUES } from '../../../'

const dateRanges = [
  { id: uuidv4(), value: FILTER_VALUES.DEFAULT, label: dashboardConstants.FILTER_CHOICE_ALL_TIME },
  { id: uuidv4(), value: FILTER_VALUES.TODAY, label: dashboardConstants.FILTER_CHOICE_TODAY },
  { id: uuidv4(), value: FILTER_VALUES.YESTERDAY, label: dashboardConstants.FILTER_CHOICE_YESTERDAY },
  { id: uuidv4(), value: FILTER_VALUES.LAST_7_DAYS, label: dashboardConstants.FILTER_CHOICE_LAST_7_DAYS },
  { id: uuidv4(), value: FILTER_VALUES.LAST_14_DAYS, label: dashboardConstants.FILTER_CHOICE_LAST_14_DAYS },
  { id: uuidv4(), value: FILTER_VALUES.LAST_60_DAYS, label: dashboardConstants.FILTER_CHOICE_LAST_60_DAYS },
  { id: uuidv4(), value: FILTER_VALUES.LAST_90_DAYS, label: dashboardConstants.FILTER_CHOICE_LAST_90_DAYS },
  { id: uuidv4(), value: FILTER_VALUES.CUSTOM_RANGE, label: dashboardConstants.FILTER_CHOICE_CUSTOM_RANGE },
]

const RangeChoices = ({
  checked,
  onChange,
}) => {
  const checkedRef = useRef()

  const setCheckedRef = useCallback((element) => {
    if (element?.checked) {
      checkedRef.current = element
    }
  }, [])

  const onChangeWrapper = useCallback((event) => {
    checkedRef.current = event.target
    onChange(event)
  }, [onChange])

  useEffect(() => {
    // Not focus if custom range selected - allow in-calendar keyboard navigation.
    if (checkedRef.current && checkedRef.current.value !== FILTER_VALUES.CUSTOM_RANGE) {
      checkedRef.current.focus()
    }
  }, [])

  return dateRanges.map(({ id, value, label }) => (
    <RangeChoice
      ref={setCheckedRef}
      key={id}
      id={id}
      label={label}
      value={value}
      checked={checked}
      onChange={onChangeWrapper}
    />
  ))
}

RangeChoices.propTypes = {
  checked: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default RangeChoices
