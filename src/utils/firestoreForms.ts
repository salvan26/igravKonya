import { db } from "./firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export type FormData = {
  id: number;
  player1: string;
  player2: string;
  score?: string;
  details?: string;
  top: string;
  left: string;
};

const COLLECTION = "forms";

export async function getAllForms(): Promise<FormData[]> {
  const snapshot = await getDocs(collection(db, COLLECTION));
  return snapshot.docs.map((doc) => doc.data() as FormData);
}

export async function saveForm(form: FormData) {
  await setDoc(doc(db, COLLECTION, String(form.id)), form);
}

export async function saveAllForms(forms: FormData[]) {
  const promises = forms.map(saveForm);
  await Promise.all(promises);
}

export type ScheduleGame = {
  id: string;
  date: string;
  time: string;
  player1: string;
  player2: string;
};

const SCHEDULE_COLLECTION = "schedule";

export async function getAllSchedule(): Promise<ScheduleGame[]> {
  const snapshot = await getDocs(collection(db, SCHEDULE_COLLECTION));
  return snapshot.docs.map((doc) => doc.data() as ScheduleGame);
}

export async function saveSchedule(game: ScheduleGame) {
  await setDoc(doc(db, SCHEDULE_COLLECTION, String(game.id)), game);
}

export async function saveAllSchedule(games: ScheduleGame[]) {
  const promises = games.map(saveSchedule);
  await Promise.all(promises);
}

export async function deleteSchedule(id: string) {
  await deleteDoc(doc(db, SCHEDULE_COLLECTION, String(id)));
}

export async function updateSchedule(game: ScheduleGame) {
  await setDoc(doc(db, SCHEDULE_COLLECTION, String(game.id)), game);
}
