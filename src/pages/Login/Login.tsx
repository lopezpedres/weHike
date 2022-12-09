import LoginForm from "../../components/LogInForm.tsx/LoginForm";
import VideoBackground from "../../components/VideoBackground/VideoBackground";
import { logInWithGoogle } from "../../context/UserAuthProvider/UserAuthProvider";

const LogIn = () => {
  return (
    <VideoBackground>
      <LoginForm logInWithGoogle={logInWithGoogle} />
    </VideoBackground>
  );
};

export default LogIn;
