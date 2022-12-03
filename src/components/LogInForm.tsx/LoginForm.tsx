import React from "react";
import googleLogo from "../../assets/logos/google_logo.png";
import facebookLogo from "../../assets/logos/facebook_logo.png";
import github from "../../assets/logos/github_logo.png";
import mtn from "../../assets/images/mtn.jpg";

interface Props {
  logInWithGoogle: () => void;
}

const LoginForm = ({ logInWithGoogle }: Props) => {
  return (
    <main>
      {/* <div className="bg-hero-login"></div> */}
      <img className="w-full bg-cover" src={mtn} />
      <section className="mx-4 mt-11">
        <form className="flex flex-col">
          <label className="font-semibold text-sm my-1">email</label>
          <input
            className="rounded-md mb-4 p-4 border-2 border-primary"
            placeholder="Enter your email"
          />
          <label className="font-semibold text-sm my-1">password</label>
          <input
            className="rounded-md  mb-4 p-4 border-2 border-primary"
            placeholder="Enter your password"
          />
          <button className=" font-semibold text-white text-lg my-4 w-full p-4 bg-primary rounded-md">
            Submit
          </button>
        </form>
        <article>
          <section>
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
          </section>
        </article>
      </section>
    </main>
  );
};

export default LoginForm;
