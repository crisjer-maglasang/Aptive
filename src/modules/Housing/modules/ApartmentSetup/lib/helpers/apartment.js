import { apartmentConstants } from '@/modules/Housing/lib';
import { addFsExcludeClass, arrayWithoutEmpty, formatCurrencyStringToNumber, formatDateToLocal } from '@/lib/utils';
import { apartmentKeyMap } from '../configs';
import handleHistoryValue from './handleHistoryValue';
import { TooltipText } from '@/components/common';
import { v4 as uuidv4 } from 'uuid';
import { dashboardConstants } from '@/lib/constants';
import handleHistoryLabel from './handleHistoryLabel';

const {
  UNIT_HAS_COUCH_NAME,
  FURNITURE_MONTHLY_COST_NAME,
  EXPECTED_RENT_NAME,
  FURNITURE_PHONE_NAME,
  UTILITIES_IS_ADDED_TO_REP_NAME,
  UNIT_INFO_FORM_TITLE,
  FURNITURE_FORM_TITLE,
  UTILITIES_FORM_TITLE,
  LEASE_DETAILS_FORM_TITLE,
  MOVE_OUT_FORM_TITLE,
  HISTORY_UNIT_SECTION,
  HISTORY_FURNITURE_SECTION,
  HISTORY_UTILITIES_SECTION,
  HISTORY_LEASE_DETAILS_SECTION,
  HISTORY_MOVE_OUT_SECTION,
} = apartmentConstants;

const imgExtTypes = [
  'jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'heic',
];

function mapApartmentData(data) {
  const result = {};

  for (const key in apartmentKeyMap) {
    if (data.hasOwnProperty(key)) {
      const propertyPath = apartmentKeyMap[key];
      let target = result;

      for (let i = 0; i < propertyPath.length - 1; i++) {
        const part = propertyPath[i];

        if (!target[part]) {
          target[part] = {};
        }

        target = target[part];
      }

      target[propertyPath[propertyPath.length - 1]] = data[key];
    }
  }

  return result;
}

export const combineApartmentData = (data) => {
  const newData = {};

  const currencyFields = [
    FURNITURE_MONTHLY_COST_NAME,
    EXPECTED_RENT_NAME,
  ];

  const phoneFields = [
    FURNITURE_PHONE_NAME,
  ];

  const yesNoFields = [
    UNIT_HAS_COUCH_NAME,
    UTILITIES_IS_ADDED_TO_REP_NAME,
  ];

  Object.entries(data).forEach(([key, value]) => {
    switch (true) {
      case value?.length === 0 || value === null || value === undefined:
        break;
      case currencyFields.includes(key):
        newData[key] = formatCurrencyStringToNumber(value);
        break;
      case phoneFields.includes(key):
        newData[key] = value.replace(/[^0-9]/g, '');
        break;
      case yesNoFields.includes(key):
        newData[key] = value === 'Yes';
        break;
      default:
        newData[key] = value;
    }
  });

  return mapApartmentData(newData);
};

export const prepareDocumentsForDisplay = (documents) => {
  return documents.map((documentItem) => {
    const ext = documentItem['file_name'].split('.').pop().toLowerCase();
    let type = 'normal';
    if (imgExtTypes.includes(ext)) {
      type = 'image';
    } else if (ext === 'pdf') {
      type = 'pdf';
    }
    return {
      ...documentItem,
      ext,
      type,
    };
  });
};

export const getApartmentHistoryRows = (rows) => {
  return rows?.length ? rows.map(({
    itemChanged,
    changedFrom,
    changedTo,
    changedBy,
    changedAt,
  }) => ([
    {
      value: handleHistoryLabel(itemChanged),
      align: 'left',
      valign: 'top',
    },
    {
      value: handleHistoryValue(itemChanged, changedFrom),
      align: 'right',
      valign: 'top',
      className: addFsExcludeClass(),
    },
    {
      value: handleHistoryValue(itemChanged, changedTo),
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
      value: dashboardConstants.NO_DATA_TO_DISPLAY,
      align: 'center',
      colSpan: Number.MAX_SAFE_INTEGER,
      className: 'py-8',
    },
  ];
};

export const getApartmentHistoryHeadRows = () => arrayWithoutEmpty([
  {
    value: 'ITEM CHANGED',
    align: 'left',
  },
  {
    value: 'CHANGED FROM',
    align: 'center',
  },
  {
    value: 'CHANGED TO',
    align: 'center',
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

export const getHistorySections = () => [
  { value: HISTORY_UNIT_SECTION, label: UNIT_INFO_FORM_TITLE },
  { value: HISTORY_FURNITURE_SECTION, label: FURNITURE_FORM_TITLE },
  { value: HISTORY_UTILITIES_SECTION, label: UTILITIES_FORM_TITLE },
  { value: HISTORY_LEASE_DETAILS_SECTION, label: LEASE_DETAILS_FORM_TITLE },
  { value: HISTORY_MOVE_OUT_SECTION, label: MOVE_OUT_FORM_TITLE },
];
