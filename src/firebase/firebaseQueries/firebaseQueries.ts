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
  updateDoc,
  deleteDoc,
  deleteField,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

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
    await setDoc(specificUserTrailsRef, newTrailObject, { merge: true });
  } catch (err) {
    console.log(err);
  }
};

export const updateUserTrails = async (newTrailArg: InterfaceNewTrailArg) => {
  const { trail_id, trail_name, tags } = newTrailArg;

  const specificUserTrailsRef = doc(
    db,
    "user-trails",
    `${auth.currentUser?.uid}`
  );
  try {
    if (tags)
      await updateDoc(specificUserTrailsRef, { [`${trail_id}.tags`]: tags });
    if (trail_name)
      await updateDoc(specificUserTrailsRef, {
        [`${trail_id}.trail_name`]: trail_name,
      });
  } catch (err) {
    console.log(err);
  }
};

export const deleteSingleTrail = async (trailId: string) => {
  const specificUserTrailsRef = doc(
    db,
    "user-trails",
    `${auth.currentUser?.uid}`
  );
  try {
    await updateDoc(specificUserTrailsRef, { [`${trailId}`]: deleteField() });
  } catch (err) {
    console.log(err);
  }
};
export default createNewUser;
