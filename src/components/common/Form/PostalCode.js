import { useCallback } from 'react';
import { CustomFormElement } from '.';

const PostalCode = (props) => {
  const mask = useCallback((value) => {
    const MIN_LENGTH = 5;
    const MAX_LENGTH = 9;
    const mask = [/\d/, /\d/, /\d/, /\d/, /\d/];
    const length = value.replace(/\D/g, '').length;

    if (length <= MIN_LENGTH) {
      return mask;
    }

    mask.push('-');

    for (let i = MIN_LENGTH; i < Math.min(length, MAX_LENGTH); i++) {
      mask.push(/\d/);
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

export default PostalCode;
