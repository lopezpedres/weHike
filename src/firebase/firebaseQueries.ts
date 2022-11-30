import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

const createNewUser = async () => {
  const userMetaRef = doc(db, "user-meta", String(auth.currentUser?.uid));
  try {
    const docSnap = await getDoc(userMetaRef);
    if (!docSnap.exists()) {
      console.log("Creating User");
      const newUser = {
        uid: auth.currentUser?.uid,
        createdAt: new Date(),
        email: auth.currentUser?.email,
        name: auth.currentUser?.displayName,
        updatedAt: new Date(),
      };
      const result = await setDoc(userMetaRef, newUser);
      return result;
    } else {
      console.log("User exists already");
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

interface InterfaceNewTrailArg {
  trail_id: string;
  trail_name: string;
  tags?: string[];
}
interface InterfaceNewUserTrail {
  [key: string]: {
    trail_name: string;
    tags?: string[];
  };
}

export const addUserTrail = async (newTrailArg: InterfaceNewTrailArg) => {
  const { trail_id, trail_name, tags } = newTrailArg;
  const newTrailObject = {} as InterfaceNewUserTrail;
  newTrailObject[trail_id] = {
    trail_name,
    tags,
  };
  const specificUserTrailsRef = doc(
    db,
    "user-trails",
    `${auth.currentUser?.uid}`
  );

  try {
    const docSnap = await getDoc(specificUserTrailsRef);
    if (docSnap.exists()) {
      console.log("Trail already exits");
      return;
    } else {
      const result = await setDoc(specificUserTrailsRef, newTrailObject);
      console.log(result);
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};

export default createNewUser;
