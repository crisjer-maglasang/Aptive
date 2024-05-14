import { formatDate, formatStringToDate } from '@/lib/utils';
import classNames from 'classnames';
import moment from 'moment';
import { useCallback, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFormContext, Controller } from 'react-hook-form';
import MaskedTextInput from 'react-text-mask';

const ControlledCustomDate = ({
  name,
  type,
  formValue,
  hasError,
  className,
  onChange,
  childOrientation,
  baseClasses,
  children,
  onBlur,
  disabled,
  minDate,
  maxDate,
  showYearDropdown,
  required,
}) => {
  const classes = useMemo(() => classNames(
    className,
    'shadow-sm block w-full sm:text-sm rounded-md',
    `${hasError && baseClasses ? baseClasses?.errorClasses : baseClasses?.standardClasses}`,
    { 'text-gray-400': disabled },
  ), [hasError, className, baseClasses]);

  const handleDateChange = useCallback((date) => {
    onChange({
      target: {
        value: moment(date).isValid() ? formatDate(date) : '',
        name,
        type,
      },
    });
  }, [name, type, onChange]);

  return (
    <div className="flex">
      {childOrientation === 'left' ? children : null}
      <DatePicker
        selected={formValue ? formatStringToDate(formValue) : null}
        className={classes}
        onChange={handleDateChange}
        shouldCloseOnSelect={true}
        showMonthDropdown
        showYearDropdown={showYearDropdown}
        dropdownMode="select"
        dateFormat="MM-dd-yyyy"
        placeholderText="MM-DD-YYYY"
        {...minDate && { minDate }}
        maxDate={maxDate ? maxDate : new Date('9999-12-31')}
        customInput={
          <MaskedTextInput
            type="text"
            mask={[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
          />
        }
        onBlur={onBlur}
        disabled={disabled}
        required={required}
      />
      {childOrientation === 'right' ? children : null}
    </div>
  );
};

const CustomDate = (props) => {
  const { name, formValue } = props;
  const { control } = useFormContext() ?? {};

  // By default, React Hook Form uses uncontrolled inputs and encapsulates the value input logic.
  // This is pretty good because that reduces the client code (that code that we write).
  // Actually, in most cases we shouldn't care about value input process.
  //
  // However, some external libraries provides only controlled components without
  // an ability to add a `ref` to the DOM input element in order to register it in the form.
  //
  // To deal with it that React Hook Form provides a `Controller` component - a wrapper over the controlled component.
  // Using the `Controller` we can encapsulate the value input/update logic
  // making the resulting component uncontrolled which is expected by parents.
  //
  // In fact, they shouldn't care of what component is uncontrolled and what components they should take control over.
  //
  // @link https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components
  // @link https://react-hook-form.com/docs/useform/register
  // @link https://react-hook-form.com/docs/usecontroller/controller
  return [undefined, null].includes(formValue) && control
    ? (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ControlledCustomDate
            {...props}
            formValue={field.value}
          />
        )}
      />
    )
    // Previously, despite the React Hook Form recommendations, all the inputs were controlled components.
    // After refactoring that major issue in the Profile Wizard form
    // we probably have both controlled (in not refactored forms) and
    // uncontrolled (in the Profile Wizard) CustomDate components simultaneously.
    //
    // This `else` block is for backward compatibility.
    : (
      <ControlledCustomDate {...props} />
    );
};

export default CustomDate;
