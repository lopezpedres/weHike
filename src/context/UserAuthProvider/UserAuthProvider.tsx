import React, { useContext } from "react";
import { createContext } from "vm";

interface Props {
  children: React.ReactNode;
}
const UserAuthProvider = ({ children }: Props) => {
  //!NEED TO CREATE THE TYPES FOR THIS
  const defaultState: any = {} as any;
  const AuthContext = createContext(defaultState);
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

export default UserAuthProvider;
