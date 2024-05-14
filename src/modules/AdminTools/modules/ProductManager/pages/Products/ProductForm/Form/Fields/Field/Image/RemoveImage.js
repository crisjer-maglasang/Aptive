import { useFormContext, useWatch } from 'react-hook-form';

import { useDispatch } from 'react-redux';
import { removeProductImageAsync } from '@/modules/AdminTools/redux/productManager/products';
import { productManagerConstants } from '@/modules/AdminTools/lib/constants';

const { IMAGE, ID } = productManagerConstants;

const RemoveImage = () => {
  const dispatch = useDispatch();
  const { setValue } = useFormContext();

  const id = useWatch({
    name: ID,
  });

  const removeImage = () => {
    if (confirm('Are you sure you want to remove this image?')) {
      setValue(IMAGE, null);

      dispatch(removeProductImageAsync.request(id));
    }
  };

  return (
    <div className="cursor-pointer" onClick={removeImage}>
      Remove
    </div>
  );
};

export default RemoveImage;
