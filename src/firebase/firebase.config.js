import  firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC0G9H5211BBaDyTlovW5RyXulzPQ1_ios",
  authDomain: "dev-social-716c3.firebaseapp.com",
  databaseURL: "https://dev-social-716c3.firebaseio.com",
  projectId: "dev-social-716c3",
  storageBucket: "dev-social-716c3.appspot.com",
  messagingSenderId: "1086675750388",
  appId: "1:1086675750388:web:b413f2e77cbe01cfd2fda1",
  measurementId: "G-L691DM9S17"
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
		} catch (error) {
			alert('error creating user', error.message);
		}
	}
	return userRef;
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