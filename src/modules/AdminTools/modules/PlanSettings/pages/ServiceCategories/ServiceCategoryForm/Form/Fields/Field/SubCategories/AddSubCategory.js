import PropTypes from 'prop-types';
import { productManagerConstants } from '@/modules/AdminTools/lib/constants';
import AddButton from '@/modules/AdminTools/components/AddButton';

const { ADD_SUB_CATEGORY } = productManagerConstants;

const AddSubCategory = ({ append }) => {
  return (
    <AddButton onClick={append} shouldShow>
      {ADD_SUB_CATEGORY}
    </AddButton>
  );
};

AddSubCategory.propTypes = {
  append: PropTypes.func.isRequired,
};

export default AddSubCategory;
