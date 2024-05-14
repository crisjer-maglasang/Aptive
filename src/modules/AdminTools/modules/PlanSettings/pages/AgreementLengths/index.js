import {
  agreementLengthsSelector,
  removeAgreementLengthAsync,
  createAgreementLengthAsync,
  updateAgreementLengthAsync,
} from '@/modules/AdminTools/redux/planBuilder/can-edit-settings/agreement-lengths';
import UnitSelect from './UnitSelect';
import EditUnit from './EditUnit';
import EditDataTable from '@/modules/AdminTools/components/EditDataTable';
import { agreementLengthConstants } from '@/modules/AdminTools/lib/constants';

const {
  NAME,
  NAME_LABEL,
  UNIT,
  UNIT_LABEL,
  LENGTH,
  LENGTH_LABEL,
  ORDER,
  ORDER_LABEL,
  SEARCH,
} = agreementLengthConstants;

const fields = [
  {
    label: NAME_LABEL,
    name: NAME,
    type: 'text',
    required: true,
  },
  {
    label: UNIT_LABEL,
    name: UNIT,
    CreateRender: UnitSelect,
    Edit: EditUnit,
  },
  {
    label: LENGTH_LABEL,
    name: LENGTH,
    type: 'number',
    step: 1,
    required: true,
    min: 0,
  },
  {
    label: ORDER_LABEL,
    name: ORDER,
    type: 'number',
    step: 1,
    required: true,
  },
];

const sortOrders = [ORDER, NAME];

const title = 'Agreement Lengths';

const defaultValues = {
  [NAME]: '',
  [UNIT]: 0,
  [LENGTH]: 0,
  [ORDER]: 0,
};

const getSearchField = ({ name }) => name;

const searchPlaceholder = SEARCH;

const AgreementLengths = () => (
  <EditDataTable
    {...{
      sortOrders,
      searchPlaceholder,
      getSearchField,
      defaultValues,
      title,
      fields,
    }}
    updateAsync={updateAgreementLengthAsync}
    removeAsync={removeAgreementLengthAsync}
    createAsync={createAgreementLengthAsync}
    selector={agreementLengthsSelector}
  />
);

export default AgreementLengths;
