import { settingsReducer } from '../settings-reducer';
import {
  agreementLengthNameSpace,
  updateAgreementLengthAsync,
  createAgreementLengthAsync,
  removeAgreementLengthAsync,
  requestAgreementLengthsAsync,
  requestAgreementLengthUnitsAsync,
} from './actions';
import { NAME } from './selectors';

export const agreementLengthsReducer = {
  [NAME]: settingsReducer(
    agreementLengthNameSpace,
    {
      updateAsync: updateAgreementLengthAsync,
      createAsync: createAgreementLengthAsync,
      removeAsync: removeAgreementLengthAsync,
      requestsAsync: requestAgreementLengthsAsync,
    },
    {
      [requestAgreementLengthUnitsAsync.success]: ({
        state,
        action: { payload },
      }) => {
        state.units = payload;
      },
    }
  ),
};
