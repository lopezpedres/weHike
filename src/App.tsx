import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import MapNavigate from "./pages/MapNavigate/MapNavigate";
import GlobalMap from "./components/GlobalMap/GlobalMap";
import UserContentProvider from "./context/UserContentProvider/UserContentProvider";
import TrailDetailsPage from "./pages/TrailDetailsPage/TrailDetailsPage";
import MyTrails from "./components/MyTrailsItem/MyTrailsItem";
import Profile from "./pages/Profile/Profile";
import SignUp from "./pages/SignUp/SignUp";
import { useAuth } from "./context/UserAuthProvider/UserAuthProvider";
import PrivateRoutes from "./Routes/PrivateRoutes";
import MyTrailsPage from "./pages/MyTrailsPage/MyTrailsPage";
import MyTrailDetailsPage from "./pages/MyTrailDetailsPage/MyTrailDetailsPage";

const App = () => {
  const { currentUser } = useAuth();
  return (
    <div className="scrollbar-hide">
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
              <Route index element={<MyTrailsPage />} />
              <Route path=":trailsName" element={<MyTrailDetailsPage />} />
            </Route>
            <Route path="profile" element={<Profile />} />
            <Route path="navigate" element={<MapNavigate />} />
          </Route>
        </Routes>
      </UserContentProvider>
    </div>
  );
};

export default App;
