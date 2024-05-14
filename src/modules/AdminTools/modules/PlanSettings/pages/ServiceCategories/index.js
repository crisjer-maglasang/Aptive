import { useSelector } from 'react-redux';

import ServiceCategoryHeader from './ServiceCategoryHeader';
import ServiceCategoryTable from './ServiceCategoryTable';
import { productCategorySelector } from '@/modules/AdminTools/redux/productManager/product-categories';

const ServiceCategory = () => {
  const { categories } = useSelector(productCategorySelector);

  const showForm = categories.length > 0;

  return (
    <div>
      <ServiceCategoryHeader />
      {showForm ? <ServiceCategoryTable /> : <div>No Service Categories</div>}
    </div>
  );
};

export default ServiceCategory;
