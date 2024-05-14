import { memo } from 'react';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import MaskedInput from 'react-text-mask';
import { mergeClassName } from '@/lib/utils';
import { generateBaseClasses } from '../Form/classHelper';
import PropTypes from 'prop-types';

const CurrencyInput = ({ id, name, value, disabled, onChange, onBlur, mask = {}, register }) => {
  const classes = mergeClassName(
    'mt-0.5 block rounded-md shadow-sm w-full sm:text-sm',
    generateBaseClasses().standardClasses,
    { 'text-gray-400': disabled },
  );

  const defaultMask = {
    prefix: '$',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ',',
    allowDecimal: false,
    decimalSymbol: '',
    decimalLimit: 0,
    requireDecimal: false,
    integerLimit: null,
    allowNegative: false,
    allowLeadingZeroes: false,
  };

  const currencyMask = createNumberMask({
    ...defaultMask,
    ...mask,
  });

  return (
    <MaskedInput
      {...(register && { ...register(name) })}
      id={id}
      name={name}
      type="text"
      value={value}
      defaultValue={value}
      placeholder="$"
      mask={currencyMask}
      onChange={onChange}
      onBlur={onBlur}
      className={classes}
      guide={false}
      disabled={disabled}
    />
  );
};

CurrencyInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value:PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  mask: PropTypes.object,
};

export default memo(CurrencyInput);
