import { useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { CustomButton } from '@/components';
import { removeProductAsync } from '@/modules/AdminTools/redux/productManager/products';

const Footer = () => {
  const dispatch = useDispatch();
  const id = useWatch({ name: 'id' });

  const remove = () => {
    if (!window.confirm('Are you sure?')) {
      return;
    }

    dispatch(removeProductAsync.request(id));
  };

  return (
    <div className="flex flex-row">
      {id && (
        <CustomButton color={'red'} onClick={remove}>
          Remove
        </CustomButton>
      )}
      <div className="flex-grow" />
      <CustomButton color={'green'} type="submit">
        Save
      </CustomButton>
    </div>
  );
};

export default Footer;
