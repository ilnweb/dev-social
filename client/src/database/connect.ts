import axios from 'axios';

export const createNewPost = async (post: any, user: any) => {

  const createdAt = new Date();
  console.log(user);
  const postReady = {
    userID: user.id,
    userPhoto: user.photoURL,
    userName: user.displayName,
    tags: post.postTags,
    postBody: post.postText,
    postImg: post.photoURL,
    likes: 0,
    createdAt,
    comments: []
  };
  try {

  } catch (error) {
    alert('error creating new post ' + error.message);
  }
  return postReady;
};

export const createUserProfile = async (email: any, password: any, name: any) => {
  const readyUser = {
    name,
    password,
    email
  }
  try {
    axios.post(`http://localhost:5000/auth/signup`,{
      name,
      password,
      email
    })
      .then(res => {
        console.log('user created');
      })

  } catch (error) {
    alert('error creating user ' + error.message);
  }

  return readyUser;
};