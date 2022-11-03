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
  orderBy,
  limit,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseUtils";

/*const canLearnNewWords = async () => {
  //get the last word user learned
  //compare the year, month, and year
  //return true if last learned word is more than a day old
  //
  const dailyGoal = 3;
  const learnedRef = collection(db, "learned_words");
  const q = query(
    learnedRef,
    where("uid", "==", auth.currentUser.uid),
    orderBy("created", "desc"),
    limit(5)
  );
  let canLearn = false;
  const querySnapshot = await getDocs(q);
  let n = 0;
  querySnapshot.forEach((doc) => {
    console.log(
      "last learned => ",
      doc.data().created.toDate(),
      " word =>",
      doc.data().word
    );
    const locDate = new Date();
    console.log("local date => ", locDate);
    if (
      doc.data().created.toDate().getFullYear() <= locDate.getFullYear() &&
      doc.data().created.toDate().getMonth() <= locDate.getMonth() &&
      doc.data().created.toDate().getDate() < locDate.getDate()
    ) {
      n++;
    }
    if (n < dailyGoal) {
      canLearn = true;
    }
  });
  console.log(canLearn);
};*/

const getRandomLearnedWords = () => {
  //if canLearnNewWords is false get random words from learned_words collection
  return null;
};

const getTodaysLearnedWords = () => {
  //if canLearnNewWords is false, get words that are learned today
  return null;
};

const updateLastLesson = async () => {
  //
  const userRef = doc(db, "users", auth.currentUser.uid);
  await updateDoc(userRef, {
    last_lesson: Timestamp.now(),
  });
};

const canLearnNewWords = async (canLearnNew, setCanLearnNew) => {
  //get last lesson field from current user
  //compare date to now
  //if older than now, return true
  const docRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    const locDate = new Date();
    console.log("local date => ", locDate);
    if (
      docSnap.data().last_lesson.toDate().getFullYear() <=
        locDate.getFullYear() &&
      docSnap.data().last_lesson.toDate().getMonth() <= locDate.getMonth() &&
      docSnap.data().last_lesson.toDate().getDate() < locDate.getDate()
    ) {
      console.log('allowed new words')
      setCanLearnNew(true);
    } else {
      console.log('not allowed new words')
      setCanLearnNew(false);
    }
    //console.log("=> =>", canLearnNew);
  }
};
export { updateLastLesson, canLearnNewWords };
