import { useSearchParams } from 'react-router-dom';
import * as yup from 'yup';

import EditDataTable from '@/modules/AdminTools/components/EditDataTable';
import {
  createPromotionAsync,
  disablePromotionAsync,
  promotionsSelector,
  removePromotionAsync,
  updatePromotionAsync,
} from '@/modules/AdminTools/redux/promoCode/promotions';
import PromotionForm from '../PromotionForm';
import EditStartOn from './EditStartOn';
import EditEndOn from './EditEndOn';
import EditPromotionType from './EditPromotionType';
import PromotionTypeSelect from './PromotionTypeSelect';
import { useDispatch } from 'react-redux';
import PromotionActions from './PromotionActions';
import DisableButton from './DisableButton';
import useActiveFilter from './ActiveFilter';
import useReferralFilter from './ReferralFilter';

const fields = [
  {
    label: 'Enabled',
    name: 'disabled_at',
    Render: DisableButton,
    CreateRender: false,
  },
  {
    label: 'Code',
    name: 'code',
    type: 'text',
    required: true,
  },
  {
    label: 'Start On',
    name: 'start_on',
    type: 'date',
    required: true,
    Edit: EditStartOn,
  },
  {
    label: 'End On',
    name: 'end_on',
    type: 'date',
    Edit: EditEndOn,
  },
  {
    label: 'Type',
    name: 'promotion_type',
    Edit: EditPromotionType,
    CreateRender: PromotionTypeSelect,
  },
];

const sortOrders = [
  'code',
  'start_on',
  'disabled_at',
  'end_on',
  'promotion_type',
];

const title = 'Promotions';

const defaultValues = {
  code: '',
};

const getSearchField = ({ code }) => code;

const searchPlaceholder = 'Search Promo Codes';

const schema = yup.object().shape({
  code: yup.string().required('Code is required.'),
  start_on: yup.string().required('Start date is required.'),
  promotion_type: yup.string().required('Code is required.'),
});

const PromotionsTable = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const onEditClick = (id) => {
    searchParams.set('promotion_id', id);
    setSearchParams(searchParams);
  };

  const onDisableClick = (data) => {
    dispatch(disablePromotionAsync.request(data));
  };

  const getIsDisabled = (data, field) => field !== 'end_on' && data.isActive;

  return (
    <>
      <EditDataTable
        {...{
          sortOrders,
          searchPlaceholder,
          getSearchField,
          defaultValues,
          title,
          fields,
          schema,
          getIsDisabled,
        }}
        filters={[useActiveFilter, useReferralFilter]}
        editButtons={PromotionActions}
        updateAsync={updatePromotionAsync}
        removeAsync={removePromotionAsync}
        createAsync={createPromotionAsync}
        selector={promotionsSelector}
        mapData={{ onEditClick, onDisableClick }}
      />
      <PromotionForm />
    </>
  );
};

export default PromotionsTable;
