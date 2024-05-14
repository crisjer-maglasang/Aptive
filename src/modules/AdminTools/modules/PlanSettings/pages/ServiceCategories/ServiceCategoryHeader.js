import { productManagerConstants } from '@/modules/AdminTools/lib/constants';
import CreateServiceCategory from './CreateServiceCategory';
import Header from '@/modules/AdminTools/components/Header';

const { SERVICE_CATEGORIES } = productManagerConstants;

const ServiceCategoryHeader = () => (
  <Header title={SERVICE_CATEGORIES}>
    <CreateServiceCategory />
  </Header>
);

export default ServiceCategoryHeader;
