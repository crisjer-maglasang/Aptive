import { useSelector } from 'react-redux';

import { planBuilderConstants } from '@/modules/AdminTools/lib/constants';
import Date from '@/modules/AdminTools/components/Form/Date';

const { START_ON, START_ON_LABEL } = planBuilderConstants;

const StartDate = () => {
  const planErrors = useSelector((state) => state?.errors?.errors?.updatePlan);

  const startDateErrors = planErrors?.[START_ON];

  return (
    <Date
      name={START_ON}
      label={START_ON_LABEL}
      error={startDateErrors}
      required
    />
  );
};

export default StartDate;
