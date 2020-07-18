export const addLike = (posts: any, payload: any) => {
  const postToUpdate = posts.find((post: any) => post._id === payload.postId)
  postToUpdate.likes.push(payload.userId)
  postToUpdate.likesCount += 1;
  console.log(postToUpdate);
  return posts.map((post: any) => post._id === payload.postId ? postToUpdate : post)
}

export const removeLike = (posts: any, payload: any) => {
  const postToUpdate = posts.find((post: any) => post._id === payload.postId)
  const index = postToUpdate.likes.indexOf(payload.userId)
  postToUpdate.likes.splice(index, 1)
  postToUpdate.likesCount -= 1;
  console.log(postToUpdate);
  return posts.map((post: any) => post._id === payload.postId ? postToUpdate : post)
}

// state?.posts?.map((post: any) => post._id === action.payload.postId ? console.log(action.payload) : post)