import exif from "exifr";
import { useContext } from "react";
import {
  userContentState,
  userContentDispatch,
} from "../../context/UserContentProvider/UserContentProvider";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase/firebaseConfig";

const ImageForm = () => {
  const state = useContext(userContentState);
  // const dispatch = useContext(userContentDispatch);
  // const formHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   console.log(file);
  //   if (file) {
  //     const exifData = await exif.parse(file);
  //     console.log("exifData", exifData);
  //   }
  // };

  const addDocHandler = () => {
    const currentUser = auth.currentUser;
    console.log(currentUser?.uid);
    const userTrailsRef = collection(db, "user-trails");
    const newObject = {
      trails: [{ difficulty: "easy", name: "trail3", trail_id: "234552" }],
      uid: currentUser?.uid,
    };
    addDoc(userTrailsRef, newObject);
  };
  const updateDocHandler = () => {
    const userTrailsRef = doc(db, "user-trails");
    // const newDif =
    // updateDoc(userTrailsRef,{trails:newTrails})
  };
  return (
    <>
      {/* <form>
        <input onChange={(e) => formHandler(e)} type="file" name="picture" />
      </form> */}
      <button onClick={() => addDocHandler()}>Add Document</button>
      <button onClick={() => updateDocHandler()}>Update Document</button>
    </>
  );
};

export default ImageForm;
