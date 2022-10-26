import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FetchWords } from "../util/APIUtils.js";

import Backdrop from "./Backdrop";
import styles from "../index.css";
import styles2 from "./styles/savedCards.css";

//animation features for individual cards
const cardsFadeIn = {
  hidden: {
    y: "50vh",
    opacity: 0
  },

  visible: {
    y: "0",
    opacity: 1
  },

  exit: {
    y: "50vh",
    opacity: 0
  }
};

//animation features for entire container
const dropIn = {
  hidden: {
    x: "-100vh",
    opacity: 0
  },

  visible: {
    x: "0",
    opacity: 1,
    transition: {
      type: "spring"
    }
  },

  exit: {
    x: "-100vh",
    opacity: 0
  }
};

export const SavedCards = ({ handleClose, words, setSavedWords }) => {
  return (
    <Backdrop onClick={handleClose} user="savedcards">
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="savedcards"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="card-main-cont">
          {words.length < 1 && (
            <motion.div
              style={{
                fontFamily: `"Roboto Slab", serif`,
                fontSize: "30px",
                color: "white",
                textAlign: "center"
              }}
              variants={cardsFadeIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              You haven't saved any words yet!
            </motion.div>
          )}
          <AnimatePresence>
            {words.map((word) => {
              return (
                <motion.div
                  key={word.word}
                  className="cards-cont"
                  variants={cardsFadeIn}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div
                    onClick={() => {
                      setSavedWords(words.filter((w) => w.word !== word.word));
                    }}
                    className="delete-card"
                  />
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">{word.word}</div>
                      <div className="flip-card-back">{word.definition}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </Backdrop>
  );
};
