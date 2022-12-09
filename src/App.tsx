import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import MapNavigate from "./pages/MapNavigate/MapNavigate";
import GlobalMap from "./components/GlobalMap/GlobalMap";
import UserContentProvider from "./context/UserContentProvider/UserContentProvider";
import TrailDetailsPage from "./pages/TrailDetailsPage/TrailDetailsPage";
import MyTrails from "./components/MyTrails/MyTrails";
import Profile from "./pages/Profile/Profile";
import SignUp from "./pages/SignUp/SignUp";
import { useAuth } from "./context/UserAuthProvider/UserAuthProvider";
import PrivateRoutes from "./Routes/PrivateRoutes";

const App = () => {
  const { currentUser } = useAuth();
  return (
    <UserContentProvider>
      <GlobalMap />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="login"
          element={currentUser?.uid ? <Navigate to={"/trails"} /> : <LogIn />}
        />
        <Route element={<PrivateRoutes />}>
          <Route
            path="/"
            element={
              currentUser ? (
                <Navigate replace to={"trails"} />
              ) : (
                <Navigate to={"login"} />
              )
            }
          />
          <Route path="trails">
            <Route index element={<Home />} />
            <Route path=":trailsName" element={<TrailDetailsPage />} />
          </Route>
          <Route path="my-trails">
            <Route index element={<MyTrails />} />
            <Route path=":trailsName" element={<TrailDetailsPage />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="navigate" element={<MapNavigate />} />
        </Route>
      </Routes>
    </UserContentProvider>
  );
};

export default App;
