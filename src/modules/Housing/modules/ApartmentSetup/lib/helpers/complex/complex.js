import { addFsExcludeClass, arrayWithoutEmpty, formatDateToLocal } from '@/lib/utils';
import { housingConstants } from '@/modules/Housing/lib/constants';
import {
  FolderOpenIcon,
  TrashIcon,
  BookOpenIcon,
} from '@heroicons/react/outline';
import { CustomFormElement, TooltipText } from '@/components/common';
import classNames from 'classnames';
import { handleHistoryLabel, handleHistoryValue } from './';
import { v4 as uuidv4 } from 'uuid'

export const getComplexHeadRows = (viewOption) =>
  arrayWithoutEmpty([
    {
      value: (
        <CustomFormElement
          type="checkbox"
          className="w-4 h-4 rounded border-gray-200"
        />
      ),
      align: 'center',
      className: 'px-4 py-3',
    },
    {
      value: viewOption === 'team' ? 'TEAM NAME' : 'COMPLEX NAME',
      align: 'left',
      className: 'px-4 py-3 whitespace-nowrap',
    },
    {
      value: '',
      className: 'px-4 py-3 border-r border-gray-200 whitespace-nowrap',
    },
    {
      value: viewOption === 'team' ? 'COMPLEXES' : 'TEAMS',
      align: 'center',
      className: 'px-4 py-3  border-r border-gray-200 whitespace-nowrap',
    },
    {
      value: 'ROOMS',
      align: 'center',
      className: 'px-4 py-3 border-r border-gray-200 whitespace-nowrap',
    },
    {
      value: 'BEDS',
      align: 'center',
      className: 'px-4 py-3 border-r border-gray-200 whitespace-nowrap',
    },
    {
      value: 'AVAIL BEDS',
      align: 'center',
      className: 'px-4 py-3 border-r border-gray-200 whitespace-nowrap',
    },
    {
      value: 'TOTAL COUCHES',
      align: 'center',
      className: 'px-4 py-3 border-r border-gray-200 whitespace-nowrap',
    },
    {
      value: 'AVAIL COUCHES',
      align: 'center',
      className: 'px-4 py-3 border-r border-gray-200 whitespace-nowrap',
    },
    {
      value: 'BED AVAILABILITY (%)',
      align: 'center',
      className: 'px-4 py-3 border-r border-gray-200 whitespace-nowrap',
    },
    {
      value: 'COUCH AVAILABILITY (%)',
      align: 'center',
      className: 'px-4 py-3 border-r border-gray-200 whitespace-nowrap',
    },
    {
      value: 'TOTAL SLEEPING SPOTS',
      align: 'center',
      className: 'px-4 py-3 border-r border-gray-200 whitespace-nowrap',
    },
    {
      value: 'AVAIL SLEEPING SPOTS',
      align: 'center',
      className: 'px-4 py-3 border-r border-gray-200 whitespace-nowrap',
    },
    {
      value: 'OVERALL AVAILABILITY (%)',
      align: 'center',
      className: 'px-4 py-3 border-r border-gray-200 whitespace-nowrap',
    },
    {
      value: '',
      align: 'center',
    },
  ]);

