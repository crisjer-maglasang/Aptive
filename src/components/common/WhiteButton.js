import { Disclosure } from '@headlessui/react';

const WhiteButton = ({ onClick, disclosure, selected, text }) => {
  const className =
    `inline-flex items-center px-2.5 py-1.5 border text-xs ` +
    `font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 ` +
    `focus:ring-aptivegreen ${
      selected
        ? 'border-transparent text-aptivegreen bg-aptivegray hover:bg-aptivegray'
        : 'border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50'
    }`;

  return disclosure ? (
    <Disclosure.Button className={className}>{text}</Disclosure.Button>
  ) : (
    <button type="submit" className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default WhiteButton;
