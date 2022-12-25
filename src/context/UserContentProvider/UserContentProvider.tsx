import React, { useEffect, useState } from "react";
import { useReducer, createContext, Dispatch } from "react";
import userContentReducer from "./UserContentReducer";
import type { State, Action } from "./UserContentTypes";
import { db, auth } from "../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, where, query, onSnapshot, doc } from "firebase/firestore";
interface LayoutProps {
  children: React.ReactNode;
}
export interface userMeta {
  updatedAt: CreatedAtOrUpdatedAt;
  createdAt: CreatedAtOrUpdatedAt;
  email: string;
  name: string;
  avatar_url: string;
}
export interface CreatedAtOrUpdatedAt {
  seconds: number;
  nanoseconds: number;
}

const defaultState: State = {} as State;
const userContentState = createContext(defaultState);
const userContentDispatch = createContext((() => {}) as Dispatch<Action>);
const UserContentProvider = ({ children }: LayoutProps) => {
  const [state, dispatch] = useReducer(userContentReducer, defaultState);
  useEffect(() => {
    const onAuthChange = onAuthStateChanged(auth, (user) => {
      const userContentRef = doc(db, "user-meta", `${user?.uid}`);
      const userTrailsRef = doc(db, "user-trails", `${user?.uid}`);
      if (user) {
        //Need to call all my snapshots like getUserMeta
        ///I can create a file with all my snapshots and then just
        //call them here, to make it more organized

        const getUserMeta = () => {
          const userMetaSnap = onSnapshot(userContentRef, (querySnapshot) => {
            const userMeta = querySnapshot.data();
            dispatch({ type: "SET-USER-META", payload: userMeta as userMeta });
            console.log(userMeta);
          });
          return userMetaSnap(); //Do I need to call this?
        };
        //Get User-Trails
        onSnapshot(userTrailsRef, (querySnapshot) => {
          const userTrails = querySnapshot.data();
          dispatch({ type: "SET-MY-TRAILS", payload: userTrails });
          console.log(userTrails);
        });
        //Call all my snapshots here
        getUserMeta();
      }
    });
    return onAuthChange;
  }, []);

  return (
    <userContentState.Provider value={state}>
      <userContentDispatch.Provider value={dispatch}>
        {children}
      </userContentDispatch.Provider>
    </userContentState.Provider>
  );
};

export default UserContentProvider;
export { userContentState, userContentDispatch };
