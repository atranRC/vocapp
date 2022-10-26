import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FetchWords } from "../util/APIUtils.js";

import Backdrop from "./Backdrop";
import refreshButton from "../../public/icons/refresh.png";
import styles from "../index.css";
import "./styles/quiz.css";

//animation features for quiz card
const dropIn = {
  hidden: {
    x: "100vh",
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
    x: "100vh",
    opacity: 0
  }
};
const CARD_COLORS = ["#266678", "#cb7c7a", " #36a18b", "#cda35f", "#747474"];
const CORRECT_AUDIO =
  "https://notification-sounds.com/soundsfiles/Game-show-correct-answer.mp3";

export const Quiz = ({ children, learnedWords }) => {
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [bgColor, setBgColor] = React.useState(0);
  const [refresh, setRefresh] = React.useState(false);

  useEffect(() => {
    if (learnedWords.length >= 4) {
      //select random number to select word
      let randNum = Math.floor(
        Math.random() * (learnedWords.length - 1 - 0) + 0
      );
      setSelectedOption("");
      setQuestion(learnedWords[randNum].word);
      setAnswer(learnedWords[randNum].definition);

      //make an array of other options without the answer and take only the first three
      const otherOpts = learnedWords
        .map((w) => w.definition)
        .filter((f) => f !== learnedWords[randNum].definition)
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        .slice(0, 3);

      //now add the correct option
      otherOpts.push(learnedWords[randNum].definition);

      //do a final sort
      const finalShuffledOptions = otherOpts
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      setOptions(finalShuffledOptions);
      setBgColor(Math.floor(Math.random() * (CARD_COLORS.length - 1 - 0) + 0));
    }
  }, [refresh]);

  useEffect(() => {
    if (selectedOption && selectedOption === answer) {
      new Audio(CORRECT_AUDIO).play();
    }
  }, [selectedOption]);
  return (
    <Backdrop onClick={null} user="savedcards">
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="quiz"
        style={{
          backgroundColor: CARD_COLORS[bgColor]
        }}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {learnedWords.length < 4 ? (
          <div className="quiz-answer">Learn at least four words!</div>
        ) : (
          <>
            <div
              className="quiz-question"
              style={{
                transition: "0.2s",
                backgroundColor:
                  selectedOption &&
                  (selectedOption === answer ? "lightgreen" : "red")
              }}
            >
              {question}
            </div>
            <div className="quiz-answers-cont">
              {options.map((option, index) => {
                return (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedOption(option);
                    }}
                    className="quiz-answer"
                    style={{
                      color:
                        selectedOption &&
                        selectedOption === option &&
                        (option === answer ? "lightgreen" : "red")
                    }}
                  >
                    {index + 1}. {option}
                  </div>
                );
              })}
              <div>
                <img
                  onClick={() => setRefresh(!refresh)}
                  className="quiz-refresh-button"
                  src={refreshButton}
                  alt="rfresh"
                />
              </div>
            </div>
          </>
        )}
      </motion.div>
    </Backdrop>
  );
};
