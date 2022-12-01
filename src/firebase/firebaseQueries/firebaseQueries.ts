import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteField,
  serverTimestamp,
  GeoPoint,
  collection,
  addDoc,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import InterfaceNewTrailArg, {
  InterfaceNewCustomTrail,
  InterfaceNewCustomTrailArgs,
  InterfaceNewImageToTrailArgs,
  InterfaceNewUserTrail,
} from "./typesFirebaseQueries";
/**
 * Creates a new user in Firebase
 * @returns
 */
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
/**
 * Adds a new trail under the user's uid label
 * @param newTrailArg
 */
export const addUserTrail = async (newTrailArg: InterfaceNewTrailArg) => {
  const { trail_id, trail_name, tags, custom_id } = newTrailArg;
  console.log(custom_id);
  const newTrailObject = {} as InterfaceNewUserTrail;
  const images_id = uuidv4(); //!Need to create an image doc that matches this id
  newTrailObject[trail_id] = {
    trail_name,
    custom_id: custom_id ? custom_id : null,
    tags,
    images_id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  // if (custom_id) {
  //   newTrailObject.trail_id.custom_id = custom_id;
  //   console.log("there is a custome Id", newTrailObject);
  // }

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
/**
 * Adds a custome trail under the user's uid label
 */
export const addCustomTrail = async (
  newCustomTrailArgs: InterfaceNewCustomTrailArgs
) => {
  const { trail_end, trail_name, trail_start } = newCustomTrailArgs;
  const newCustomTrailObject = {} as InterfaceNewCustomTrail;
  const trail_id = uuidv4();
  newCustomTrailObject[trail_id] = {
    trail_name,
    trail_start,
    trail_end,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const specificUserTrailsRef = collection(db, "custom-trails");
  try {
    const { id } = await addDoc(specificUserTrailsRef, newCustomTrailObject);
    await addUserTrail({
      trail_id,
      trail_name,
      custom_id: id,
      tags: { planning: true },
    });
  } catch (err) {
    console.log(err);
  }
};
/**
 * Updates specific files inside the uid user's label
 * @param newTrailArg
 */
export const updateUserTrails = async (newTrailArg: InterfaceNewTrailArg) => {
  const { trail_id, trail_name, tags } = newTrailArg;

  const specificUserTrailsRef = doc(
    db,
    "user-trails",
    `${auth.currentUser?.uid}`
  );
  try {
    if (tags)
      //!When updating the tags name, i need to make sure I am passing the tags that i had before
      await updateDoc(specificUserTrailsRef, { [`${trail_id}.tags`]: tags });
    if (trail_name)
      await updateDoc(specificUserTrailsRef, {
        [`${trail_id}.trail_name`]: trail_name,
      });
  } catch (err) {
    console.log(err);
  }
};
/**
 * Deletes Trail of user
 * @param trailId
 */
//!Most delete all the data related to that specific trailId in for:
//!user-trails,custom-trail,notes-trails,images-trails

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

// export const addImageToTrail = (trailImageArg:InterfaceNewImageToTrailArgs) => {
//   const { trail_id, image_description, image_name,image_point } = trailImageArg;
//   const newTrailObject = {} as InterfaceNewUserTrail;
//   newTrailObject[trail_id] = {
//     trail_name,
//     tags,
//     createdAt: serverTimestamp(),
//     updatedAt: serverTimestamp(),
//   };
//   const specificUserTrailsRef = doc(
//     db,
//     "user-trails",
//     `${auth.currentUser?.uid}`
//   );

//   try {
//     await setDoc(specificUserTrailsRef, newTrailObject, { merge: true });
//   } catch (err) {
//     console.log(err);
//   }
// };
