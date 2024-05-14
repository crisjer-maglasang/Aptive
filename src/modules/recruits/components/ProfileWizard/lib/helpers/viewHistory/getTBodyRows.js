import getFieldLabel from './labelsHandler';
import handleValue from './valuesHandler';
import { TooltipText } from '@/components/common';
import { v4 as uuidv4 } from 'uuid';
import { addFsExcludeClass, formatDateToLocal } from '@/lib/utils';
import { dashboardConstants } from '@/lib/constants';

export let stateOptions = [];

export let experienceOptions = [];

export let apartmentStatusesOptions = [];

export let countriesOptions = [];

export let repStatusesOptions = [];

const getTBodyRows = (rows, stateData) => {
  (
    {
      states: stateOptions = [],
      experiences: experienceOptions = [],
      apartmentStatuses: apartmentStatusesOptions = [],
      countries: countriesOptions = [],
      repStatuses: repStatusesOptions = [],
    } = stateData
  );

  return rows.length ? rows.map(({
    itemChanged,
    changedFrom,
    changedTo,
    changedBy,
    changedAt,
  }) => ([
    {
      value: getFieldLabel(itemChanged),
      align: 'left',
      valign: 'top',
    },
    {
      value: handleValue(itemChanged, changedFrom),
      align: 'right',
      valign: 'top',
      className: addFsExcludeClass(),
    },
    {
      value: handleValue(itemChanged, changedTo),
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

export default getTBodyRows;
