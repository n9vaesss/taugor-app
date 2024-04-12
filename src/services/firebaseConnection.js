import { initializeApp } from "firebase/app"; // eslint-disable-line
import { getAuth } from "firebase/auth"; // eslint-disable-line
import { getFirestore } from "firebase/firestore"; // eslint-disable-line
import { getStorage } from "firebase/storage"; // eslint-disable-line

const firebaseConfig = {
  apiKey: "AIzaSyCIYbvSAdl303qbURcmq3y8r9z_-0MLrS8", // eslint-disable-line
  authDomain: "projeto-taugor-686f0.firebaseapp.com", // eslint-disable-line
  projectId: "projeto-taugor-686f0", // eslint-disable-line
  storageBucket: "projeto-taugor-686f0.appspot.com", // eslint-disable-line
  messagingSenderId: "333484481143", // eslint-disable-line
  appId: "1:333484481143:web:264269b388010d95778472", // eslint-disable-line
  measurementId: "G-JD5V4Q62LN", // eslint-disable-line
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };
