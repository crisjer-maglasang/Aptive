import { arrayWithoutEmpty, formatDateDisplay } from '@/lib/utils';
import { housingConstants } from '@/modules/Housing/lib/constants';
import { bedManagementConstants } from '@/modules/Housing/lib';
import classNames from 'classnames';
import { CustomFormElement } from '@/components/common';

const {
  HOUSING_TYPE_FILTER_LABEL,
  HOUSING_TYPE_FILTER_NAME,
  ROOMS_FILTER_LABEL,
  ROOMS_FILTER_NAME,
  BEDS_FILTER_LABEL,
  BEDS_FILTER_NAME,
  SEASON_FILTER_LABEL,
  SEASON_FILTER_NAME,
} = bedManagementConstants;

export const getBedManagementHeadRows = () =>
  arrayWithoutEmpty([
    {
      value: 'COMPLEX',
      align: 'left',
    },
    {
      value: 'HOUSING TYPE',
      align: 'left',
    },
    {
      value: 'UNIT',
      align: 'left',
    },
    {
      value: 'ROOM TYPE',
      align: 'left',
    },
    {
      value: 'BEDS IN ROOM',
      align: 'left',
    },
    {
      value: 'SALES REPS',
      align: 'left',
    },
    {
      value: 'REP STATUS',
      align: 'left',
    },
    {
      value: 'RENT STATUS',
      align: 'left',
    },
    {
      value: 'MOVE IN',
      align: 'left',
    },
    {
      value: 'MOVE OUT',
      align: 'left',
    },
    {
      value: 'NOTES',
      align: 'left',
    },
    {
      value: 'LEASE SIGNED',
      align: 'left',
    },
    {
      value: 'LEASE START',
      align: 'left',
    },
    {
      value: 'LEASE END',
      align: 'left',
    },
    {
      value: 'ELEC ACCT#',
      align: 'left',
    },
    {
      value: 'GAS ACCT#',
      align: 'left',
    },
    {
      value: 'FURNITURE DELIVERY',
      align: 'left',
    },
    {
      value: 'FURNITURE PICKUP',
      align: 'left',
    },
  ]);

