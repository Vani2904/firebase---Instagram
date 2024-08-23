import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { projectStorage, projectFirestore } from "../firebase/config";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!file) return; // Return early if no file is provided

    // Create a storage reference
    const storageRef = ref(projectStorage, file.name);
    const collectionRef = collection(projectFirestore, "images");

    // Upload the file
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        const createdAt = serverTimestamp();

        // Check if document with the same URL already exists
        const q = query(collectionRef, where("url", "==", downloadUrl));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          // Add document only if it doesn't already exist
          await addDoc(collectionRef, {
            url: downloadUrl,
            createdAt,
          });
        }

        setUrl(downloadUrl);
      }
    );
  }, [file]);
 
  return { progress, url, error };
};

export default useStorage;
