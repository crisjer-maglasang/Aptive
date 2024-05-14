import { createSelector } from 'reselect';
import { settingsSelector } from '../settings-selector';

export const NAME = 'agreementLength';

export const agreementLengthsSelector = settingsSelector(NAME);

export const agreementLengthUnitsSelector = createSelector(
  (state) => state?.[NAME],
  (state) => state.units || []
);
