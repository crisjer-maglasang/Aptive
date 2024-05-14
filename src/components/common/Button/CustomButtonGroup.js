import { useMemo } from 'react';
import classNames from 'classnames';
import { saveButton, cancelButton } from '../../../lib/configs';
import { CustomButton } from '.';

const CustomButtonGroup = (
  {
    onCancelClick,
    onSaveClick,
    disabledCancel,
    disabledSave,
    cancelText,
    saveText,
    buttonClassName,
    wrapperClassName,
    orientation,
    loading,
    withSubmit,
  }) => {
  const wrapperClasses = useMemo(() => classNames(
    wrapperClassName ? wrapperClassName : 'pr-8 pt-6',
    'flex items-center space-x-4',
    {
      'flex-row-reverse space-x-reverse': orientation === 'right',
    }
  ),
    [wrapperClassName, orientation]
  );

  const buttonClasses = useMemo(() =>
    classNames(buttonClassName),
    [buttonClassName]
  );

  return (
    <div className="flex-col">
      <div className={wrapperClasses}>
        <CustomButton
          key={saveText}
          name={saveText || saveButton}
          text={saveText || saveButton}
          color="green"
          disabled={disabledSave || loading}
          className={buttonClasses}
          onClick={onSaveClick}
          type={withSubmit && 'submit'}
        />
        <CustomButton
          key={cancelText}
          name={cancelText || cancelButton}
          text={cancelText || cancelButton}
          color="white"
          disabled={disabledCancel || loading}
          onClick={onCancelClick}
          className={buttonClasses}
        />
      </div>
    </div>
  );
};

export default CustomButtonGroup;
