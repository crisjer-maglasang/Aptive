import React from 'react';
import classNames from 'classnames';
import { Button } from '@/components';

export default function DialogActionButton ({ text, triggerAction, className, color, disabled }) {
  const btnClass = classNames(
    'mt-3 mx-1 inline-flex flex-1 justify-center rounded-md shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:mt-0 sm:w-auto sm:text-sm',
    'disabled:opacity-25 disabled:text-gray-300 disabled:cursor-default',
    className,
  );

  return (
    <Button
      color={color}
      className={btnClass}
      onClick={triggerAction}
      disabled={disabled}
    >
      {text}
    </Button>
  );
}
