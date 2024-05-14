import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';

import Fields from './Fields';
import Footer from './Footer';
import { updatingProductCategoryLoadingSelector } from '@/redux/loading';

const Form = ({ request, defaultValues }) => {
  const dispatch = useDispatch();

  const isUpdating = useSelector(updatingProductCategoryLoadingSelector);

  const methods = useForm({ defaultValues });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const submit = useCallback(
    (data) => {
      if (isUpdating) {
        return;
      }

      dispatch(request({ productCategory: data }));
    },
    [dispatch, isUpdating, request]
  );

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
};

export default Form;
