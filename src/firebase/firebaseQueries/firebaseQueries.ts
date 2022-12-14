import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteField,
  serverTimestamp,
  collection,
  addDoc,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import InterfaceNewTrailArg, {
  InterfaceImagesSingleTrail,
  InterfaceNewCustomTrail,
  InterfaceNewCustomTrailArgs,
  InterfaceNewImageToTrailArgs,
  InterfaceNewNoteToTrailArgs,
  InterfaceNewUserTrail,
  InterfaceNotesSingleTrail,
} from "./typesFirebaseQueries";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  UploadMetadata,
} from "firebase/storage";
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
      await setDoc(userMetaRef, newUser);
      return true;
    } else {
      console.log("User exists already");
      return false;
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
  const {
    trail_id,
    trail_name,
    tags,
    custom_id,
    trail_center,
    sac_scale,
    elevation_gain,
    max_elevation,
    distance,
  } = newTrailArg;
  console.log(custom_id);
  const newTrailObject = {} as InterfaceNewUserTrail;
  const images_id = uuidv4();
  const notes_id = uuidv4();
  newTrailObject[trail_id] = {
    trail_id,
    trail_name,
    custom_id: custom_id ? custom_id : null,
    tags,
    images_id,
    notes_id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    trail_center,
    sac_scale: sac_scale ? sac_scale : "",
    elevation_gain: elevation_gain ? elevation_gain : 0,
    max_elevation: max_elevation ? max_elevation : 0,
    distance: distance ? distance : 0,
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
/**
 * Adds a custome trail under the user's uid label
 */
export const addCustomTrail = async (
  newCustomTrailArgs: InterfaceNewCustomTrailArgs
) => {
  const {
    trail_end,
    trail_name,
    trail_start,
    trail_geometry,
    trail_max_altitude,
    trail_center,
  } = newCustomTrailArgs;
  const newCustomTrailObject = {} as InterfaceNewCustomTrail;
  const trail_id = uuidv4();
  newCustomTrailObject[trail_id] = {
    trail_id,
    trail_name,
    trail_start,
    trail_end,
    trail_max_altitude,
    trail_center,
    trail_geometry: trail_geometry ? trail_geometry : null,
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
      tags: { planning: true, custom: true },
      elevation_gain: trail_max_altitude,
      trail_center,
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

export const addImageToTrail = async (
  trailImageArg: InterfaceNewImageToTrailArgs
) => {
  const {
    image_description,
    image_name,
    image_point,
    image_url,
    trail_images_id,
  } = trailImageArg;
  const newSingleImageObject = {} as InterfaceImagesSingleTrail;
  const singleImageObjectId = uuidv4();
  newSingleImageObject[singleImageObjectId] = {
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    image_description,
    image_name,
    image_point,
    image_url,
    image_id: singleImageObjectId,
  };

  const AllImagesSingleTrailRef = doc(db, "images-trail", `${trail_images_id}`);

  try {
    await setDoc(AllImagesSingleTrailRef, newSingleImageObject, {
      merge: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addNoteToTrail = async (
  trailNoteArg: InterfaceNewNoteToTrailArgs
) => {
  const { note_content, note_title, note_point, trail_notes_id } = trailNoteArg;
  const newSingleNoteObject = {} as InterfaceNotesSingleTrail;
  const singleNoteObjectId = uuidv4();
  newSingleNoteObject[singleNoteObjectId] = {
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    note_id: singleNoteObjectId,
    note_content,
    note_title,
    note_point,
    trail_notes_id,
  };

  const AllImagesSingleTrailRef = doc(db, "notes-trail", `${trail_notes_id}`);

  try {
    await setDoc(AllImagesSingleTrailRef, newSingleNoteObject, {
      merge: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const postImageTrail = async (file: File) => {
  const storage = getStorage();
  const storageRef = ref(
    storage,
    `images/${auth.currentUser?.uid}` + file.name
  );
  if (file !== null || file !== undefined) {
    try {
      const snapshot = await uploadBytesResumable(
        storageRef,
        file,
        file.type as UploadMetadata
      );
      console.log("An image has been uploaded" + snapshot.metadata);
      const urlImage = getDownloadURL(snapshot.ref);
      return urlImage;
    } catch (e) {
      console.log(e);
    }
  }
};
