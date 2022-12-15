import { useEffect, useState } from "react";
import LoginForm from "../../components/LogInForm.tsx/LoginForm";
import VideoBackground from "../../components/VideoBackground/VideoBackground";
import {
  logInWithGoogle,
  useAuth,
} from "../../context/UserAuthProvider/UserAuthProvider";
import { useNavigate } from "react-router-dom";
import loadingGift from "/assets/images/loading.gif";

const LogIn = () => {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    if (currentUser) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {!loading && (
        <VideoBackground>
          <LoginForm
            setLoading={setLoading}
            logInWithGoogle={logInWithGoogle}
          />
        </VideoBackground>
      )}
      {loading && (
        <div className="absolute top-1/2 -translate-y-1/2">
          <img alt="loading" src={loadingGift} />
          <h1 className="text-xl text-center">Loading ...</h1>
        </div>
      )}
    </>
  );
};

export default LogIn;
