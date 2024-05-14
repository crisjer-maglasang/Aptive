import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { CustomFormElement } from '@/components/common';
import { plansSelector } from '@/modules/AdminTools/redux/planBuilder/plans';

const EditPlan = ({ value, name, onChange, data, getData, other, error }) => {
  const plans = useSelector(plansSelector);
  const [otherValue, setOtherValue] = useState(data[other]);

  useEffect(() => {
    const timer = setInterval(() => {
      const currData = getData();
      if (currData) {
        const newOtherValue = currData[other];
        if (newOtherValue !== otherValue) {
          setOtherValue(() => newOtherValue);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [setOtherValue, otherValue, getData, other]);

  const filteredPlans = useMemo(
    () => plans.filter(({ id }) => id !== otherValue),
    [plans, otherValue]
  );

  const options = useMemo(() => {
    let options = [
      {
        label: 'Select a plan',
        value: '',
      },
    ];

    if (filteredPlans) {
      const planOptions = filteredPlans.map(({ id, name }) => ({
        label: `${id} - ${name}`,
        value: id,
      }));
      options = options.concat(planOptions);
    }

    return options;
  }, [filteredPlans]);

  return (
    <CustomFormElement
      {...{
        onChange,
        value,
        options,
        name,
        error,
      }}
      type="multiSelect"
      required
    />
  );
};

EditPlan.propTypes = {
  value: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  getData: PropTypes.func,
  other: PropTypes.string,
  data: PropTypes.object,
  error: PropTypes.any,
};

export default EditPlan;
