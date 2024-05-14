import * as yup from 'yup';
import {
  REQUIRED,
} from '@/lib/validations';


export const AddendumValidationSchema = yup.object().shape({
  addendum: yup.string().checkWhiteSpacesOnly(REQUIRED).required(REQUIRED),
});
