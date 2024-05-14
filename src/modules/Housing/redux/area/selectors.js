import { createSelector } from 'reselect';

const areaSelector = (state) => state.housingArea;

export const teamsSummariesSelector = createSelector(
  areaSelector,
  (state) => state?.teamsSummaries || [],
);

export const branchesSummariesSelector = createSelector(
  areaSelector,
  (state) => state?.branchesSummaries || [],
);
