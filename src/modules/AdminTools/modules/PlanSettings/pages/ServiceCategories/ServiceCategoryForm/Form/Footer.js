import { useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { CustomButton } from '@/components';
import { planBuilderConstants } from '@/modules/AdminTools/lib/constants';

import { removeProductCategoryAsync } from '@/modules/AdminTools/redux/productManager/product-categories';

const { ID, REMOVE_CONFIRM } = planBuilderConstants;

const Footer = () => {
  const dispatch = useDispatch();
  const id = useWatch({ name: ID });

  const remove = () => {
    if (!window.confirm(REMOVE_CONFIRM)) {
      return;
    }

    dispatch(removeProductCategoryAsync.request({ id }));
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
