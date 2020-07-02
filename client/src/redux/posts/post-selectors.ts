import { createSelector } from 'reselect';

const selectPosts = (state:any) => state.allPosts;

export const selectAllPosts = createSelector(
  [selectPosts],
  (allPosts)=>allPosts.posts
);