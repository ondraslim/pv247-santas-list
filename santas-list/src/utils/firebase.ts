import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

// Simplified user type for referencing users
type User = Pick<firebase.User, 'uid' | 'email'>;


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
