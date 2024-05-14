import { createAsyncAction } from '@/redux/root';

import { nameSpace } from '../nameSpace';

export const agreementLengthNameSpace = `${nameSpace}/agreement-lengths`;

export const updateAgreementLengthAsync = createAsyncAction(
  `${agreementLengthNameSpace}/UPDATE_AGREEMENT_LENGTH`
);

export const createAgreementLengthAsync = createAsyncAction(
  `${agreementLengthNameSpace}/CREATE_AGREEMENT_LENGTH`
);

export const removeAgreementLengthAsync = createAsyncAction(
  `${agreementLengthNameSpace}/REMOVE_AGREEMENT_LENGTH`
);

export const requestAgreementLengthsAsync = createAsyncAction(
  `${agreementLengthNameSpace}/REQUEST_AGREEMENT_LENGTH`
);

export const requestAgreementLengthUnitsAsync = createAsyncAction(
  `${agreementLengthNameSpace}/REQUEST_AGREEMENT_LENGTH_UNITS`
);
