import React, { useEffect } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.currentUser) {
      navigate("trails");
    } else {
      console.log("not");
    }
  }, [auth.currentUser]);
  return <div>LandingPage</div>;
};

export default LandingPage;