export const parseBedManagementRows = (
  bedManagementData,
  onClickUnassignSalesRep,
  onClickAssignSalesRep,
  unBeddedData,
) => {
  if (!bedManagementData || bedManagementData.length === 0) {
    return createNoDataRows();
  }

  let rows = [];

  const unBeddedOptions = unBeddedData?.map((option) => ({
    label: option.name,
    resident_id: option.id,
    bed_allotment_type: option.bed_allotment_type,
  }));

  bedManagementData.forEach((complexData) => {
    const complexRows = parseComplexData(complexData);
    rows = [...rows, ...complexRows];
  });

  return rows.map((row) => {
    const {
      apartment_row_span,
      room_row_span,
      complex_name,
      apartment_type,
      unit_id,
      room_type,
      lease_start_date,
      lease_end_date,
      lease_signed,
      furniture_delivery_date,
      furniture_pick_up_date,
      elec_acct_number,
      gas_acct_number,
      number_of_beds,
      sales_reps,
      user_type,
      rep_status,
      apartment_status,
      move_in,
      move_out,
      notes,
      complex_id,
      apartment_id,
      id: user_id,
    } = row;

    const residentInfo = { complex_id, apartment_id, user_type, user_id };

    return [
      row.hasOwnProperty('complex_name') && {
        value: complex_name,
        align: 'left',
        valign: 'top',
        className: 'whitespace-nowrap border-r border-gray-200',
        rowSpan: apartment_row_span,
      },
      row.hasOwnProperty('apartment_type') && {
        value: apartment_type,
        align: 'left',
        valign: 'top',
        className: 'whitespace-nowrap border-r border-gray-200',
        rowSpan: apartment_row_span,
      },
      row.hasOwnProperty('apartment_type') && {
        value: unit_id,
        align: 'left',
        valign: 'top',
        className: 'whitespace-nowrap border-r border-gray-200',
        rowSpan: apartment_row_span,
      },
      row.hasOwnProperty('room_type') && {
        value: room_type,
        align: 'left',
        valign: 'top',
        className: 'whitespace-nowrap border-r border-gray-200',
        rowSpan: apartment_row_span,
      },
      row.hasOwnProperty('number_of_beds') && {
        value:
          number_of_beds === 'Couch'
            ? 'Couch'
            : `${number_of_beds} bed${number_of_beds === 1 ? '' : 's'}`,
        align: 'left',
        valign: 'top',
        className:
          number_of_beds === 'Couch'
            ? 'whitespace-nowrap border-r border-gray-200 bg-gray-50'
            : 'whitespace-nowrap border-r border-gray-200',
        rowSpan: room_row_span,
      },
      {
        value: sales_reps ? (
          <CustomFormElement
            className="p-2 border border-gray-200 rounded w-24"
            type="text"
            id="sales_reps"
            name="sales_reps"
            value={sales_reps}
            onHoverClick={() => onClickUnassignSalesRep(residentInfo)}
          />
        ) : (
          <CustomFormElement
            className="p-2 border border-gray-200 rounded w-24"
            type="text"
            id="sales_reps"
            name="sales_reps"
            value={sales_reps}
            autoDropdownOptions={unBeddedOptions}
            autoDropdownClickAction={(option)=>{console.log(option)}}
          />
        ),
        align: 'left',
        className:
          number_of_beds === 'Couch'
            ? 'whitespace-nowrap border-r border-gray-200 bg-gray-50 px-2 py-1'
            : 'whitespace-nowrap border-r border-gray-200 px-2 py-1',
      },
      {
        value: user_type === 'service-pro' ? 'Service Pro' : rep_status,
        align: 'left',
        className:
          number_of_beds === 'Couch'
            ? 'whitespace-nowrap border-r border-gray-200 bg-gray-50'
            : 'whitespace-nowrap border-r border-gray-200',
      },
      {
        value:
          apartment_status?.label === 'Married'
            ? `Married ${apartment_status?.number_of_rooms} Room${
                apartment_status?.number_of_rooms === 1 ? '' : 's'
              }`
            : apartment_status?.label ?? 'NA',
        align: 'left',
        className:
          number_of_beds === 'Couch'
            ? 'whitespace-nowrap border-r border-gray-200 bg-gray-50'
            : 'whitespace-nowrap border-r border-gray-200',
      },
      {
        value: formatDateDisplay(move_in),
        align: 'left',
        className:
          number_of_beds === 'Couch'
            ? 'whitespace-nowrap border-r border-gray-200 bg-gray-50'
            : 'whitespace-nowrap border-r border-gray-200',
      },
      {
        value: formatDateDisplay(move_out),
        align: 'right',
        className:
          number_of_beds === 'Couch'
            ? 'whitespace-nowrap border-r border-gray-200 bg-gray-50'
            : 'whitespace-nowrap border-r border-gray-200',
      },
      {
        value: notes || 'NA',
        align: 'left',
        className:
          number_of_beds === 'Couch'
            ? 'whitespace-nowrap border-r border-gray-200 bg-gray-50'
            : 'whitespace-nowrap border-r border-gray-200',
      },
      row.hasOwnProperty('lease_signed') && {
        value: lease_signed ? 'Yes' : 'No',
        align: 'right',
        valign: 'top',
        className: 'whitespace-nowrap border-r border-gray-200',
        rowSpan: apartment_row_span,
      },
      row.hasOwnProperty('lease_start_date') && {
        value: formatDateDisplay(lease_start_date),
        align: 'right',
        valign: 'top',
        className: 'whitespace-nowrap border-r border-gray-200',
        rowSpan: apartment_row_span,
      },
      row.hasOwnProperty('lease_end_date') && {
        value: formatDateDisplay(lease_end_date),
        align: 'right',
        valign: 'top',
        className: 'whitespace-nowrap border-r border-gray-200',
        rowSpan: apartment_row_span,
      },
      row.hasOwnProperty('elec_acct_number') && {
        value: elec_acct_number,
        align: 'right',
        valign: 'top',
        className: 'whitespace-nowrap border-r border-gray-200',
        rowSpan: apartment_row_span,
      },
      row.hasOwnProperty('gas_acct_number') && {
        value: gas_acct_number,
        align: 'right',
        valign: 'top',
        className: 'whitespace-nowrap border-r border-gray-200',
        rowSpan: apartment_row_span,
      },
      row.hasOwnProperty('furniture_delivery_date') && {
        value: formatDateDisplay(furniture_delivery_date),
        align: 'right',
        valign: 'top',
        className: 'whitespace-nowrap border-r border-gray-200',
        rowSpan: apartment_row_span,
      },
      row.hasOwnProperty('furniture_pick_up_date') && {
        value: formatDateDisplay(furniture_pick_up_date),
        align: 'right',
        valign: 'top',
        className: 'whitespace-nowrap',
        rowSpan: apartment_row_span,
      },
    ].filter((cell) => cell !== false);
  });
};

const createNoDataRows = () => {
  return [
    {
      value: housingConstants.NO_DATA_TO_DISPLAY,
      align: 'center',
      colSpan: Number.MAX_SAFE_INTEGER,
      className: 'py-8 grow',
    },
  ];
};

