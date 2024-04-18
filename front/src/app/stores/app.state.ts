// app.state.ts
import { createAction, createReducer, on, createSelector } from '@ngrx/store';

export interface AppState {
  token: string | null;
}

export const initialAppState: AppState = {
  token: null
};

export const updateToken = createAction(
  'Update Token',
  (newToken: string) => ({ newToken })
);

export const reducer = createReducer(
  initialAppState,
  on(updateToken, (state, { newToken }) => ({ ...state, token: newToken }))
);

// Selector
export const selectToken = (state: AppState) => state.token;
export const getToken = createSelector(selectToken, (token) => token);
