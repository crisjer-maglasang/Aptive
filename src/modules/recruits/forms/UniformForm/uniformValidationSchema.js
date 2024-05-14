import * as yup from 'yup';

import { REQUIRED } from '@/lib/validations';

export const validationSchema = yup.object().shape({
  shirtSize: yup.string()
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
        return !isWizard && isAdmin ? schema : schema.required(REQUIRED)
      }
    ),
  jacketSize: yup.string()
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
        return !isWizard && isAdmin ? schema : schema.required(REQUIRED)
      }
    ),
  waistSize: yup.string()
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
        return !isWizard && isAdmin ? schema : schema.required(REQUIRED)
      }
    ),
  hatSize: yup.string()
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
        return !isWizard && isAdmin ? schema : schema.required(REQUIRED)
      }
    ),
  shoeSize: yup.string()
    .when(['$isAdmin', '$isWizard'], (isAdmin, isWizard, schema) => {
        return !isWizard && isAdmin ? schema : schema.required(REQUIRED)
      }
    ),
});
