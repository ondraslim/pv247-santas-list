import { useEffect, useState, useLayoutEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { Gift, GiftList, Giftee, GiftListStats, UserStats } from '../data/DataTypes'


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

// Simplified user type for referencing users
export type User = Pick<firebase.User, 'uid' | 'email'>;

// Each list has "user" field that holds email of the user it belongs to
export const giftListsCollection = db.collection(
  'lists',
) as firebase.firestore.CollectionReference<GiftList>;

// Promise of number of all lists
export const giftListCount = async() => {
  const snapshot = await giftListsCollection.get()
  return snapshot.size;
}


export const getLists = async (user: User) => {
  return await giftListsCollection.where("user", "==", user.email).get().then(async snapshot => {
    let lists: Array<GiftList> = []; 
    await Promise.all(snapshot.docs.map(async doc => {      
      if (doc.get("user") === user.email) {
        let giftees: Array<Giftee> = [];
        await doc.ref.collection('recipients').get().then(async sn => {
          await Promise.all(sn.docs.map(async d => {
            let gifts: Array<Gift> = [];
            await d.ref.collection('gifts').get().then(async dc => {
              dc.forEach(g => {
                let gft: Gift = {id: g.id, name:g.get("name"), url: g.get("url"), price: g.get("price")};
                gifts.push(gft)             
              })
            }) 
            let gftee: Giftee = {id: d.id, name: d.get("name"), budget: d.get("budget"), note: d.get("note"), gifts: gifts}
            giftees.push(gftee)
          }))
        })
        let lst: GiftList = {id: doc.id, name: doc.get("name"), user: user.email ?? "", recipients: giftees};
        lists.push(lst);
      }     
    }))    
    return lists
  })}



// Returns stats for given list 
export const listStats = async (name: string, user: User) => {
  let max_count: number = 0;
  let min_count: number = 100000000000;
  let giftee_count: number = 0;
  let min_name: string = "";
  let max_name: string = "";
  let total_count: number = 0;
  return await giftListsCollection.where("name", "==", name).get().then(
    async snapshot => {      
      await Promise.all(snapshot.docs.map(async doc => {
        if (doc.get("user") === user.email) {
          await doc.ref.collection('recipients').get().then(sn => {
            giftee_count += sn.size
            sn.forEach(d => {
              let m = d.get("budget");    
              total_count = +m + +total_count;
              if (m > max_count) {
                max_count = m;
                max_name = d.get("name");
              }
              if (m <= min_count) {
                min_count = m;
                min_name = d.get("name");
              }            
            })        
          })
        }        
    }))   
    const stats: GiftListStats = {gifteeCount: giftee_count, maxCount: max_count, minCount: min_count, maxName: max_name, minName: min_name, avgCount: (total_count / giftee_count)}
    return stats;
  })}

// Returns list count and giftees count for user
export const statsForUser = async (user: User) => {
  return await giftListsCollection.where("user", "==", user.email).get().then(async snapshot => {
    let total_count = 0;
    let list_count = snapshot.size
    await Promise.all(snapshot.docs.map(async (doc) => {
      await doc.ref.collection('recipients').get().then(sn =>
        total_count += sn.size      
        )
    }))
    const stats: UserStats = {giftListCount: list_count, gifteeCount: total_count}
    return stats;
  })
}

// Add/modify (with merge) given list
export const setGiftList = async (giftList: GiftList) => {
  await giftListsCollection.doc(giftList.id).set({
    name: giftList.name,
    user: giftList.user,
  }, {merge: true})
}

// Delete given list
export const deleteGiftList = async (giftList: GiftList) => {
  await giftListsCollection.doc(giftList.id).delete();
}

// Delete given giftee from given list
export const deleteGiftee = async (gifteeId: string, giftList: GiftList) => {
  await giftListsCollection.doc(giftList.id).get().then(async doc => {
    await doc.ref.collection('recipients').doc(gifteeId).delete();
  });
}

// Delete given gift for given giftee within given gift list
export const deleteGift = async (giftId: string, giftee: Giftee, giftListId: string) => {
  await giftListsCollection.doc(giftListId).get().then(async doc => {
    await doc.ref.collection('recipients').doc(giftee.id).get().then(async d => {
      await d.ref.collection('gifts').doc(giftId).delete();
    })
  });
}
  

// Add/modify (with merge) given giftee within given list
export const setGiftee = async (listName: string, giftee: Giftee, user: User) => {
  await giftListsCollection.where("name", "==", listName).get().then(async snapshot => {
    await Promise.all(snapshot.docs.map(async doc => {
      if (user.email === doc.get("user")) {
        await doc.ref.collection('recipients').doc(giftee.id).set({          
          name: giftee.name,
          note: giftee.note,
          budget: giftee.budget,          
        }, {merge: true}).then(async () => {
          await doc.ref.collection('recipients').where("name", "==", giftee.name).get().then(async sn => {
            await Promise.all(sn.docs.map(async d => {
              giftee.gifts.forEach(gift => {
                d.ref.collection('gifts').doc(gift.id).set({
                  name: gift.name,
                  price: gift.price,
                  url: gift.url
                }, {merge: true});
              })              
            }))
          })
        }         
        );        
      }
    }))
  })
}



// Hook providing logged in user information
export const useLoggedInUser = () => {
  // Hold user info in state
  const [user, setUser] = useState<firebase.User | null>();

  // Setup onAuthStateChanged once when component is mounted
  useLayoutEffect(() => {
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