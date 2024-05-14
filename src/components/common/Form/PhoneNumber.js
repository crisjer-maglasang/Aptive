import { useMemo } from 'react';
import { CustomFormElement } from '.';

const PhoneNumber = (props) => {
  const mask = useMemo(() => (
    /**
     * Don't restrict first (or any other) character's range, for example /[1-9]/ instead of /\d/.
     * It may cause caret jump to the position of the next suitable character (in this case 0)
     * on attempt to insert the restricted character (0).
     *
     * Example,
     * Given: (987)-654-3210
     * Do: select the first character: ([9]87)-654-3210. Try to insert 0 which is restricted for the first character.
     * Result: caret jumps to the next 0's position, i.e. (876)-543-210[]_
     */
    ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  ), []);

  return (
    <CustomFormElement
      {...props}
      type="masked"
      mask={mask}
    />
  );
};

export default PhoneNumber;
