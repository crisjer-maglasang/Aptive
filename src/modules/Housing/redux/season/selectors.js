import { createSelector } from 'reselect';

const seasonSelector = (state) => state.season;

export const seasonSummariesSelector = createSelector(
  seasonSelector,
  (state) => state?.seasonSummaries || []
);

export const selectedSeasonSelector = createSelector(
  seasonSelector,
  (state) => state?.selectedSeason || {}
);
