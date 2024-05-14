import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

import { CustomFormElement } from '@/components/common/Form';
import classNames from 'classnames';

const EditDataTableField = ({
  originalValue,
  originalError,
  props,
  renderProps,
  updateValue,
  getIsDisabled,
  getData,
}) => {
  const [value, setValue] = useState(originalValue);
  const [error, setError] = useState(originalError);

  const useGreenBorder = useMemo(
    () => !(error || isSame(value, renderProps.data[props.name])),
    [error, props.name, renderProps.data, value]
  );

  const onChange = async ({ target: { value } }) => {
    setValue(value);
    setError(await updateValue(value, renderProps.data, props.name));
  };

  let isDisabled = false;

  if (getIsDisabled) {
    isDisabled = getIsDisabled(renderProps.data, props.name);
  }

  if (props.Edit) {
    return (
      <div
        className={classNames({
          'rounded-md bg-primary-100 p-0.5': useGreenBorder,
        })}
      >
        <props.Edit
          baseWrapperClassName={classNames({
            'bg-gray-100': isDisabled,
          })}
          value={value}
          onChange={onChange}
          id={renderProps.data.id}
          name={props.name}
          error={error}
          disabled={isDisabled}
          {...props}
          {...renderProps}
          label={''}
          getData={getData}
        />
      </div>
    );
  }

  if (!props.type) {
    return null;
  }

  return (
    <CustomFormElement
      formElementWrapperClassName={classNames({
        'rounded-md bg-primary-100 pb-0.5 px-0.5': useGreenBorder,
      })}
      baseWrapperClassName={classNames({
        'bg-gray-100': isDisabled,
      })}
      value={value}
      onChange={onChange}
      {...props}
      label={''}
      error={error}
      disabled={isDisabled}
    />
  );
};

EditDataTableField.propTypes = {
  originalValue: PropTypes.any,
  originalError: PropTypes.any,
  props: PropTypes.shape({
    Edit: PropTypes.elementType,
    type: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  renderProps: PropTypes.shape({
    data: PropTypes.object,
  }).isRequired,
  updateValue: PropTypes.func.isRequired,
  getIsDisabled: PropTypes.func,
  getData: PropTypes.func,
};

function isSame(a, b) {
  // Check for null and undefined
  if (a == null && b == null) {
    return true;
  }

  // Check if both variables are of the same type
  if (typeof a !== typeof b) {
    // Check if one is a string and the other is a number
    if (typeof a === 'string' && typeof b === 'number') {
      return Number(a) === b;
    } else if (typeof a === 'number' && typeof b === 'string') {
      return a === Number(b);
    } else if (typeof a === 'boolean' || typeof b === 'boolean') {
      if (typeof a === 'string') {
        return b === (a === 'true');
      } else if (typeof b === 'string') {
        return a === (b === 'true');
      }
    } else {
      return false;
    }
  }

  // Check for numbers and strings
  if (typeof a === 'number' || typeof a === 'string') {
    return a == b; // Use loose equality to compare, allowing type coercion
  }

  // Check for arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    // Check the length of the arrays
    if (a.length !== b.length) {
      return false;
    }

    // Check if both arrays have the same elements (regardless of order)
    const sortedA = a.slice().sort();
    const sortedB = b.slice().sort();

    for (let i = 0; i < sortedA.length; i++) {
      if (!isSame(sortedA[i], sortedB[i])) {
        return false;
      }
    }

    return true;
  }

  return a === b;
}

export default EditDataTableField;
