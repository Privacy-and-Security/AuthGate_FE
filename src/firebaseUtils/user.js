import { getFromDB, updateToDB, writeToDB, getCurrentUserEmail, getAllFromDB } from './firestore';
import { arrayUnion, arrayRemove, doc } from 'firebase/firestore';
import { db } from './firebase-setup';

const collectionName = 'users';

export async function createUser(userEmail) {
  const newUser = {};
  return await writeToDB(newUser, collectionName, userEmail);
}

export async function getUserData() {
  const email = getCurrentUserEmail();

  if (email === '') {
    return Promise.resolve();
  }

  return await getFromDB(email, collectionName).then((docSnap) => docSnap.data());
}
