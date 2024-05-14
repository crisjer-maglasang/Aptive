import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import {
  createPromotionUsageAsync,
  filterPromotionUsagesAsync,
  filterPromotionUsagesSelector,
} from '@/modules/AdminTools/redux/promoCode/promotionUsages';
import PromotionsSelect from './PromotionsSelect';
import ChannelsSelect from './ChannelsSelect';
import { formatDateDisplay } from '@/lib/utils';
import FilterDataTable from '../../Components/Filter/FilterDataTable';

const fields = [
  // 'promotion_id' => 'required_without:code|exists:promotions,id',
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
  // 'sales_professional_id' => 'required',
  {
    label: 'Sales Professional Id',
    name: 'sales_professional_id',
    type: 'text',
    required: true,
  },
  // 'service_professional_id' => 'required',
  {
    label: 'Service Professional Id',
    name: 'service_professional_id',
    type: 'text',
    required: true,
  },
  // 'channel'
  {
    label: 'Channel',
    name: 'channel',
    CreateRender: ChannelsSelect,
  },
];

const table = [
  {
    label: 'ID',
    name: 'id',
  },
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
    label: 'Sales Professional Id',
    name: 'sales_professional_id',
  },
  {
    label: 'Service Professional Id',
    name: 'service_professional_id',
  },
  {
    label: 'Channel',
    name: 'channel',
    CreateRender: ChannelsSelect,
  },
];

const filters = {
  service_professional_id: 'text',
  sales_professional_id: 'text',
  customer_id: 'text',
  channel: 'text',
  code: 'text',
  created_at_start: 'date',
  created_at_end: 'date',
};

const filterOptions = [
  {
    label: 'Service Professional',
    value: 'service_professional_id',
  },
  {
    label: 'Sales Professional',
    value: 'sales_professional_id',
  },
  {
    label: 'Customer',
    value: 'customer_id',
  },
  {
    label: 'Channel',
    value: 'channel',
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

const title = 'Promotion Usage';

const defaultValues = {
  service_professional_id: '',
  sales_professional_id: '',
  customer_id: '',
  channel: '',
  promotion_id: '',
};

const PromotionUsages = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const promotionUsages = useSelector(filterPromotionUsagesSelector);
  const data = useMemo(() => promotionUsages.data, [promotionUsages]);
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
      dispatch(createPromotionUsageAsync.request({ createData, filter }));
    },
    [dispatch, filter]
  );

  useEffect(() => {
    dispatch(filterPromotionUsagesAsync.request(filter));
  }, [dispatch, filter]);

  return (
    <FilterDataTable
      {...{ ...promotionUsages, filters, filterOptions }}
      headerOptions={{
        error: 'promotionUsagesUpdate',
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

export default PromotionUsages;
