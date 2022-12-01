import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteField,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import InterfaceNewTrailArg, {
  InterfaceNewUserTrail,
} from "./typesFirebaseQueries";

const createNewUser = async () => {
  const userMetaRef = doc(db, "user-meta", String(auth.currentUser?.uid));
  try {
    const docSnap = await getDoc(userMetaRef);
    if (!docSnap.exists()) {
      console.log("Creating User");
      const newUser = {
        createdAt: serverTimestamp(),
        email: auth.currentUser?.email,
        name: auth.currentUser?.displayName,
        updatedAt: serverTimestamp(),
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

export const addUserTrail = async (newTrailArg: InterfaceNewTrailArg) => {
  const { trail_id, trail_name, tags } = newTrailArg;
  const newTrailObject = {} as InterfaceNewUserTrail;
  newTrailObject[trail_id] = {
    trail_name,
    tags,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
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
