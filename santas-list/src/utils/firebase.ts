import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

<<<<<<< HEAD
import { Gift, GiftList, Recipient } from '../src/data/DataTypes'
=======
import { Gift, GiftList, Giftee } from '../data/DataTypes'
>>>>>>> 34ae3c28af712ef4ae6065e263ceae1172afb41b

  const firebaseConfig = {
    apiKey: "AIzaSyBgMpZHjVvrSRrAfyCpeiRHu2Cwgfse3Ls",
    authDomain: "santa-s-list-92869.firebaseapp.com",
    databaseURL: "https://santa-s-list-92869.firebaseio.com",
    projectId: "santa-s-list-92869",
    storageBucket: "santa-s-list-92869.appspot.com",
    messagingSenderId: "219098905244",
    appId: "1:219098905244:web:18bcac0a5146e83d9e8b59"
  };

firebase.initializeApp(firebaseConfig);

// Firestore database
const db = firebase.firestore();

// Each list has "user" field that holds email of the user it belongs to
<<<<<<< HEAD
export const listsCollection = db.collection(
  'lists',
) as firebase.firestore.CollectionReference<GiftList>;

=======
export var giftListsCollection = db.collection(
  'lists',
) as firebase.firestore.CollectionReference<GiftList>;

// Return documents of lists for given user
export const getUserGiftLists = (user: User) => {
  return giftListsCollection.where("user", "==", user.email).get()
}

// Given gift list return list of recipients in it's subcollection
export const getGiftListRecipients = (list: GiftList) => {
  return giftListsCollection.doc(list.id).collection('recipients') as firebase.firestore.CollectionReference<Giftee>
}

// Given gift list return list of gifts in it's subcollection (to be used to stats)
export const getGiftListGifts = (list: GiftList) => {
  return giftListsCollection.doc(list.id).collection('gifts') as firebase.firestore.CollectionReference<Gift>
}

>>>>>>> 34ae3c28af712ef4ae6065e263ceae1172afb41b


// Simplified user type for referencing users
export type User = Pick<firebase.User, 'uid' | 'email'>;


// Hook providing logged in user information
export const useLoggedInUser = () => {
  // Hold user info in state
  const [user, setUser] = useState<firebase.User | null>();

  // Setup onAuthStateChanged once when component is mounted
  useEffect(() => {
    firebase.auth().onAuthStateChanged(u => setUser(u));
  }, []);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(u => setUser(u));

    // Call unsubscribe in the cleanup of the hook
    return () => unsubscribe();
  }, []);

  return user;
  
};

// Sign up handler
export const signUp = (email: string, password: string) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

// Sign in handler
export const signIn = (email: string, password: string) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

// Sign out handler
export const signOut = () => firebase.auth().signOut();
