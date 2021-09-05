import { createReducer, on } from '@ngrx/store';
import { sharedActions } from './shared.actions';

export const sharedFeatureKey = 'shared';

export interface SharedReducer {
  activeHttpRequest: boolean;
}

const initialState: SharedReducer = {
  activeHttpRequest: false,
};

export const reducer = createReducer<SharedReducer>(
  initialState,
  on(sharedActions.httpRequestStarted, (state) => ({
    ...state,
    activeHttpRequest: true,
  })),
  on(sharedActions.httpRequestEnded, (state) => ({
    ...state,
    activeHttpRequest: false,
  }))
);
