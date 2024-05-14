import PropTypes from 'prop-types';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { Loader, FormLabel } from '../';
import { Button } from '.';

const ButtonGroup = ({
  onClick,
  buttons,
  disabled,
  buttonClassName,
  wrapperClassName,
  orientation,
  loading,
  errors,
  id,
}) => {
  const colorMap = {
    0: 'green',
    1: 'white',
  };
  const wrapperClasses = classNames(
    wrapperClassName,
    'flex items-center space-x-4',
    {
      'flex-row-reverse space-x-reverse': orientation === 'right',
    }
  );
  const buttonClasses = classNames(buttonClassName);
  return (
    <div className="flex-col">
      {loading && (
        <div className="flex items-center justify-end mr-8">
          <FormLabel
            labelClassName="mt-6"
            successClassName="mt-6"
            errorClassName="mt-4"
            errors={errors}
            label={loading}
            htmlFor={id}
          />
        </div>
      )}
      <div id={id} className={wrapperClasses}>
        {loading && orientation === 'left' ? <Loader /> : null}
        {buttons.map((children, index) => {
          return (
            <Button
              key={uuidv4()}
              className={buttonClasses}
              color={colorMap[index]}
              onClick={(e) => onClick(e, index)}
              disabled={disabled || loading}
            >
              {children}
            </Button>
          );
        })}
        {loading && orientation === 'right' ? <Loader /> : null}
      </div>
    </div>
  );
};

ButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
      color: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      className: PropTypes.string,
      disabled: PropTypes.bool,
    }).isRequired
  ),
  loading: PropTypes.bool,
  wrapperClassName: PropTypes.string,
};

ButtonGroup.defaultProps = {
  className: '',
  disabled: false,
  loading: false,
};

export default ButtonGroup;
