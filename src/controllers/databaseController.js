import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore/lite';
import {} from 'dotenv/config'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);;

const appendId = (doc) => {
  let data = doc.data();
  data['_id'] = doc.id;

  return data;
}

export const getCollection = async (col, res) => {
  return await getDocs(collection(db, col)).then((snapshot) => snapshot.docs.map(appendId));
}

export const getDocument = async (col, name, res) => {
  return await getDoc(doc(db, col, name)).then(appendId);
}

export default getCollection;