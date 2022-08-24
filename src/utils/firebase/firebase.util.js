// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  getFirestore,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK_lT-OIxhKYRZN5K5sNNmhXi4HaZan2g",
  authDomain: "crwn-shopping-11cdb.firebaseapp.com",
  projectId: "crwn-shopping-11cdb",
  storageBucket: "crwn-shopping-11cdb.appspot.com",
  messagingSenderId: "703278247267",
  appId: "1:703278247267:web:f21ee6978967ca46a07756",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithPop = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  addtionaInformation = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userData = await getDoc(userDocRef);

  //   if user doc exists, return the user auth info
  if (userData.exists()) {
    return userData;
  }

  // if user has no doc, create one
  const { email, displayName } = userAuth;
  const createdAt = new Date();

  try {
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt,
      ...addtionaInformation,
    });
    return userData;
  } catch (error) {
    console.error("error in saving authenticated user to firestore ", error);
  }
};

export const addUserToAuthByEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signUserIn = async (email, password) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentials;
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      throw new Error(`no user with such credential was found!`);
    }
    if (error.code === "auth/wrong-password")
      throw new Error("Wrong password!");
    throw new Error(`failed to sign in, ${error}`);
  }
};

export const signUserOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = () => {
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      resolve(user);
    });
  });
};

// database
export const addCollectionAndDocumentsToDb = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionReference = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docReference = doc(collectionReference, object.title.toLowerCase());
    batch.set(docReference, object);
  });
  try {
    await batch.commit();
  } catch (error) {
    console.error(error);
  }
};

export const getCategoriesAndDocuments = async () => {
  const collectionReference = collection(db, "categories");
  const q = query(collectionReference);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};
