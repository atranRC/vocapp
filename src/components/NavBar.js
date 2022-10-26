import React from "react";
import styles from "../index.css";
import "./styles/navBar.css";
import settingsIcon from "https://raw.githubusercontent.com/atranRC/vocapp/main/public/icons/settings.png";
import savedIcon from "https://raw.githubusercontent.com/atranRC/vocapp/main/public/icons/saved.png";
import quizIcon from "https://raw.githubusercontent.com/atranRC/vocapp/main/public/icons/quiz.png";
import learnIcon from "https://raw.githubusercontent.com/atranRC/vocapp/main/public/icons/learn.png";
import editIcon from "https://raw.githubusercontent.com/atranRC/vocapp/main/public/icons/edit.png";

export default function NavBar({
  modalOpen,
  setModalOpen,
  welcomeModalOpen,
  setWelcomeModalOpen,
  page,
  setPage,
}) {
  return (
    <div className="nav-bar-body">
      <div
        style={{
          borderBottom: page === 0 && "10px lightcoral solid",
        }}
        onClick={() => {
          setPage(0);
        }}
        className="nav-bar-item"
      >
        <img alt="learn" src={learnIcon} />
      </div>
      <div
        style={{
          borderBottom: page === 1 && "10px lightcoral solid",
        }}
        onClick={() => {
          setPage(1);
        }}
        className="nav-bar-item"
      >
        <img alt="save" src={savedIcon} />
      </div>
      <div
        onClick={() => {
          setWelcomeModalOpen(!welcomeModalOpen);
        }}
        className="nav-bar-item"
      >
        <img alt="edit" src={editIcon} />
      </div>
      <div
        style={{
          borderBottom: page === 2 && "10px lightcoral solid",
        }}
        onClick={() => {
          setPage(2);
        }}
        className="nav-bar-item"
      >
        <img alt="quiz" src={quizIcon} />
      </div>
    </div>
  );
}
