import React, { useEffect } from "react";
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
  // const [user,setUser]=useState<>(null)
  const [state, dispatch] = useReducer(userContentReducer, defaultState);

  const getUserContent = () => {
    const userContentRef = collection(db, "users-content");
    const userTrailsRef = collection(db, "user-trails");
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(userTrailsRef, where("uid", "==", user.uid));
        console.log(user.uid);

        onSnapshot(q, (querySnapshot) => {
          const allDocs = querySnapshot.docs.map((doc) => doc.data());
          console.log(allDocs);
          /**
           * This returns the doc of the query and changes the state of the dispatch
           */
          // const { pass } = querySnapshot.docs[0].data(); //How can I assign string type to pass?
          // dispatch({ type: "CHANGE-PASSWORD", payload: pass });
        });
      }
    });
  };
  useEffect(() => {
    getUserContent();
    return () => getUserContent();
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
