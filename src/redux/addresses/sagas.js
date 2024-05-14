import { call, put, takeLatest, select } from 'redux-saga/effects';
import { createRequestSaga } from '@/redux/helpers';
import { getAddressesAsync } from './actions';
import Api, { Mapper } from '@/api';
import { selectCountries } from './selectors';

function* getAddressesSaga() {
  const state = yield select(selectCountries);

  if (!state.length) {
    const response = yield call(
      Api.getAddresses(),
      {},
      { withCredentials: false },
    );

    const { items } = Mapper.getCountriesStates(response);

    yield put(getAddressesAsync.success(items));
  }
}

export function* addressesActionWatcher() {
  yield takeLatest(
    getAddressesAsync.request.type,
    createRequestSaga(getAddressesSaga, {
      keyNew: 'addresses',
      errKey: 'addresses',
      write: false,
    }),
  );
}
