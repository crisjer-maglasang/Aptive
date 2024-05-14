import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const RadioGroup = ({
  radioOptions,
  onChange,
  name,
  orientation,
  children,
  isOpen,
  outerClassName,
  innerClassName,
  panelWrapperClassName,
  radioWrapperClassName,
  radioClassName,
  labelClassName,
  childClassName,
  value,
}) => {
  const outerClasses = classNames(outerClassName, {
    'border rounded-md shadow-sm': orientation === 'horizontal',
  });
  const innerClasses = classNames(
    innerClassName,
    { 'rounded-md': !isOpen && orientation === 'horizontal' },
    { 'space-y-1': orientation === 'vertical' },
    {
      'flex items-center space-x-6 border-b border-gray-200 px-3 py-3':
        orientation === 'horizontal',
    }
  );
  const panelWrapperClasses = classNames(panelWrapperClassName, {
    'flex items-center': orientation === 'vertical',
  });
  const radioWrapperClasses = classNames(
    radioWrapperClassName,
    'flex items-center'
  );
  const radioClasses = classNames(
    radioClassName,
    'mr-2 focus:ring-aptivegreen focus:border-aptivegreen',
    { 'flex items-center': orientation === 'horizontal' }
  );
  const labelClasses = classNames(labelClassName);
  const childClasses = classNames(childClassName);
  const [selected, setSelected] = useState(value);
  const handleChange = (e) => {
    setSelected(e.target.value);
    onChange(e.target.value);
  };
  return (
    <div className={outerClasses}>
      <div className={innerClasses}>
        {radioOptions.map(({ label, value, id, child }, i) => {
          return (
            <div key={`${id}${i}`} className={panelWrapperClasses}>
              <div className={radioWrapperClasses}>
                <input
                  id={id}
                  name={name}
                  type="radio"
                  className={radioClasses}
                  value={value}
                  checked={selected === value}
                  onChange={handleChange}
                />
                <label className={labelClasses} htmlFor={id}>
                  {label}
                </label>
              </div>
              <div className={childClasses}>{child}</div>
            </div>
          );
        })}
      </div>
      {isOpen && children}
    </div>
  );
};

RadioGroup.propTypes = {
  radioOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      id: PropTypes.string,
      child: PropTypes.element,
    })
  ),
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  isBoolean: PropTypes.bool,
  orientation: PropTypes.string,
  children: PropTypes.element,
  isOpen: PropTypes.bool,
  outerClassName: PropTypes.string,
  innerClassName: PropTypes.string,
  panelWrapperClassName: PropTypes.string,
  radioWrapperClassName: PropTypes.string,
  radioClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  childClassName: PropTypes.string,
};

RadioGroup.defaultProps = {
  radioOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: '',
      child: <></>,
    })
  ),
  name: '',
  isBoolean: false,
  orientation: 'horizontal',
  children: <></>,
  isOpen: false,
  outerClassName: '',
  innerClassName: '',
  panelWrapperClassName: '',
  radioWrapperClassName: '',
  radioClassName: '',
  labelClassName: '',
  childClassName: '',
};

export default RadioGroup;
