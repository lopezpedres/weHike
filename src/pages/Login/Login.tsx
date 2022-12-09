import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  User,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import LoginForm from "../../components/LogInForm.tsx/LoginForm";
// import { userContentDispatch } from "../../context/UserContentProvider/UserContentProvider";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import VideoBackground from "../../components/VideoBackground/VideoBackground";

const LogIn = () => {
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const onAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setActiveUser(user);
        console.log("there is user", user);
        // return navigate("/home");
      } else {
        console.log("there is no user");
      }
    });
    return () => onAuth();
  }, []);

  const logInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    try {
      signInWithRedirect(auth, provider);
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
        <button onClick={() => logInWithGoogle()}>LogIn</button>
      )}
      <VideoBackground>
        <LoginForm logInWithGoogle={logInWithGoogle} />
      </VideoBackground>
    </>
  );
};

export default LogIn;
