import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjcbdIe_YLn7M0cbWy3k5Aovj-mmCNfnY",
  authDomain: "igravkonya-53083.firebaseapp.com",
  projectId: "igravkonya-53083",
  storageBucket: "igravkonya-53083.firebasestorage.app",
  messagingSenderId: "1007233208169",
  appId: "1:1007233208169:web:29811045bee32230eb77f8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
