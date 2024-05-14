import PropTypes from 'prop-types';
import { useFieldArray } from 'react-hook-form';

import { productManagerConstants } from '@/modules/AdminTools/lib/constants';
import Labeled from '@/modules/AdminTools/components/Labeled';
import { useAreaPlan } from '../../AreaContext';
import AddService from './AddService';
import AddonsTable from './AddonsTable';

const Addons = ({ AddonsHeader, required }) => {
  const areaPlan = useAreaPlan();
  const addons = useFieldArray({ name: `${areaPlan}.addons` });

  const append = () => {
    addons.append({
      product_id: '',
    });
  };

  const removeConfirm = (index) => {
    if (window.confirm(productManagerConstants.REMOVE_CONFIRM)) {
      addons.remove(index);
    }
  };

  return (
    <Labeled label={<AddonsHeader />}>
      <AddonsTable
        addons={addons.fields}
        remove={removeConfirm}
        required={required}
      />
      <AddService {...{ append }} />
    </Labeled>
  );
};

Addons.propTypes = {
  AddonsHeader: PropTypes.elementType.isRequired,
  required: PropTypes.bool,
};

Addons.defaultProps = {
  required: true,
};

export default Addons;
