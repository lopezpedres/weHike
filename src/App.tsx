import App2 from "./App2";
import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import MapNavigate from "./pages/MapNavigate/MapNavigate";
import GlobalMap from "./components/GlobalMap/GlobalMap";
import UserContentProvider from "./context/UserContentProvider/UserContentProvider";
import TrailDetailsPage from "./pages/TrailDetailsPage/TrailDetailsPage";
import { auth } from "./firebase/firebaseConfig";
import LandingPage from "./pages/LandingPage/LandingPage";
import MyTrails from "./components/MyTrails/MyTrails";
import Profile from "./pages/Profile/Profile";
import SignUp from "./pages/SignUp/SignUp";
import { useAuth } from "./context/UserAuthProvider/UserAuthProvider";

const App = () => {
  const { currentUser } = useAuth();
  return (
    <UserContentProvider>
      <GlobalMap />
      <Routes>
        <Route
          path="/"
          element={
            currentUser ? (
              <Navigate to={"trails"} />
            ) : (
              <Navigate to={"signup"} />
            )
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="trails">
          <Route index element={<Home />} />
          <Route path=":trailsName" element={<TrailDetailsPage />} />
        </Route>
        <Route path="my-trails">
          <Route index element={<MyTrails />} />
          <Route path=":trailsName" element={<TrailDetailsPage />} />
        </Route>
        <Route path="profile" element={<Profile />} />
        <Route
          path="login"
          element={currentUser?.uid ? <Navigate to={"/trails"} /> : <LogIn />}
        />
        <Route path="navigate" element={<MapNavigate />} />
      </Routes>
    </UserContentProvider>
  );
};

export default App;
