import { useMemo } from 'react';
import classNames from 'classnames';
import { Icon, Loader } from '..';
import {
  FormLabel,
  TextArea,
  CustomInput,
  CustomErrorMessage,
  CustomRadioGroup,
  CustomSelect,
  CustomFile,
  CustomDate,
  CustomNumber,
  MaskedInput,
  generateBaseClasses,
} from '.';
import { SearchSelectInput } from '@/components/common/inputs';
import { Select } from '@/components/common';
import CurrencyInput from '@/components/common/Form/CurrencyInput';

const CustomFormElement = (props) => {
  const {
    id,
    type,
    label,
    error,
    colSpan,
    loading,
    required,
    isFileLoading,
    tooltipMessage,
    formElementWrapperClassName,
    elementWrapperClassName,
    baseWrapperClassName,
  } = props;
  const formElementWrapperClasses = useMemo(
    () =>
      classNames(formElementWrapperClassName, `sm:col-span-${colSpan || 3}`),
    [colSpan, formElementWrapperClassName]
  );

  const elementWrapperClasses = useMemo(
    () =>
      classNames('mt-0.5 block rounded-md shadow-sm', elementWrapperClassName),
    [elementWrapperClassName]
  );

  const baseClasses = useMemo(
    () => generateBaseClasses(type, baseWrapperClassName),
    [type, baseWrapperClassName]
  );

  const ChildElement = {
    textArea: TextArea,
    checkbox: CustomInput,
    file: CustomFile,
    text: CustomInput,
    number: CustomNumber,
    password: CustomInput,
    date: CustomDate,
    select: CustomSelect,
    currency: CurrencyInput,
    multiSelect: Select,
    selectSearch: SearchSelectInput,
    radio: CustomRadioGroup,
    masked: MaskedInput,
  }[type];

  return (
    <div className={formElementWrapperClasses}>
      <div className="flex items-center">
        {label?.length > 0 && (
          <FormLabel label={label} required={required} htmlFor={id} />
        )}
        {tooltipMessage && (
          <div className="ml-1">
            <Icon id={id} place="top" icon="info" message={tooltipMessage} />
          </div>
        )}
      </div>
      {loading ? (
        <Loader className="mt-0.5 h-[38px] items-center justify-start px-3" />
      ) : (
        <div className={elementWrapperClasses}>
          <ChildElement
            baseClasses={baseClasses}
            hasError={!!error}
            {...props}
          />
        </div>
      )}
      {error?.message && !isFileLoading && (
        <CustomErrorMessage text={error?.message} />
      )}
    </div>
  );
};

export default CustomFormElement;
