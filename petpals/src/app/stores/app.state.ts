// app.state.ts
import { createAction, createReducer, on, createSelector } from '@ngrx/store';
import {Owner} from "../models/interfaces/owner";
import {Caregiver} from "../models/interfaces/caregiver";

export interface AppState {
  token: string | null;
  user: Owner | Caregiver | null;
}

export const initialAppState: AppState = {
  token: null,
  user: null
};

export const updateToken = createAction(
  'Update Token',
  (newToken: string) => ({ newToken })
);

export const updateUserOwner = createAction(
    'Update User as Owner',
    (newUser: Owner) => ({ newUser })
);
export const reducer = createReducer(
  initialAppState,
  on(updateToken, (state, { newToken }) => ({ ...state, token: newToken })),
  on(updateUserOwner, (state, { newUser }) => ({ ...state, user: newUser }))
);

// Selector
export const selectToken = (state: AppState) => state.token;
export const getToken = createSelector(selectToken, (token) => token);
export const selectUser = (state: AppState) => state.user;
export const getUser = createSelector(selectUser, (user) => user);
