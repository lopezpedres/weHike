import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signUp,
  useAuth,
} from "../../context/UserAuthProvider/UserAuthProvider";
import createNewUser from "../../firebase/firebaseQueries/firebaseQueries";
interface InterfaceCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}
const defaultValuesCredentials: InterfaceCredentials = {
  confirmPassword: "",
  email: "",
  password: "",
};
const SignUpForm = () => {
  const [credentials, setCredentials] = useState(defaultValuesCredentials);
  const { confirmPassword, email, password } = credentials;
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);
  const onClickHanlder = () => {
    navigate("/login");
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Form Verification here

    //If form verification true...
    try {
      const newUser = await signUp(email, password);
      if (newUser) {
        const newUserInDataBase = await createNewUser();
        if (newUserInDataBase) {
          navigate("/trails");
        }
      }
    } catch (err) {
      console.error(err);
    }
    //Create new user with the given credentials
    //Using the sigup function created in the authProvider
  };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
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
        <label className="font-semibold text-sm my-1">confirm password</label>
        <input
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => onChangeHandler(e)}
          className="rounded-md  mb-4 p-4 border-2 border-primary"
          placeholder="Enter your password"
        />
        <button className=" shadow-md font-semibold text-white text-lg mt-4 w-full p-4 bg-primary rounded-md">
          Sign Up
        </button>
      </form>
      <p className="flex justify-center pb-4">
        Have an account already?{" "}
        <span onClick={() => onClickHanlder()} className="text-primary ml-2">
          {"  "}Log in
        </span>
      </p>
    </section>
  );
};

export default SignUpForm;
