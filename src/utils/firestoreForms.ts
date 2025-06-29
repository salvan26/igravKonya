import { db } from "./firebase";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";

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
