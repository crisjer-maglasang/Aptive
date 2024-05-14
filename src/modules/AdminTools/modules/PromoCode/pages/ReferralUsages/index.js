import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import {
  createReferralUsageAsync,
  filterReferralUsagesAsync,
  filterReferralUsagesSelector,
} from '@/modules/AdminTools/redux/promoCode/referralUsages';
import PromotionsSelect from './PromotionsSelect';
import FilterDataTable from '../../Components/Filter/FilterDataTable';
import { formatDateDisplay } from '@/lib/utils';

const fields = [
  // 'promotion_id' => 'required_without:code|exists:referrals,id',
  {
    label: 'Promotion',
    name: 'promotion_id',
    CreateRender: PromotionsSelect,
  },
  // 'customer_id' => 'required',
  {
    label: 'Customer Id',
    name: 'customer_id',
    type: 'text',
    required: true,
  },
  // 'referring_customer_id' => 'required',
  {
    label: 'Referring Customer Id',
    name: 'referring_customer_id',
    type: 'text',
    required: true,
  },
  // 'referring_employee_id' => 'required',
  {
    label: 'Referring Employee Id',
    name: 'referring_employee_id',
    type: 'text',
    required: true,
  },
  // 'code_used' => 'required',
  {
    label: 'Code Used',
    name: 'code_used',
    type: 'text',
    required: true,
  },
];

const table = [
  {
    label: 'Created',
    name: 'created_at',
    render: ({ data: { created_at } }) => formatDateDisplay(created_at),
  },
  {
    label: 'Code',
    name: 'code',
  },
  {
    label: 'Customer Id',
    name: 'customer_id',
  },
  {
    label: 'Referring Customer Id',
    name: 'referring_customer_id',
  },
  {
    label: 'Referring Employee Id',
    name: 'referring_employee_id',
  },
  {
    label: 'Code Used',
    name: 'code_used',
  },
];

const filters = {
  customer_id: 'text',
  referring_customer_id: 'text',
  referring_employee_id: 'text',
  code_used: 'text',
  code: 'text',
  created_at_start: 'date',
  created_at_end: 'date',
};

const filterOptions = [
  {
    label: 'Customer',
    value: 'customer_id',
  },
  {
    label: 'Referring Customer',
    value: 'referring_customer_id',
  },
  {
    label: 'Referring Employee',
    value: 'referring_employee_id',
  },
  {
    label: 'Code Used',
    value: 'code_used',
  },
  {
    label: 'Code',
    value: 'code',
  },
  {
    label: 'Created At Start',
    value: 'created_at_start',
  },
  {
    label: 'Created At End',
    value: 'created_at_end',
  },
];

const title = 'Referral Usage';

const defaultValues = {
  service_professional_id: '',
  sales_professional_id: '',
  customer_id: '',
  channel: '',
  promotion_id: '',
};

const ReferralUsages = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const referralUsages = useSelector(filterReferralUsagesSelector);
  const data = useMemo(() => referralUsages.data, [referralUsages]);
  const filter = useMemo(
    () => Object.fromEntries(searchParams),
    [searchParams]
  );

  const renderTable = useMemo(
    () =>
      table.map((field) => {
        return {
          sortBy: field.name,
          render: ({ index }) => data[index][field.name],
          ...field,
        };
      }),
    [data]
  );

  const onCreate = useCallback(
    (createData) => {
      dispatch(createReferralUsageAsync.request({ createData, filter }));
    },
    [dispatch, filter]
  );

  useEffect(() => {
    dispatch(filterReferralUsagesAsync.request(filter));
  }, [dispatch, filter]);

  return (
    <FilterDataTable
      {...{ ...referralUsages, filters, filterOptions }}
      headerOptions={{
        error: 'referralUsagesUpdate',
        title,
        defaultValues,
        onCreate,
        fields,
      }}
      tableOptions={{
        table: renderTable,
      }}
    />
  );
};

export default ReferralUsages;
