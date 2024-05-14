import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';

import Fields from './Fields';
import Footer from './Footer';
import { useApiClientContext } from '../../ApiClientContext';

const Form = ({ request, defaultValues, setIsSubmitted }) => {
  const { updateApiSelector } = useApiClientContext();

  const dispatch = useDispatch();

  const isUpdating = useSelector(updateApiSelector);

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

      dispatch(request({ client: data }));

      setIsSubmitted(true);
    },
    [dispatch, request, isUpdating, setIsSubmitted]
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
  setIsSubmitted: PropTypes.func.isRequired,
};

export default Form;
