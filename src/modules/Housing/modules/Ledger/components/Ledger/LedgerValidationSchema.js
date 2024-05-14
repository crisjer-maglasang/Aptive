import * as yup from 'yup';
import { ledgerConstants } from '@/modules/Housing/lib';

const {
  PAYEE_NAME,
  PAYMENT_METHOD_BM_CREDIT_CARD,
  DEALER_NAME,
} = ledgerConstants;

import {
  REQUIRED,
  LEDGER_CURRENCY_REGEX,
  LEDGER_CURRENCY_MESSAGE,
  MIN_2_CHARS,
  MAX_255_CHARS,
  MIN_1_ARRAY,
} from '@/lib/validations';

export const ledgerValidationSchema = yup.object().shape({
  [DEALER_NAME]: yup
    .string()
    .ensure()
    .required(REQUIRED),
  branch_id: yup
    .string()
    .ensure()
    .required(REQUIRED),
  team_id: yup
    .string()
    .ensure()
    .required(REQUIRED),
  partnership_id: yup
    .string()
    .ensure()
    .required(REQUIRED),
  apartment_ids: yup
    .array()
    .when([], {
      is: (apartment_ids) => apartment_ids !== undefined,
      then: yup.array().required(REQUIRED),
      otherwise: yup.array().notRequired(),
    })
    .min(1, MIN_1_ARRAY),
  vendor_number: yup.string()
    .checkWhiteSpacesOnly(REQUIRED)
    .min(2, MIN_2_CHARS)
    .max(255, MAX_255_CHARS)
    .nullable()
    .transform((curr, orig) => orig === '' ? null : curr),
  payment_method_id: yup
    .string()
    .ensure(),
  payment_type_id: yup
    .string()
    .ensure(),
  amount_to_pay: yup
    .string()
    .nullable()
    .matches(LEDGER_CURRENCY_REGEX, {
      excludeEmptyString: value => value !== '$',
      message: LEDGER_CURRENCY_MESSAGE,
    }),
  amount_paid: yup
    .string()
    .matches(LEDGER_CURRENCY_REGEX, {
      excludeEmptyString: true,
      message: LEDGER_CURRENCY_MESSAGE,
    }),
  date_paid: yup
    .string()
    .ensure(),
  date_due: yup
    .string()
    .ensure(),
  furniture_damaged: yup
    .string()
    .matches(LEDGER_CURRENCY_REGEX, {
      excludeEmptyString: true,
      message: LEDGER_CURRENCY_MESSAGE,
    }),
  rep_utilities: yup
    .string()
    .matches(LEDGER_CURRENCY_REGEX, {
      excludeEmptyString: true,
      message: LEDGER_CURRENCY_MESSAGE,
    }),
  apartment_charges: yup
    .string()
    .matches(LEDGER_CURRENCY_REGEX, {
      excludeEmptyString: true,
      message: LEDGER_CURRENCY_MESSAGE,
    }),
  [PAYEE_NAME]: yup.string()
    .checkWhiteSpacesOnly(REQUIRED)
    .min(2, MIN_2_CHARS)
    .max(255, MAX_255_CHARS)
    .nullable()
    .transform((curr, orig) => orig === '' ? null : curr),
});
