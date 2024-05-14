import { createReducer } from '@/redux/root';
import {
  seasonNameSpace,
  requestSeasonSummaries,
  setSelectedSeason,
} from './actions';

const initialState = {
  seasonSummaries: [],
  selectedSeason: {},
};

export const seasonReducer = createReducer(seasonNameSpace, initialState, {
  [requestSeasonSummaries.success]: ({ state, action }) => {
    state.seasonSummaries = action.payload;
  },
  [setSelectedSeason]: ({ state, action }) => {
    state.selectedSeason = action.payload;
  },
});