const parseComplexData = (complexData) => {
  const { name: complex_name, id: complex_id, apartments } = complexData ?? {};
  let complexRows = [];

  if (!apartments || apartments.length === 0) {
    complexRows = [createEmptyComplexRow(complex_name, complex_id)];
  } else {
    apartments.forEach((apartment) => {
      const apartmentRows = parseApartmentData(
        apartment,
        complex_name,
        complex_id
      );
      complexRows = [...complexRows, ...apartmentRows];
    });
  }

  return complexRows;
};

const createEmptyComplexRow = (complexName, complexId) => {
  return {
    complex_name: complexName,
    complex_id: complexId,
    complex_row_span: 1,
    apartment_type: '',
    unit_id: '',
    lease_start_date: '',
    lease_end_date: '',
    lease_signed: '',
    furniture_delivery_date: '',
    furniture_pick_up_date: '',
    elec_acct_number: '',
    gas_acct_number: '',
    number_of_beds: '',
    room_type: 'No bedroom unit',
    sales_reps: '',
    rep_status: '',
    apartment_status: { label: 'NA' },
    move_in: '',
    move_out: '',
    notes: 'NA',
  };
};

const parseApartmentData = (apartmentData, complex_name, complex_id) => {
  const {
    electric_account_number,
    gas_account_number,
    rooms,
    has_couch,
    couch,
    apartment_id,
    ...apartmentDetails
  } = apartmentData ?? {};
  const { accountNumber: elec_acct_number } = electric_account_number ?? {};
  const { accountNumber: gas_acct_number } = gas_account_number ?? {};
  let apartmentRows = [];

  if (rooms && rooms.length > 0) {
    rooms.forEach((room) => {
      const roomRows = parseRoomData(room, complex_id, apartment_id);
      apartmentRows = [...apartmentRows, ...roomRows];
    });
  }

  if (has_couch && couch) {
    const couchRow = parseBedData(couch, complex_id, apartment_id, {
      number_of_beds: 'Couch',
    });
    apartmentRows = [...apartmentRows, couchRow];
  }

  apartmentRows[0] = {
    complex_name,
    elec_acct_number,
    gas_acct_number,
    room_type:
      rooms.length > 0 ? `${rooms.length} bedroom unit` : 'No bedroom unit',
    ...apartmentDetails,
    apartment_row_span: apartmentRows.length,
    ...apartmentRows[0],
  };

  return apartmentRows;
};

const parseRoomData = (roomData, complex_id, apartment_id) => {
  const { beds, number_of_beds, ...roomDetails } = roomData ?? {};
  let roomRows = [];

  if (beds && beds.length > 0) {
    beds.forEach((bed) => {
      const bedRow = parseBedData(bed, complex_id, apartment_id);
      roomRows = [...roomRows, bedRow];
    });
  }

  roomRows[0] = {
    number_of_beds,
    room_row_span: roomRows.length,
    ...roomDetails,
    ...roomRows[0],
  };

  return roomRows;
};

const parseBedData = (bedData, complex_id, apartment_id, additionalFields) => {
  const { user_info, ...bedDetails } = bedData ?? {};
  const { name: sales_reps, ...userDetails } = user_info ?? {};
  const row = {
    complex_id,
    apartment_id,
    sales_reps,
    ...userDetails,
    ...bedDetails,
    ...additionalFields,
  };
  return row;
};

const mapFilterLabelToName = {
  [HOUSING_TYPE_FILTER_LABEL]: HOUSING_TYPE_FILTER_NAME,
  [ROOMS_FILTER_LABEL]: ROOMS_FILTER_NAME,
  [BEDS_FILTER_LABEL]: BEDS_FILTER_NAME,
  [SEASON_FILTER_LABEL]: SEASON_FILTER_NAME,
};

const mapFilterLabelToValue = {
  'Pre season': 'pre_season',
  'Regular season': 'regular_season',
  'Post season': 'post_season',
  Single: 'Single',
  'Single female': 'Single Female',
  Married: 'Married',
  'Married office': 'Married-Office',
  'M/OA': 'M/OA',
  'Not in apartments': 'Not in Apartments',
  'Office apartment': 'Office Apartment',
  '1 bedroom': 1,
  '2 bedrooms': 2,
  '3 bedrooms': 3,
  '1 bed': 1,
  '2 beds': 2,
  '3 beds': 3,
};

export const parseFilters = (filters) => {
  const parsedFilters = {};

  Object.keys(filters).forEach((key) => {
    parsedFilters[mapFilterLabelToName[key]] =
      mapFilterLabelToValue[filters[key]];
  });

  return parsedFilters;
};

export const parseViewFilter = (filter) => {
  if (!filter) {
    return {};
  }
  let parsedFilter = {};
  const filterValues = filter?.value?.map((value) => value.value);

  parsedFilter[filter.type.value] = filterValues;

  return parsedFilter;
};
