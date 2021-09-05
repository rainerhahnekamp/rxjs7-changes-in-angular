import { createFeatureSelector, createSelector } from '@ngrx/store';
import { sharedFeatureKey, SharedReducer } from './shared.reducer';

const featureSelector = createFeatureSelector<SharedReducer>(sharedFeatureKey);

const selectActiveHttpRequest = createSelector(
  featureSelector,
  ({ activeHttpRequest }) => activeHttpRequest
);

export const fromShared = {
  selectActiveHttpRequest,
};
