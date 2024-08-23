import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  authDomain: "instagram---clones.firebaseapp.com",
  projectId: "instagram---clones",
  storageBucket: "instagram---clones.appspot.com",
  messagingSenderId: "763195397310",
  appId: "1:763195397310:web:d3a523b995aa32a131faef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);

export { projectFirestore, projectStorage, serverTimestamp };
