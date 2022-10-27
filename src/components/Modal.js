import React from "react";
import { motion } from "framer-motion";
import { FetchWords } from "../util/APIUtils.js";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseUtils";
//car
import {
  collection,
  query,
  where,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebaseUtils";

import { useAuthState } from "react-firebase-hooks/auth";

import Backdrop from "./Backdrop";
import styles from "../index.css";

const dropIn = {
  hidden: {
    y: "100vh",
    opacity: 0,
  },

  visible: {
    y: "0",
    opacity: 1,
    transition: {
      //duration: 0.05,
      type: "spring",
      bounce: 0,
      //dampint: 0,
      stiffness: 180,
    },
  },

  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const UserProfile = ({ user, handleLogout }) => {
  return (
    <div>
      <p>Current User: {user.auth.currentUser.uid}</p>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

const SignIn = ({ handleSignIn }) => {
  return (
    <div>
      <button onClick={handleSignIn}>sign in</button>
    </div>
  );
};

const Modal = ({ handleClose, children }) => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (u) => {
        //u.user.email
        const docRef = doc(db, "users", u.user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          const usersRef = collection(db, "users");
          await setDoc(doc(usersRef, u.user.uid), {
            last_lesson: "",
            streak: 0,
            xp: 0,
          });
          console.log("user created");
        }
        //commit here
        console.log(u.user.uid);
      })
      .catch((err) => console.log(err));
  };
  const handleLogout = async () => {
    signOut(auth);
    /*const docRef = doc(db, "users", "M1nA7h4QmtSGZZ3rY1Ie");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }*/
    //user && console.log(user);
    //M1nA7h4QmtSGZZ3rY1Ie

    /*try {
            const docRef = await addDoc(collection(db, "users"), {
                last_login: "",
                streak: 0,
                uid: "b",
                xp: 1912,
            });

            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }*/
  };

  const [user, loading, error] = useAuthState(auth);

  return (
    <Backdrop onClick={handleClose} user="settings">
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {user ? (
          <UserProfile user={user} handleLogout={handleLogout} />
        ) : (
          <SignIn handleSignIn={signInWithGoogle} />
        )}
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
