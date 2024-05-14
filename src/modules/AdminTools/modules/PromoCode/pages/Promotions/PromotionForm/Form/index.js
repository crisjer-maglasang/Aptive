import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';

import Fields from './Fields';
import Footer from './Footer';
import { updatingProductsLoadingSelector } from '@/redux/loading';
import { updatePromotionAsync } from '@/modules/AdminTools/redux/promoCode/promotions';

const BOOLEANS = [
  'first_time_customer_only',
  'is_customer_referral',
  'is_employee_referral',
  'is_stackable',
];

const Form = ({ promotion, setIsSubmitted, onClose }) => {
  const dispatch = useDispatch();

  const isUpdating = useSelector(updatingProductsLoadingSelector);

  const methods = useForm({ defaultValues: promotion });

  const { handleSubmit } = methods;

  const submit = useCallback(
    (data) => {
      if (isUpdating) {
        return;
      }

      BOOLEANS.forEach((field) => {
        if (typeof data[field] === 'string') {
          data[field] = data[field] === 'true';
        }
      });

      dispatch(updatePromotionAsync.request(data));

      setIsSubmitted(true);
    },
    [dispatch, isUpdating, setIsSubmitted]
  );

  useEffect(() => {
    methods.setFocus('code');
  }, [methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>
        <Fields disabled={promotion.isActive} />
        <Footer {...{ onClose }} />
      </form>
    </FormProvider>
  );
};

Form.propTypes = {
  promotion: PropTypes.any.isRequired,
  setIsSubmitted: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Form;
