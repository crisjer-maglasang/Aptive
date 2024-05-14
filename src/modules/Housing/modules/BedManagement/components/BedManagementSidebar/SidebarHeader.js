import PropTypes from 'prop-types';
import classNames from 'classnames';

const SidebarHeader = ({ onChange, selectedBedAllotmentType }) => {
  const headerItems = [
    {
      name: 'Unassigned Reps',
      value: 'rep',
    },
    {
      name: 'Unassigned SPs',
      value: 'service-pro',
    },
  ];

  return (
    <div className="w-full px-4 border-b border-gray-200 inline-flex gap-4">
      {headerItems.map((item) => (
        <button
          key={item.name}
          className={classNames(
            'text-gray-600 font-normal text-sm leading-none py-6 hover:text-blue-500',
            selectedBedAllotmentType === item.value &&
              'text-gray-900 border-b-2 border-gray-900'
          )}
          onClick={onChange(item.value)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default SidebarHeader;
