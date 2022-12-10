import React, { useEffect, useState } from "react";
import googleLogo from "/assets/logos/google_logo.png";
import facebookLogo from "/assets/logos/facebook_logo.png";
import github from "/assets/logos/github_logo.png";
import { useNavigate } from "react-router-dom";
import {
  login,
  useAuth,
} from "../../context/UserAuthProvider/UserAuthProvider";

interface Props {
  logInWithGoogle: () => void;
}
interface InterfaceCredentials {
  email: string;
  password: string;
}
const defaultValuesCredentials: InterfaceCredentials = {
  email: "",
  password: "",
};
const LoginForm = ({ logInWithGoogle }: Props) => {
  const [credentials, setCredentials] = useState(defaultValuesCredentials);
  const { email, password } = credentials;
  const { currentUser } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);
  const onClickHanlder = () => {
    navigate("/signup");
  };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Form Verification here

    //If form verification true...
    try {
      const newUser = await login(email, password);
      if (newUser) {
        navigate("/trails");
      }
    } catch (err) {
      console.error(err);
    }
    //Create new user with the given credentials
    //Using the sigup function created in the authProvider
  };
  return (
    <main>
      <section>
        <form onSubmit={(e) => onSubmit(e)} className="flex flex-col p-4">
          <label className="font-semibold text-sm my-1">email</label>
          <input
            name="email"
            value={email}
            onChange={(e) => onChangeHandler(e)}
            className="rounded-md mb-4 p-4 border-2 border-primary"
            placeholder="Enter your email"
          />
          <label className="font-semibold text-sm my-1">password</label>
          <input
            name="password"
            value={password}
            onChange={(e) => onChangeHandler(e)}
            className="rounded-md  mb-4 p-4 border-2 border-primary"
            placeholder="Enter your password"
          />
          <button className=" shadow-md font-semibold text-white text-lg my-4 w-full p-4 bg-primary rounded-md">
            Login
          </button>
        </form>
        <article>
          <span className="flex justify-center">or</span>
          <div className="flex justify-center">
            <img
              onClick={() => logInWithGoogle()}
              className="w-10 m-4"
              src={googleLogo}
              alt="Google Logo"
            />
            <img className="w-10 m-4" src={facebookLogo} alt="Google Logo" />
            <img className="w-10 m-4" src={github} alt="Google Logo" />
          </div>
          <p className="flex justify-center py-1">
            No account?{" "}
            <span
              onClick={() => onClickHanlder()}
              className="text-primary ml-4"
            >
              Sign up
            </span>
          </p>
        </article>
      </section>
    </main>
  );
};

export default LoginForm;
