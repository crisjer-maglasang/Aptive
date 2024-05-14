import PropTypes from 'prop-types';
import ServiceCategoryForm from '../ServiceCategoryForm';
import { productManagerConstants } from '@/modules/AdminTools/lib/constants';
import { updateProductCategoryAsync } from '@/modules/AdminTools/redux/productManager/product-categories';

const { NAME } = productManagerConstants;

const EditServiceCategory = ({ category }) => (
  <ServiceCategoryForm
    defaultValues={category}
    request={updateProductCategoryAsync.request}
  >
    <div className="text-primary-300 cursor-pointer">{category[NAME]}</div>
  </ServiceCategoryForm>
);

EditServiceCategory.propTypes = {
  category: PropTypes.any.isRequired,
};

export default EditServiceCategory;
