import * as yup from 'yup';

import EditDataTable from '@/modules/AdminTools/components/EditDataTable';
import {
  createCampaignAsync,
  campaignsSelector,
  removeCampaignAsync,
  updateCampaignAsync,
} from '@/modules/AdminTools/redux/promoCode/campaigns';
import ChannelsSelect from './ChannelsSelect';
import EditChannels from './EditChannels';
import EditStartOn from './EditStartOn';
import EditEndOn from './EditEndOn';

const fields = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    required: true,
  },
  {
    label: 'Description',
    name: 'description',
    type: 'text',
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
    label: 'Accepted Channels',
    name: 'accepted_channels',
    CreateRender: ChannelsSelect,
    Edit: EditChannels,
  },
];

const sortOrders = ['name'];

const title = 'Campaigns';

const defaultValues = {
  name: '',
};

const getSearchField = ({ name }) => name;

const searchPlaceholder = 'Search Campaigns';

const schema = yup.object().shape({
  name: yup.string().required('Name is required.'),
  start_on: yup.string().required('Start date is required.'),
  accepted_channels: yup.array().min(1, 'At least one channel is required.'),
});

const Campaigns = () => (
  <EditDataTable
    {...{
      sortOrders,
      searchPlaceholder,
      getSearchField,
      defaultValues,
      title,
      fields,
      schema,
    }}
    updateAsync={updateCampaignAsync}
    removeAsync={removeCampaignAsync}
    createAsync={createCampaignAsync}
    selector={campaignsSelector}
  />
);

export default Campaigns;
