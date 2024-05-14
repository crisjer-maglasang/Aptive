import classNames from 'classnames';

export const generateBaseClasses = (type = 'text', baseWrapperClassName = '') => {
  const placeholderTextColor = {
    text: '300',
    date: '900',
  };

  const standardClasses = classNames(
    'focus:ring-aptivegreen',
    'focus:border-aptivegreen',
    'border-gray-300',
    `placeholder-gray-${placeholderTextColor[type] ?? '300'}`,
    baseWrapperClassName,
  );

  const errorClasses = classNames(
    'focus:ring-red-500',
    'focus:border-red-500',
    'border-red-300',
    'placeholder-red-300',
    'focus:outline-none',
    baseWrapperClassName,
  );

  return {
    standardClasses,
    errorClasses,
  };
};
