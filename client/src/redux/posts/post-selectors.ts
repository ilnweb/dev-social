import { createSelector } from 'reselect';
import { RootState } from '../root-reducer';

const selectPosts = (state: RootState) => state?.allPosts;

export const selectAllPosts = createSelector(
  [selectPosts],
  (allPosts) => allPosts.posts
);

export const getCommets = (id: string) => createSelector(
  [selectAllPosts],
  (posts: any) => posts?.find((post: any) => post._id === id).comments
);