import { useEffect, useMemo } from 'react';
import { CustomFormElement } from '.';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';

const SsnNumber = (props) => {
  const mask = useMemo(() => (
    /**
     * Don't restrict first (or any other) character's range, for example /[0-8]/ instead of /\d/.
     * It may cause caret jump to the position of the next suitable character (in this case 9)
     * on attempt to insert the restricted character (9).
     *
     * Example,
     * Given: 123-45-6789
     * Do: select the first character: [1]12-45-6789. Try to insert 9 which is restricted for the first character.
     * Result: caret jumps to the next 9's position, i.e. 234-56-789[]_
     */
    [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  ), []);
  const { setValue } = useFormContext();

  const { isDirty, name } = props;

  useEffect(() => {
    if (isDirty) {
      setValue(name, '');
    }
  }, [isDirty, name, setValue]);

  return isDirty
    ? (
      <CustomFormElement
        {...props}
        type="masked"
        mask={mask}
      />
    ) : (
      <CustomFormElement
        {...props}
        type="text"
      />
    );
};

SsnNumber.propTypes = {
  isDirty: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

export default SsnNumber;
