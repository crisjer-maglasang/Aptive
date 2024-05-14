import * as yup from 'yup';
import {
  REQUIRED,
} from '@/lib/validations';
import { dashboardConstants } from '@/lib';

const {
  REP_STATUS_NAME,
} = dashboardConstants;

export const StatusDateValidationSchema = yup.object().shape({
  start_date: yup
    .string()
    .ensure()
    .when(['$repStatuses', REP_STATUS_NAME], (repStatuses, repStatus, schema) => {
      if (repStatuses.find((status) => status.statusCode === repStatus)?.shouldBeUpdatedWithStartDate) {
        return yup.string().required(REQUIRED);
      }

      return schema;
    }),
  actual_end_date: yup
    .string()
    .ensure()
    .when(['$repStatuses', REP_STATUS_NAME], (repStatuses, repStatus, schema) => {
      if (repStatuses.find((status) => status.statusCode === repStatus)?.shouldBeUpdatedWithEndDate) {
        return yup.string().required(REQUIRED);
      }

      return schema;
    }),
}, [[REP_STATUS_NAME]]);
