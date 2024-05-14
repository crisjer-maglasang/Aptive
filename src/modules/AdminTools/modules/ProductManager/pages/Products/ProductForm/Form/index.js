import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';

import { productManagerConstants } from '@/modules/AdminTools/lib/constants';
import Fields from './Fields';
import Footer from './Footer';
import { updatingProductsLoadingSelector } from '@/redux/loading';

const { ID, ORDER, RECURRING, NAME, NEEDS_CUSTOMER_SUPPORT, IMAGE } =
  productManagerConstants;

const BOOLEANS = [RECURRING, NEEDS_CUSTOMER_SUPPORT];

const FILES = [IMAGE];

const Form = ({ request, defaultValues, setIsSubmitted }) => {
  const dispatch = useDispatch();

  const isUpdating = useSelector(updatingProductsLoadingSelector);

  const methods = useForm({ defaultValues });

  const { handleSubmit } = methods;

  const submit = useCallback(
    (data) => {
      if (isUpdating) {
        return;
      }

      data[ORDER] = +data[ORDER];

      const formData = new FormData();

      for (const key of Object.keys(data)) {
        if (BOOLEANS.includes(key)) {
          if (typeof data[key] === 'string') {
            data[key] = data[key] === 'true';
          }

          data[key] = data[key] ? 1 : 0;
        }

        if (FILES.includes(key)) {
          if (typeof data[key] === 'string') {
            continue;
          }
        }

        if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      }

      dispatch(request({ formData, id: data[ID] || null }));

      setIsSubmitted(true);
    },
    [dispatch, request, isUpdating, setIsSubmitted]
  );

  useEffect(() => {
    methods.setFocus(NAME);
  }, [methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>
        <Fields />
        <Footer />
      </form>
    </FormProvider>
  );
};

Form.propTypes = {
  defaultValues: PropTypes.any.isRequired,
  request: PropTypes.func.isRequired,
  setIsSubmitted: PropTypes.func.isRequired,
};

export default Form;
