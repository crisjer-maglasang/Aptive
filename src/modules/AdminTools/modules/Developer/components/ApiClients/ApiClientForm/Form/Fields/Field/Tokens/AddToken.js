import PropTypes from 'prop-types';

import AddButton from '@/modules/AdminTools/components/AddButton';
import { apiClientConstants } from '@/modules/AdminTools/lib/constants';

const { API_ADD_TOKEN } = apiClientConstants;

const AddToken = ({ append }) => {
  return (
    <AddButton onClick={append} shouldShow>
      {API_ADD_TOKEN}
    </AddButton>
  );
};

AddToken.propTypes = {
  append: PropTypes.func.isRequired,
};

export default AddToken;
