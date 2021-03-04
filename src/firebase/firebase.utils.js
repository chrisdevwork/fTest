import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAEVDgrk81mB6T76xt2QcOkyerGu4KRFVo",
    authDomain: "clone-testfb.firebaseapp.com",
    databaseURL: "https://clone-testfb-default-rtdb.firebaseio.com",
    projectId: "clone-testfb",
    storageBucket: "clone-testfb.appspot.com",
    messagingSenderId: "252058056278",
    appId: "1:252058056278:web:9f709fb75bdfe3346cadf7",
    measurementId: "G-HMEL9EF0D8"
  };

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

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
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
