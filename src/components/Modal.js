import React from "react";
import { motion } from "framer-motion";
import { FetchWords } from "../util/APIUtils.js";

import Backdrop from "./Backdrop";
import styles from "../index.css";

const dropIn = {
  hidden: {
    y: "100vh",
    opacity: 0
  },

  visible: {
    y: "0",
    opacity: 1,
    transition: {
      //duration: 0.05,
      type: "spring",
      bounce: 0,
      //dampint: 0,
      stiffness: 180
    }
  },

  exit: {
    y: "100vh",
    opacity: 0
  }
};

const Modal = ({ handleClose, children }) => {
  async function f() {
    //return null;
    const a = await FetchWords(["verbs", "nouns"], "medium");

    console.log(a);
  }
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
        {children}
        <button onClick={f}>close</button>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
