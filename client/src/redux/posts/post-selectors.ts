import { createSelector } from 'reselect';
import { RootState } from '../root-reducer';

const selectPosts = (state: RootState) => state?.allPosts;

export const selectAllPosts = createSelector(
  [selectPosts],
  (allPosts) => allPosts.posts
);

export const selectSinglePost = (id: string) => createSelector(
  [selectPosts],
  (allPosts: any) => allPosts?.posts?.filter((post: any) => post._id === id)
);