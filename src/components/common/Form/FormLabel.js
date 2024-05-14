import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ExclamationCircleIcon } from '@heroicons/react/solid';

const FormLabel = ({
  label,
  errors,
  htmlFor,
  required,
  errorClassName,
  successClassName,
  labelClassName,
  isSuccess,
}) => {
  const labelClasses = classNames(
    labelClassName,
    'flex text-sm font-medium text-gray-700'
  );
  const successClasses = classNames(
    successClassName,
    'flex text-sm font-medium text-green-700'
  );
  const errorClasses = classNames(
    errorClassName,
    'flex mt-2 text-sm font-medium text-red-600'
  );
  return (
    <>
      {(label.length > 0 || errors.length > 0) &&
        (errors[0]?.length > 0 ? (
          <div className={errorClasses}>
            <span>
              <ExclamationCircleIcon
                className="w-5 h-5 text-red-500"
                aria-hidden="true"
              />
            </span>
            <label htmlFor={htmlFor}>{errors[0]}</label>
          </div>
        ) : (
          <div className={isSuccess ? successClasses : labelClasses}>
            <label htmlFor={htmlFor} className="flex flex-inline gap-1">
              <div>{label}</div>
              {required ? <div className=" text-red-500">*</div> : null}
            </label>
          </div>
        ))}
    </>
  );
};

FormLabel.propTypes = {
  label: PropTypes.string,
  errors: PropTypes.array,
  htmlFor: PropTypes.string,
  required: PropTypes.bool,
  errorClassName: PropTypes.string,
  labelClassName: PropTypes.string,
};

FormLabel.defaultProps = {
  label: '',
  errors: [],
  htmlFor: '',
  required: false,
  errorClassName: '',
  labelClassName: '',
};

export default FormLabel;
