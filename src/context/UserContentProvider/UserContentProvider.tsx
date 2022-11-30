import React, { useEffect, useState } from "react";
import { useReducer, createContext, Dispatch } from "react";
import userContentReducer from "./UserContentReducer";
import type { State, Action } from "./UserContentTypes";
import { db, auth } from "../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, where, query, onSnapshot } from "firebase/firestore";
interface LayoutProps {
  children: React.ReactNode;
}

const defaultState: State = {} as State;
const userContentState = createContext(defaultState);
const userContentDispatch = createContext((() => {}) as Dispatch<Action>);
const UserContentProvider = ({ children }: LayoutProps) => {
  const [state, dispatch] = useReducer(userContentReducer, defaultState);
  const [userTrails, setUserTrails] = useState<any>(null);
  const userContentRef = collection(db, "users-content");
  const userTrailsRef = collection(db, "user-trails");
  useEffect(() => {
    const onAuthChange = onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(userTrailsRef, where("uid", "==", user.uid));
        onSnapshot(q, (querySnapshot) => {
          const allDocs = querySnapshot.docs.map((doc) => doc.data());
          console.log(allDocs);
          setUserTrails(allDocs);
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
