import * as yup from 'yup';
import {REQUIRED} from '@/lib/validations';

yup.addMethod(yup.string, 'checkWhiteSpacesOnly', function (errorMessage) {
  return this.test('test-string-contains-only-white-spaces', errorMessage, function (value) {
    const {path, createError} = this;

    return (
      (!value || value.trim().length !== 0) || createError({path, message: errorMessage || REQUIRED})
    );
  });
});
