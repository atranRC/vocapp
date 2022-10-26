import React from "react";
import { motion } from "framer-motion";

import Backdrop from "./Backdrop";
import welcomeModalStyles from "./styles/welcomeModal.css";

//animation features
const dropIn = {
  hidden: {
    y: "-100vh",
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
    y: "-100vh",
    opacity: 0
  }
};
const WelcomeSelection = ({ wordTypes, setWordTypes }) => {
  //handle card selection
  const handleNounsChange = (e) => {
    //on button press, if wordtype exists in state, remove it,
    //if it doesn't, add it to state
    if (wordTypes.indexOf("nouns") === -1) {
      setWordTypes([...wordTypes, "nouns"]);
    } else {
      setWordTypes(wordTypes.filter((wt) => wt !== "nouns"));
    }
  };
  const handleVerbsChange = (e) => {
    if (wordTypes.indexOf("verbs") === -1) {
      setWordTypes([...wordTypes, "verbs"]);
    } else {
      setWordTypes(wordTypes.filter((wt) => wt !== "verbs"));
    }
  };
  const handleAdverbsChange = (e) => {
    if (wordTypes.indexOf("adverbs") === -1) {
      setWordTypes([...wordTypes, "adverbs"]);
    } else {
      setWordTypes(wordTypes.filter((wt) => wt !== "adverbs"));
    }
  };
  const handleAdjChange = (e) => {
    if (wordTypes.indexOf("adjectives") === -1) {
      setWordTypes([...wordTypes, "adjectives"]);
    } else {
      setWordTypes(wordTypes.filter((wt) => wt !== "adjectives"));
    }
  };
  return (
    <div className="welcome-cont">
      <div className="welcome-message">
        <h1>Hello, Which parts of speech would you like to learn today?</h1>
      </div>
      <div className="welcome-options-cards-main-cont">
        <div
          onClick={handleNounsChange}
          className="welcome-options-cards-cards-cont"
        >
          <div
            style={{
              transition: ".2s",
              opacity: wordTypes.indexOf("nouns") === -1 ? 0 : 1
            }}
            className="pos-card-selected"
          ></div>
          <div className="welcome-options-word">Nouns</div>
        </div>
        <div
          onClick={handleVerbsChange}
          className="welcome-options-cards-cards-cont"
        >
          <div
            style={{
              transition: ".2s",
              opacity: wordTypes.indexOf("verbs") === -1 ? 0 : 1
            }}
            className="pos-card-selected"
          ></div>
          <div className="welcome-options-word">Verbs</div>
        </div>
        <div
          onClick={handleAdverbsChange}
          className="welcome-options-cards-cards-cont"
        >
          <div
            style={{
              transition: ".2s",
              opacity: wordTypes.indexOf("adverbs") === -1 ? 0 : 1
            }}
            className="pos-card-selected"
          ></div>
          <div className="welcome-options-word">Adverbs</div>
        </div>
        <div
          onClick={handleAdjChange}
          className="welcome-options-cards-cards-cont"
        >
          <div
            style={{
              transition: ".2s",
              opacity: wordTypes.indexOf("adjectives") === -1 ? 0 : 1
            }}
            className="pos-card-selected"
          ></div>
          <div className="welcome-options-word">Adjectives</div>
        </div>
      </div>
    </div>
  );
};
const WelcomeModal = ({
  handleClose,
  setWelcomeModalOpen,
  wordTypes,
  setWordTypes,
  difficulty,
  setDifficulty
}) => {
  return (
    <Backdrop onClick={() => setWelcomeModalOpen(false)} user="welcome">
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="welcome-modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <WelcomeSelection wordTypes={wordTypes} setWordTypes={setWordTypes} />
        <div className="challenge-toggle-opt-cont">
          <label style={{ scale: "0.8" }} class="switch">
            <input
              checked={difficulty}
              type="checkbox"
              onChange={(e) => {
                e.target.checked ? setDifficulty(true) : setDifficulty(false);
              }}
            />
            <span class="slider"> </span>
          </label>
          <div
            style={{
              transition: ".3s",
              color: difficulty ? "lightseagreen" : "white"
            }}
            className="challenge-text"
          >
            I want some challenge!
          </div>
        </div>
        <div
          onClick={wordTypes.length >= 1 && handleClose}
          className={
            wordTypes.length >= 1 ? "lets-go" : "lets-go lets-go-disabled"
          }
        >
          Lets Go!
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default WelcomeModal;
