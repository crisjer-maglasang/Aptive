import { useSelector } from 'react-redux';

import Date from '@/modules/AdminTools/components/Form/Date';

const StartOn = (props) => {
  const promotionsErrors = useSelector(
    (state) => state?.errors?.errors?.promotionsUpdate
  );

  const startDateErrors = promotionsErrors?.start_on;

  return (
    <Date
      name="start_on"
      label="Start On"
      error={startDateErrors}
      required
      {...props}
    />
  );
};

export default StartOn;
