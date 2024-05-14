import { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { mergeClassName } from '@/lib/utils';
import { LoadingIcon } from '@/components/common/icons';

const Checkbox = ({
  isChecked,
  isIndeterminate,
  onChange,
  isLoading,
}) => {
  const checkBoxRef = useRef();

  useEffect(() => {
    if (checkBoxRef?.current) {
      checkBoxRef.current.indeterminate = isIndeterminate;
    }
  }, [checkBoxRef, isIndeterminate]);

  return (
    isLoading && isChecked
      ? <LoadingIcon className="text-green-400" />
      : (
        <input
          type="checkbox"
          className={mergeClassName(
            'w-4 h-4 border-gray-300 rounded text-green-400 focus:ring-aptivegreen',
            { 'text-green-200 border-gray-100': isLoading, 'hover:border-gray-400 cursor-pointer': !isLoading },
          )}
          onChange={onChange}
          checked={isChecked}
          disabled={isLoading}
          ref={checkBoxRef}
        />
      )
  );
};

Checkbox.propTypes = {
  isChecked: PropTypes.bool,
  isIndeterminate: PropTypes.bool,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func,
};

export default memo(Checkbox);
