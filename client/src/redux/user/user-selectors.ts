import { createSelector } from 'reselect';
import { RootState } from '../root-reducer';

const selectUser = (state:RootState) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user)=>user.currentUser
);

export const selectUserError = createSelector(
  [selectUser],
  (user)=>user.error
);

export const selectUserId = createSelector(
  [selectUser],
  (user)=>user.currentUser?.id
);