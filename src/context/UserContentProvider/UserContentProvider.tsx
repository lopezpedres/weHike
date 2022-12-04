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
const defaultState: State = {} as State;
const userContentState = createContext(defaultState);
const userContentDispatch = createContext((() => {}) as Dispatch<Action>);
const UserContentProvider = ({ children }: LayoutProps) => {
  const [state, dispatch] = useReducer(userContentReducer, defaultState);
  const [userTrails, setUserTrails] = useState<any>(null);
  useEffect(() => {
    const onAuthChange = onAuthStateChanged(auth, (user) => {
      const userContentRef = doc(db, "user-meta", `${user?.uid}`);
      const userTrailsRef = doc(db, "user-trails", `${user?.uid}`);
      if (user) {
        //Get User-Meta
        onSnapshot(userContentRef, (querySnapshot) => {
          const userMeta = querySnapshot.data();

          console.log(userMeta);
        });
        //Get User-Trails
        onSnapshot(userTrailsRef, (querySnapshot) => {
          const userTrails = querySnapshot.data();
          console.log(userTrails);
        });
      }
    });
    return () => onAuthChange();
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
