import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAo3S4IgcLNNF3UnBfPzuSwsJocXPoIRxA",
    authDomain: "vocapp-b94da.firebaseapp.com",
    projectId: "vocapp-b94da",
    storageBucket: "vocapp-b94da.appspot.com",
    messagingSenderId: "532337933526",
    appId: "1:532337933526:web:c9a6c2dc2d507f25b15d77",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
