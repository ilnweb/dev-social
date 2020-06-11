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
    const result = await axios.post(`http://localhost:5000/auth/signup`, {
      name,
      password,
      email
    })


  } catch (error) {
    alert('error creating user ' + error.message);
  }

  return readyUser;
};


export const signInUser = async (email: any, password: any) => {
  let result;
  try {
    result = await axios.post(`http://localhost:5000/auth/login`, {
      password,
      email
    })

    if (result.status === 200) {
      console.log('user signed in');
     
    }


  } catch (error) {
    alert('error loging in user ' + error.message);
  }
  return result;
};