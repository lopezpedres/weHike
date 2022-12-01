import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
// import { userContentDispatch } from "../../context/UserContentProvider/UserContentProvider";
import { auth } from "../../firebase/firebaseConfig";

const LogIn = () => {
  const [activeUser, setActiveUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setActiveUser(user);
      }
    });
  }, []);

  const logInHanlder = () => {
    const provider = new GoogleAuthProvider();
    try {
      signInWithPopup(auth, provider);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setActiveUser(user);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const logOutHanlder = () => {
    signOut(auth);
    setActiveUser(null);
  };
  return (
    <>
      {activeUser ? (
        <>
          <button onClick={() => logOutHanlder()}>LogOut</button>
          <p>{activeUser.displayName}</p>
        </>
      ) : (
        <button onClick={() => logInHanlder()}>LogIn</button>
      )}
    </>
  );
};

export default LogIn;
