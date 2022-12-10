import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  User,
} from "firebase/auth";
import React, { useContext, createContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebaseConfig";

interface InterfaceAuth {
  currentUser: User | null;
}

interface Props {
  children: React.ReactNode;
}

const defaultState = {} as InterfaceAuth;
const AuthContext = createContext(defaultState);
const useAuth = () => {
  return useContext(AuthContext);
};
const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
const logout = async () => {
  const isOut = await signOut(auth);
};
const logInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithRedirect(auth, provider);
};

const UserAuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubs = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return unsubs;
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export { useAuth, signUp, login, logInWithGoogle, logout };
export default UserAuthProvider;
