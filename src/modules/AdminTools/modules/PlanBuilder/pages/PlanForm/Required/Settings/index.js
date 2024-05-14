import Fields from './Fields';
import Header from '../Headers/BasicInfo';
import Labeled from '@/modules/AdminTools/components/Labeled';

const Settings = () => (
  <Labeled label={<Header />}>
    <Fields />
  </Labeled>
);

export default Settings;
