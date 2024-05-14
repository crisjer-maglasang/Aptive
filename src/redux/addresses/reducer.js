import { createReducer } from '@/redux/root';
import { nameSpace, getAddressesAsync } from './actions';

const initialState = {
  countries: [],
  states: {},
};

export const addressesReducer = createReducer(nameSpace, initialState, {
  [getAddressesAsync.success]: ({ state, action }) => {
    const { countries, states } = action.payload;

    state.countries = countries;
    state.states = states;
  },
});
