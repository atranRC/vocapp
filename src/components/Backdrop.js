import React from "react";
import { motion } from "framer-motion";
import styles from "../index.css";

//backdrop for modals
const Backdrop = ({ children, onClick, user }) => {
  return (
    <motion.div
      className={user === "welcome" ? "welcome" : "backdrop"}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
