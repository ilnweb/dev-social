import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyC0G9H5211BBaDyTlovW5RyXulzPQ1_ios',
	authDomain: 'dev-social-716c3.firebaseapp.com',
	databaseURL: 'https://dev-social-716c3.firebaseio.com',
	projectId: 'dev-social-716c3',
	storageBucket: 'dev-social-716c3.appspot.com',
	messagingSenderId: '1086675750388',
	appId: '1:1086675750388:web:b413f2e77cbe01cfd2fda1',
	measurementId: 'G-L691DM9S17'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();
	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
			console.log(userRef);
		} catch (error) {
			alert('error creating user', error.message);
		}
	}
	return userRef;
};

export const createNewPost = async (post, user ) => {
	const postsRef = firestore.collection(`posts`);
	const createdAt = new Date();
  console.log(user);
	try {
		await postsRef.add({
			userID: user.id,
			userPhoto: user.photoURL,
			userName: user.displayName,
			tags: post.postTags,
			postBody: post.postText,
			postImg: post.photoURL,
			likes: 0,
			createdAt,
			comments: []
		});
	} catch (error) {
		alert('error creating new post', error.message);
	}
	return postsRef;
};

export const getPosts = async (setPosts) => {
	const postsRef = firestore.collection(`posts`);
  const snapshot = await postsRef.get();
  setPosts.posts = [...snapshot.docs.map(doc => doc.data())]
  console.log(setPosts.posts[4].comments);
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

const providerGoogle = new firebase.auth.GoogleAuthProvider();
providerGoogle.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(providerGoogle);

export default firebase;