export const parseComplexRows = (rows, viewOption, onEditClick) => {
  const renderCheckbox = () => (
    <CustomFormElement
      type="checkbox"
      className="w-4 h-4 rounded border-gray-200"
    />
  );

  const renderAvailabilityBadge = (text, hover = false) => (
    <div
      className={classNames(
        'inline-flex gap-2 py-1 px-2 rounded-md items-center text-xs',
        hover ? 'bg-gray-100' : 'opacity-0',
      )}
    >
      <BookOpenIcon className="w-4 h-4 text-gray-500" />
      <span>{text}</span>
    </div>
  );

  const renderActionIcons = (onEditClick, id) => (
    <div className="inline-flex gap-4">
      <FolderOpenIcon
        className={addFsExcludeClass('w-5 h-5 text-gray-500 cursor-pointer')}
        onClick={(e) => onEditClick(e, id)}
      />
      <TrashIcon
        className={addFsExcludeClass('w-5 h-5 text-gray-500 cursor-pointer')}
        onClick={() => {}}
      />
    </div>
  );

  const renderCellValues = (
    value,
    align = 'right',
    className = 'p-4 border-r border-gray-200 whitespace-nowrap',
    hoverValue = null
  ) => ({
    value,
    align,
    className,
    hoverValue,
  });

  let alphabeticalRows = [];
  let alphabeticalData = [];
  let previousFirstLetter = null;

  rows.forEach(row => {
    const {
      name,
      number,
      total_rooms,
      total_beds,
      total_available_beds,
      beds_availability_percentage,
      total_couches,
      total_available_couches,
      couches_availability_percentage,
      total_sleeping_spots,
      total_available_sleeping_spots,
      sleeping_spots_availability_percentage,
    } = row ?? {};
    const currentFirstLetter = name[0]?.toUpperCase();

    if (currentFirstLetter !== previousFirstLetter) {
      alphabeticalRows.push({
        cells: [
          {
            value: currentFirstLetter,
            colSpan: 15,
            className: 'pl-16 py-2',
          },
        ],
        isHeaderRow: true,
      });
      alphabeticalData.push(null);
      previousFirstLetter = currentFirstLetter;
    }

    alphabeticalData.push(row);
    alphabeticalRows.push([
      renderCellValues(renderCheckbox(), 'center', 'p-4'),
      renderCellValues(name, 'left', 'p-4 whitespace-nowrap'),
      renderCellValues(
        renderAvailabilityBadge('Open'),
        'center',
        'p-4 border-r border-gray-200 whitespace-nowrap',
        renderAvailabilityBadge('Open', true)
      ),
      renderCellValues(
        viewOption === 'team' ? `${number} Complexes` : `${number} Teams`,
        'center',
        'p-4 border-r border-gray-200 whitespace-nowrap'
      ),
      renderCellValues(total_rooms),
      renderCellValues(total_beds),
      renderCellValues(total_available_beds),
      renderCellValues(total_couches),
      renderCellValues(total_available_couches),
      renderCellValues(`${beds_availability_percentage}%`),
      renderCellValues(`${couches_availability_percentage}%`),
      renderCellValues(total_sleeping_spots),
      renderCellValues(total_available_sleeping_spots),
      renderCellValues(
        `(${sleeping_spots_availability_percentage}% available)`
      ),
      renderCellValues(renderActionIcons(onEditClick, row.id)),
    ]);
  });

  return alphabeticalRows.length ? {
    data: alphabeticalData, rows: alphabeticalRows
  } : {
    data: [],
    rows: [
      {
        value: housingConstants.NO_DATA_TO_DISPLAY,
        align: 'center',
        colSpan: Number.MAX_SAFE_INTEGER,
        className: 'py-8',
      },
    ]
  };
};

export const getComplexHistoryRows = (rows) => {
  return rows?.length ? rows.map(({
    itemChanged,
    changedFrom,
    changedFromAddition,
    changedTo,
    changedToAddition,
    changedBy,
    changedAt,
  }) => ([
    {
      value: handleHistoryLabel(itemChanged),
      align: 'left',
      valign: 'top',
    },
    {
      value: handleHistoryValue(itemChanged, changedFromAddition ?? changedFrom),
      align: 'right',
      valign: 'top',
      className: addFsExcludeClass(),
    },
    {
      value: handleHistoryValue(itemChanged, changedToAddition ?? changedTo),
      align: 'right',
      valign: 'top',
      className: addFsExcludeClass(),
    },
    {
      value: (
        <span className="text-primary-300 font-medium">{changedBy}</span>
      ),
      align: 'left',
      valign: 'top',
      className: addFsExcludeClass(),
    },
    {
      value: (
        <TooltipText
          id={uuidv4()}
          text={formatDateToLocal(changedAt).display}
          message={formatDateToLocal(changedAt).timeZone}
        />
      ),
      align: 'right',
      valign: 'top',
    },
  ])) : [
    {
      value: housingConstants.NO_DATA_TO_DISPLAY,
      align: 'center',
      colSpan: Number.MAX_SAFE_INTEGER,
      className: 'py-8',
    },
  ];
};

export const getComplexHistoryHeadRows = () => arrayWithoutEmpty([
  {
    value: 'ITEM CHANGED',
    align: 'left',
  },
  {
    value: 'CHANGED FROM',
    align: 'right',
  },
  {
    value: 'CHANGED TO',
    align: 'right',
  },
  {
    value: 'CHANGED BY',
    align: 'left',
  },
  {
    value: 'CHANGING DATE',
    align: 'right',
  },
]);
