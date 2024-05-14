import { arrayWithoutEmpty, formatNumberToCurrencyString, formatDateDisplay } from '@/lib/utils';
import { housingConstants } from '@/modules/Housing/lib/constants';
import { PencilAltIcon } from '@heroicons/react/solid';
import { Icon } from '@/components/common';

export const getLedgerHeadRows = () => (
  arrayWithoutEmpty([
    {
      value: 'PAID',
      align: 'center',
    },
    {
      value: 'LEDGER ID',
      align: 'center',
    },
    {
      value: 'VENDOR #',
      align: 'center',
    },
    {
      value: 'UNIT ID',
      align: 'center',
    },
    {
      value: 'AMOUNT TO PAY',
      align: 'center',
    },
    {
      value: 'DUE DATE',
      align: 'center',
    },
    {
      value: 'PAYEE',
      align: 'center',
    },
    {
      value: 'AMOUNT PAID',
      align: 'center',
    },
    {
      value: 'DATE PAID',
      align: 'center',
    },
    {
      value: 'EXPECTED RENT',
      align: 'center',
    },
    {
      value: 'BRANCH',
      align: 'center',
    },
    {
      value: 'SALES TEAM',
      align: 'center',
    },
    {
      value: 'DEALER',
      align: 'center',
    },
    {
      value: 'PARTNERSHIP',
      align: 'center',
    },
    {
      value: 'COMPLEX',
      align: 'center',
    },
    {
      value: 'TYPE OF PAYMENT',
      align: 'center',
    },
    {
      value: 'PAYMENT METHOD A/B',
      align: 'center',
    },
    {
      value: 'DAMAGES',
      align: 'center',
    },
    {
      value: 'REP UTILITES',
      align: 'center',
    },
    {
      value: 'CHARGES',
      align: 'center',
    },
    {
      value: 'DEDUCTIONS',
      align: 'center',
    },
    {
      value: '',
      align: 'center',
    },
    {
      value: '',
      align: 'center',
    },
  ])
);

export const parseLedgerRows = (rows, archived, onClickArchive) => (
  rows.length ? rows.map((row) => {
    const {
      pay_status_name,
      id,
      vendor_number,
      unit_id,
      amount_to_pay,
      date_due,
      payee,
      amount_paid,
      date_paid,
      expected_rent,
      branch_name,
      team_name,
      dealer_name,
      partnership_name,
      complex_name,
      payment_type_name,
      payment_method_name,
      furniture_damaged,
      rep_utilities,
      apartment_charges,
      apartment_deduction,
    } = row ?? {};

    return [
      {
        value: (pay_status_name && pay_status_name !== 'Not paid' ? pay_status_name : (<div className="text-red-500">Not paid</div>)),
        align: 'center',
        className: 'whitespace-nowrap',
      },
      {
        value: id,
        align: 'center',
        className: 'whitespace-nowrap',
      },
      {
        value: vendor_number,
        align: 'center',
        className: 'whitespace-nowrap',
      },
      {
        value: unit_id,
        align: 'left',
        className: 'whitespace-nowrap',
      },
      {
        value: formatNumberToCurrencyString(amount_to_pay, 2),
        align: 'right',
        className: 'whitespace-nowrap',
      },
      {
        value: date_due,
        align: 'right',
        className: 'whitespace-nowrap',
      },
      {
        value: payee,
        align: 'left',
        className: 'whitespace-nowrap',
      },
      {
        value: formatNumberToCurrencyString(amount_paid, 2),
        align: 'right',
        className: 'whitespace-nowrap',
      },
      {
        value: date_paid,
        align: 'right',
        className: 'whitespace-nowrap',
      },
      {
        value: formatNumberToCurrencyString(expected_rent, 2),
        align: 'right',
        className: 'whitespace-nowrap',
      },
      {
        value: branch_name,
        align: 'left',
        className: 'whitespace-nowrap',
      },
      {
        value: team_name,
        align: 'left',
        className: 'whitespace-nowrap',
      },
      {
        value: dealer_name,
        align: 'left',
        className: 'whitespace-nowrap',
      },
      {
        value: partnership_name,
        align: 'left',
        className: 'whitespace-nowrap',
      },
      {
        value: complex_name,
        align: 'left',
        className: 'whitespace-nowrap',
      },
      {
        value: payment_type_name,
        align: 'left',
        className: 'whitespace-nowrap',
      },
      {
        value: payment_method_name,
        align: 'left',
        className: 'whitespace-nowrap',
      },
      {
        value: formatNumberToCurrencyString(furniture_damaged, 2),
        align: 'right',
        className: 'whitespace-nowrap',
      },
      {
        value: formatNumberToCurrencyString(rep_utilities, 2),
        align: 'right',
        className: 'whitespace-nowrap',
      },
      {
        value: formatNumberToCurrencyString(apartment_charges, 2),
        align: 'right',
        className: 'whitespace-nowrap',
      },
      {
        value: formatNumberToCurrencyString(apartment_deduction, 2),
        align: 'right',
        className:  'whitespace-nowrap text-red-500',
      },
      {
        value: (<PencilAltIcon className="w-5 h-5 relative text-gray-400" />),
        align: 'center',
        className: 'whitespace-nowrap',
      },
      {
        value: (
          <Icon className="w-5 h-5 relative text-gray-600 font-thin cursor-pointer"
                icon={archived ? 'unArchiveIcon' : 'archiveIcon'}
                onClick={() => onClickArchive(id)} />
        ),
        align: 'center',
        className: 'whitespace-nowrap',
      },
    ];
  }) : [
    {
      value: housingConstants.NO_DATA_TO_DISPLAY,
      align: 'center',
      colSpan: Number.MAX_SAFE_INTEGER,
      className: 'py-8',
    },
  ]
);

