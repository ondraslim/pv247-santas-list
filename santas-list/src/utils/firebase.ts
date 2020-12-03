import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { Gift, GiftList, Giftee } from '../data/DataTypes'

  const firebaseConfig = {
    apiKey: "AIzaSyBgMpZHjVvrSRrAfyCpeiRHu2Cwgfse3Ls",
    authDomain: "santa-s-list-92869.firebaseapp.com",
    databaseURL: "https://santa-s-list-92869.firebaseio.com",
    projectId: "santa-s-list-92869",
    storageBucket: "santa-s-list-92869.appspot.com",
    messagingSenderId: "219098905244",
    appId: "1:219098905244:web:18bcac0a5146e83d9e8b59"
  };


  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Firestore database
const db = firebase.firestore();

// Each list has "user" field that holds email of the user it belongs to
export const giftListsCollection = db.collection(
  'lists',
) as firebase.firestore.CollectionReference<GiftList>;

// Promise of number of all lists
export const giftListCount = async() => {
  const snapshot = await giftListsCollection.get()
  return snapshot.size;  
}

export const giftListCountUser = async(user : User) => {
  return await giftListsCollection.where("user", "==", user.email).get().then(async snap => {
    return snap.size
  })
}

// Promise of number of giftees on lists for user
export const gifteeCount = async (user: User) => {
  return await giftListsCollection.where("user", "==", user.email).get().then(async snapshot => {
    let total_count = 0;
    await Promise.all(snapshot.docs.map(async (doc) => {
      await doc.ref.collection('recipients').get().then(sn =>
        total_count += sn.size      
        )
    }))
    return total_count;
  })
}

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