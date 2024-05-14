import PropTypes from 'prop-types';
import { Controller, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { Select as BaseSelect } from '@/components/common';
import { useEffect, useRef } from 'react';

const Select = ({
  isMulti,
  name,
  label,
  selector,
  error,
  required,
  disabled,
}) => {
  const options = useSelector(selector) || [];
  const errors = useSelector((state) => state?.errors?.errors?.[error]?.[name]);

  const hasError = !!errors?.length;
  const selectRef = useRef();
  const value = useWatch({ name });

  useEffect(() => {
    if (!value) {
      selectRef?.current.clearValue();
    }
  }, [value]);

  return (
    <div>
      {label && (
        <div className="flex items-center">
          <div className="flex text-sm font-medium text-gray-700">
            <label>
              {label}
              {required && <span className="text-red-500">{' *'}</span>}
            </label>
          </div>
        </div>
      )}
      <div className={'mt-0.5 block rounded-md shadow-sm'}>
        <Controller
          name={name}
          render={({ field: { onChange, value, name } }) => (
            <BaseSelect
              ref={selectRef}
              {...{
                name,
                onChange,
                value,
                options,
                hasError,
                required,
                disabled,
              }}
              isMulti={isMulti}
              closeMenuOnSelect={!isMulti}
            />
          )}
        />
      </div>
    </div>
  );
};

Select.propTypes = {
  isMulti: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  selector: PropTypes.any.isRequired,
  error: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Select;
