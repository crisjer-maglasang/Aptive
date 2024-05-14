import { mergeClassName } from '@/lib/utils';
import { useMemo, memo } from 'react';

const colorMap = {
  seamless: 'border-transparent bg-white shadow-none text-aptivegreen hover:text-aptivegreen-darkest focus:ring-aptivegreen-dark',
  white: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-aptivegreen',
  green: 'border-transparent bg-aptivegreen text-white hover:bg-aptivegreen-dark focus:ring-aptivegreen-dark',
  red: 'border-transparent bg-aptivered text-white focus:ring-aptivered',
  blue: 'border-transparent bg-blue-600 text-white focus:ring-aptiveblue-dark justify-start items-center rounded-2xl h-6 px-2 py-1 text-right font-normal sm:text-xs leading-none',
  active: 'border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-700',
  disabled: 'text-gray-300 cursor-default',
  default: 'text-gray-600 items-center  text-right font-normal sm:text-xs leading-none border-none shadow-none',
};

const CustomButton = ({
  onClick,
  color,
  className,
  disabled,
  name,
  type,
  text,
  children,
}) => {
  const buttonClasses = useMemo(() => mergeClassName(
    'inline-flex justify-center rounded-md border shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm',
    colorMap[disabled ? 'disabled' : color],
    className,
  ), [color, disabled, className]);

  return (
    <button
      name={name}
      type={type ? type : 'button'}
      disabled={disabled}
      className={mergeClassName(buttonClasses)}
      onClick={onClick}
    >
      {children ? children : text}
    </button>
  );
};

export default memo(CustomButton);
