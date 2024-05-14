import { useCallback } from 'react';
import { CustomFormElement } from '.';

const DriverLicenseNumber = (props) => {
  const mask = useCallback((value) => {
    const MIN_LENGTH = 2;
    const MAX_LENGTH = 20;
    const mask = [/[A-Za-z0-9-]/, /[A-Za-z0-9-]/];

    if (value.length <= MIN_LENGTH) {
      return mask;
    }

    for (let i = MIN_LENGTH; i < Math.min(value.length, MAX_LENGTH); i++) {
      mask.push(/[A-Za-z0-9-]/);
    }

    return mask;
  }, []);

  return (
    <CustomFormElement
      {...props}
      type="masked"
      mask={mask}
    />
  );
};

export default DriverLicenseNumber;
