import { CustomFormElement } from '@/components/common';
import moment from 'moment';
import React from "react";

const DateOfBirth = (props) => {
  const {
    id,
    name,
    label,
    error,
    disabled,
    onChange,
    formValue,
    colSpan,
    required,
    tooltipMessage,
    formElementWrapperClassName,
    register,
    onBlur,
  } = props;
  const minAge = 16;
  const minYear = 1960;
  const minDate = moment().set({ 'year': minYear }).startOf('year').toDate();
  const maxDate = moment().subtract(minAge, 'years').endOf('year').toDate();

  return <CustomFormElement
    id={id}
    name={name}
    label={label}
    tooltipMessage={tooltipMessage}
    colSpan={colSpan}
    minDate={minDate}
    maxDate={maxDate}
    type="date"
    showYearDropdown
    formValue={formValue}
    onChange={onChange}
    register={register}
    error={error}
    required={required}
    disabled={disabled}
    formElementWrapperClassName={formElementWrapperClassName}
    onBlur={onBlur}
  />;
}

export default DateOfBirth;
