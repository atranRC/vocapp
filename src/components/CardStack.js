import React from "react";
import { useEffect } from "react";
import { render } from "react-dom";
import {
  motion,
  useMotionValue,
  useTransform,
  MotionSvg,
  AnimatePresence,
} from "framer-motion";
import move from "lodash-move";
import Modal from "./Modal";
import { FetchWords } from "../util/APIUtils.js";
import { canLearnNewWords, updateLastLesson } from "../util/dbUtils";

import { auth } from "../firebase/firebaseUtils";
//car
import {
  collection,
  query,
  where,
  addDoc, //
  doc, //
  setDoc,
  getDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebaseUtils";

const expandIcon =
  "https://raw.githubusercontent.com/atranRC/vocapp/main/public/icons/expand.png";
const speakerIcon =
  "https://raw.githubusercontent.com/atranRC/vocapp/main/public/icons/speaker.png";
const saveIcon =
  "https://raw.githubusercontent.com/atranRC/vocapp/main/public/icons/save.png";
const checkIcon =
  "https://raw.githubusercontent.com/atranRC/vocapp/main/public/icons/check.png";
const collapseIcon =
  "https://raw.githubusercontent.com/atranRC/vocapp/main/public/icons/collapse.png";

const CARD_COLORS = ["#266678", "#cb7c7a", " #36a18b", "#cda35f", "#747474"];

const CARD_OFFSET = 15;
const SCALE_FACTOR = 0.05;

const dropIn = {
  hidden: {
    x: "100vh",
    opacity: 0,
  },

  visible: {
    x: "0",
    opacity: 1,
    transition: {
      type: "spring",
    },
  },

  exit: {
    x: "100vh",
    opacity: 0,
  },
};

export const CardStack = ({
  rotation,
  setRotation,
  words,
  setWords,
  wordTypes,
  setWordTypes,
  difficulty,
  refresh,
  savedWords,
  setSavedWords,
  learnedWords,
  setLearnedWords,
}) => {
  const [expandCard, setExpandCard] = React.useState(false);
  const [canLearnNew, setCanLearnNew] = React.useState(false);

  const x = useMotionValue(3);
  const rotate = useTransform(x, [150, -150], [70, -70]);
  const [cards, setCards] = React.useState(CARD_COLORS);

  const moveToEnd = (from) => {
    if (learnedWords.indexOf(words[0]) === -1) {
      setLearnedWords([...learnedWords, words[0]]);
    }

    if (auth.currentUser) {
      handleAddLearned();
      //if user has gone through all cards, update last lesson field
      if (learnedWords.length >= words.length-2) {
        canLearnNewWords(canLearnNew, setCanLearnNew);
        if (canLearnNew) {
          console.log("updating last lesson");
          console.log(
            "learnedwords: ",
            learnedWords.length,
            "words: ",
            words.length
          );
          updateLastLesson();
        }
      }
    }

    setCards(move(cards, from, cards.length - 1));
    setWords(move(words, from, words.length - 1));
    setRotation(rotation === "80.3% 75.7%" ? "8.3% 75.7%" : "80.3% 75.7%");
  };
  const handleAddLearned = async () => {
    const learnedRef = collection(db, "learned_words");
    const q = query(
      learnedRef,
      where("word", "==", words[0].word),
      where("uid", "==", auth.currentUser.uid)
    );

    let exists = false;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      exists = true;
      console.log(doc.id, " => ", doc.data());
    });

    if (!exists) {
      const docRef = await addDoc(collection(db, "learned_words"), {
        word: words[0].word,
        pos: words[0].pos,
        phonetic: words[0].phonetic,
        definition: words[0].definition,
        audio: words[0].audio,
        created: Timestamp.now(),
        uid: auth.currentUser.uid,
      });
      console.log("Document written with ID: ", docRef.id);
    }
  };

  const wrapperStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "70vh",
  };

  //async function to fetch json data of words
  async function f() {
    //return null;
    const diff = difficulty ? "difficult" : "medium";
    const a = await FetchWords(wordTypes, diff);

    console.log(a);
    setWords(a);
  }

  useEffect(() => {
    f();
  }, [refresh]);

  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={wrapperStyle}
    >
      <ul className="cardWrap">
        {cards.map((color, index) => {
          const canDrag = index === 0;

          return (
            <motion.li
              key={color}
              className="card"
              style={{
                /*...cardStyle,*/
                backgroundColor: color,
                cursor: canDrag ? "grab" : "auto",
                x: x,
                rotate: rotate,
              }}
              animate={
                expandCard
                  ? canDrag && {
                      //position: "relative",
                      zIndex: CARD_COLORS.length - index,

                      scale: 1.3,
                      transition: {
                        duration: 0.2,
                      },
                    }
                  : {
                      top: index * -CARD_OFFSET,
                      scale: 0.9 - index * SCALE_FACTOR,
                      zIndex: CARD_COLORS.length - index,
                    }
              }
              drag={expandCard ? false : canDrag}
              dragConstraints={{
                top: 3,
                bottom: 3,
                left: 0,
                right: 0,
              }}
              dragTransition={{
                bounceStiffness: 600,
                bounceDamping: 20,
              }}
              onDragEnd={() => moveToEnd(index)}
            >
              <div className="iconContainer">
                {canDrag && (
                  <>
                    <div
                      className="sizeIcon"
                      onClick={() => {
                        canDrag && setExpandCard(!expandCard);
                        console.log(words);
                      }}
                    >
                      <img src={!expandCard ? expandIcon : collapseIcon} />
                    </div>
                    <div
                      onClick={() => {
                        if (savedWords.length > 0) {
                          savedWords.filter((w) => w.word === words[index].word)
                            .length < 1 &&
                            setSavedWords([...savedWords, words[index]]);
                        } else {
                          setSavedWords([...savedWords, words[index]]);
                        }
                      }}
                      className="save-icon"
                    >
                      <img
                        alt=""
                        src={
                          savedWords.filter((w) => w.word === words[index].word)
                            .length < 1
                            ? saveIcon
                            : checkIcon
                        }
                      />
                    </div>
                    {words[index].audio && (
                      <div
                        onClick={async () => {
                          new Audio(words[index].audio).play();
                        }}
                        className="speaker-icon"
                      >
                        <img alt="speaker" src={speakerIcon} />
                      </div>
                    )}
                  </>
                )}
                <div className="word">
                  {!words ? "loading" : words[index].word}
                </div>
                <div className="speechPart">
                  {!words ? "..." : words[index].pos}
                </div>
                <div className="phonetics">
                  {!words ? "..." : words[index].phonetic}
                </div>
                <div className="def">
                  {!words ? "..." : words[index].definition}
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
};
