import axios from 'axios';

export const createNewPost = async (post: any, userId: any , text:string) => {
  let postReady;
  try {
    postReady = await axios.post(`http://localhost:5000/feed/post`, {
      userId: userId,
      tags: post.postTags,
      postBody: text,
      postTitle: post.postText,
      postImg: post.photoURL
    })
  } catch (error) {
    console.log('error creating new post ' + error.message);
  }
  return postReady;
};

export const createUserProfile = async (email: any, password: any, name: any) => {
  let user;
  try {
    user = await axios.post(`http://localhost:5000/auth/signup`, {
      name,
      password,
      email
    })
  }
  catch (error) {
    console.log('error creating user ' + error.message);
  }
  return user;
};

export const signInUser = async (email: any, password: any) => {
  let result;
  try {
    result = await axios.post(`http://localhost:5000/auth/login`, {
      password,
      email
    })
    if (result.status === 200) {
      console.log('result signed in');
    }
  }
  catch (error) {
    console.log('error loging in user ' + error.message);
  }
  return result;
};


export const autoSignInUser = async (token: any) => {
  let result;
  try {
    result = await axios.post(`http://localhost:5000/auth/login-auto`, {
      token,
      userId: ''
    })
    if (result.status === 200) {
      console.log('user signed in automaticaly');
    }
  }
  catch (error) {
    console.log('error loging in user automaticaly' + error.message);
  }
  return result?.data.user;
};


export const avatarUpload = async (image: any, userId: any) => {
  console.log(image);
  let result;
  try {
    result = await axios.post(`http://localhost:5000/user/avatar`, {
      image,
      userId
    })
  }
  catch (error) {
    console.log('error uploading image ' + error.message);
  }
  return result?.data.user;
};