export const getLedgerHistoryHeadRows = () => (
  arrayWithoutEmpty([
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
  ])
);

export const parseLedgerHistoryRows = (rows) => (
  rows.length ? rows.map((row) => {
    const {
      changed_form_formatted,
      changed_to_formatted,
      item_changed,
      changed_by_name,
      changing_date,
    } = row ?? {};

    return [
      {
        value: item_changed,
        align: 'left',
        className: 'whitespace-nowrap capitalize',
      },
      {
        value: changed_form_formatted,
        align: 'left',
        className: 'whitespace-nowrap capitalize',
      },
      {
        value: changed_to_formatted,
        align: 'left',
        className: 'whitespace-nowrap capitalize',
      },
      {
        value: changed_by_name,
        align: 'left',
        className: 'whitespace-nowrap capitalize',
      },
      {
        value: changing_date,
        align: 'right',
        className: 'whitespace-nowrap capitalize',
      },
    ];
  }) : [
    {
      value: housingConstants.NO_DATA_TO_DISPLAY,
      align: 'center',
      colSpan: Number.MAX_SAFE_INTEGER,
      className: 'py-8',
    },
  ]
);

const historyFields = {
  dealer_id: 'Dealer',
  apartment_id: 'Apartment (Unit ID)',
  pay_status_id: 'Pay Status',
  payment_method_id: 'Payment Method',
  payment_type_id: 'Payment Type',
  vendor_number: 'Vendor Number',
  payee: 'Payee',
  amount_to_pay: 'Amount to Pay',
  amount_paid: 'Amount Paid',
  date_paid: 'Date Paid',
  is_deleted: 'Is Deleted',

};

export const parseLedgerHistory = (history) => {
  const parsedHistory = history.map((item) => {
    const {
      changed_at,
      changed_by_name,
      changed_from,
      changed_from_addition,
      changed_to,
      changed_to_addition,
      field_name,
    } = item;

    const item_changed = historyFields[field_name] || field_name;
    const changing_date = formatDateDisplay(new Date(changed_at).toLocaleString());
    let changed_form_formatted;
    let changed_to_formatted;

    if(field_name === 'amount_to_pay' || field_name === 'amount_paid') {
      changed_form_formatted = formatNumberToCurrencyString(changed_from, 2);
      changed_to_formatted = formatNumberToCurrencyString(changed_to, 2);
    } else if(field_name === 'date_paid') {
      changed_form_formatted = changed_from ? formatDateDisplay(new Date(changed_from).toLocaleString()) : '';
      changed_to_formatted = changed_to ? formatDateDisplay(new Date(changed_to).toLocaleString()) : '';
    } else if(field_name === 'is_deleted') {
      changed_form_formatted = changed_from ? 'Yes' : 'No';
      changed_to_formatted = changed_to ? 'Yes' : 'No';
    } else if(field_name === 'dealer_id' || field_name === 'apartment_id' || field_name === 'pay_status_id' || field_name === 'payment_method_id' || field_name === 'payment_type_id') {
      changed_form_formatted = changed_from_addition ? changed_from_addition : changed_from ? changed_from : 'N/A';
      changed_to_formatted = changed_to_addition ? changed_to_addition : changed_to ? changed_to : 'N/A';
    } else if(field_name === 'vendor_number' || field_name === 'payee') {
      changed_form_formatted = changed_from ? changed_from : 'N/A';
      changed_to_formatted = changed_to ? changed_to : 'N/A';
    } else {
      changed_form_formatted = changed_from ? changed_from : '';
      changed_to_formatted = changed_to ? changed_to : '';
    }

    return {
      item_changed,
      changed_form_formatted,
      changed_to_formatted,
      changed_by_name,
      changing_date,
    };
  });

  return parsedHistory;
};

export const parseFilters = (filters) => {
  const transformedFilter = filters.map((filter) => {
    const type = filter.type.value;
    const value = filter.value.map((el) => el.value);

    return { 'type': type, 'value': value };
  });

  const mergedFilter = transformedFilter.reduce((acc, filter) => {
    const index = acc.findIndex((el) => el.type === filter.type);
    if (index > -1) {
      acc[index].value = filter.value;

      return acc;
    } else {
      return [...acc, filter];
    }
  }, []);

  const parsedFilter = {};
  mergedFilter.forEach((filter) => {
    if(filter.type === 'date_paid' || filter.type === 'date_due') {
      if(filter.value[0]) {
        parsedFilter[`${filter.type}_from`] = filter.value[0];
      }
      if(filter.value[1]) {
        parsedFilter[`${filter.type}_to`] = filter.value[1];
      }
    } else {
      parsedFilter[filter.type] = filter.value;
    };
  });

  return parsedFilter;
};
