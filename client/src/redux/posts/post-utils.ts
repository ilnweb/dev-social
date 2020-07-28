// import { PostsActionTypes, IPosts, ISinglePost } from './posts.types';

export const addLike = (posts: any, postId: string, userId: string) => {
  const postToUpdate = posts.find((post: any) => post._id === postId)
  postToUpdate.likes.push(userId)
  postToUpdate.likesCount += 1;
  console.log(postToUpdate);
  return posts.map((post: any) => post._id === postId ? postToUpdate : post)
}

export const removeLike = (posts: any, postId: string, userId: string) => {
  const postToUpdate = posts.find((post: any) => post._id === postId)
  const index = postToUpdate.likes.indexOf(userId)
  postToUpdate.likes.splice(index, 1)
  postToUpdate.likesCount -= 1;
  console.log(postToUpdate);
  return posts.map((post: any) => post._id === postId ? postToUpdate : post)
}


export const changeComments = (posts: any, postId: string, comments: any) => {
  console.log('in util')
  return posts?.map((post: any) => post._id === postId ? { ...post, comments:[...comments] } : post)
}
// state?.posts?.map((post: any) => post._id === action.payload.postId ? console.log(action.payload) : post)