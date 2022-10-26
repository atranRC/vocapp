import React from "react";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Modal from "./components/Modal";
import WelcomeModal from "./components/WelcomeModal";
import { CardStack } from "./components/CardStack";
import { SavedCards } from "./components/SavedCards";
import NavBar from "./components/NavBar";
import { Quiz } from "./components/Quiz";

//placeholder words list
const WORDS_LIST = [
  {
    word: "w",
    phon: "phone"
  },
  {
    word: "w",
    phon: "phone"
  },
  {
    word: "w",
    phon: "phone"
  },
  {
    word: "w",
    phon: "phone"
  },
  {
    word: "w",
    phon: "phone"
  }
];

export default function App() {
  const [rotation, setRotation] = React.useState("8.3% 75.7%");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [welcomeModalOpen, setWelcomeModalOpen] = React.useState(false);
  const [words, setWords] = React.useState(WORDS_LIST);
  const [savedWords, setSavedWords] = React.useState([]);
  const [learnedWords, setLearnedWords] = React.useState([]);
  const [wordTypes, setWordTypes] = React.useState([
    "nouns",
    "verbs",
    "adverbs",
    "adjectives"
  ]);
  const [difficulty, setDifficulty] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [page, setPage] = React.useState(0);

  //view welcome modal on page load
  useEffect(() => {
    setPage(-1);
    setWelcomeModalOpen(true);
  }, []);

  return (
    <div className="body-cont">
      <AnimatePresence initial={true} exitBeforeEnter={true}>
        {page === 0 && (
          <CardStack
            rotation={rotation}
            setRotation={setRotation}
            words={words}
            setWords={setWords}
            wordTypes={wordTypes}
            setWordTypes={setWordTypes}
            difficulty={difficulty}
            refresh={refresh}
            savedWords={savedWords}
            setSavedWords={setSavedWords}
            learnedWords={learnedWords}
            setLearnedWords={setLearnedWords}
          />
        )}
      </AnimatePresence>
      <AnimatePresence initial={true} exitBeforeEnter={true}>
        {page === 1 && (
          <SavedCards words={savedWords} setSavedWords={setSavedWords} />
        )}
      </AnimatePresence>
      <AnimatePresence initial={true} exitBeforeEnter={true}>
        {page === 2 && <Quiz learnedWords={learnedWords} />}
      </AnimatePresence>

      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {modalOpen && (
          <Modal modalOpen={modalOpen} handleClose={() => setModalOpen(false)}>
            <h1>hello</h1>
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {welcomeModalOpen && (
          <WelcomeModal
            setWelcomeModalOpen={setWelcomeModalOpen}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            handleClose={() => {
              setRefresh(!refresh);
              setWelcomeModalOpen(false);
              setPage(0);
            }}
            wordTypes={wordTypes}
            setWordTypes={setWordTypes}
          />
        )}
      </AnimatePresence>
      <div className="buttons-cont">
        <NavBar
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          welcomeModalOpen={welcomeModalOpen}
          setWelcomeModalOpen={setWelcomeModalOpen}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
