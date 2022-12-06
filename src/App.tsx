import App2 from "./App2";
import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./pages/auth/LogIn";
import Home from "./pages/Home/Home";
import MyMap from "./components/Map/MyMap";
import { MapProvider } from "react-map-gl";
import MapNavigate from "./pages/MapNavigate/MapNavigate";
import GlobalMap from "./components/GlobalMap/GlobalMap";
import UserContentProvider from "./context/UserContentProvider/UserContentProvider";
import TrailDetailsPage from "./pages/TrailDetailsPage/TrailDetailsPage";

const App = () => {
  return (
    <UserContentProvider>
      <GlobalMap />
      <Routes>
        <Route path="/" element={<Navigate replace to={"/trails"} />} />
        <Route path="trails">
          <Route index element={<Home />} />
          <Route path=":trailsName" element={<TrailDetailsPage />} />
        </Route>
        <Route path="login" element={<LogIn />} />
        <Route path="navigate" element={<MapNavigate />} />
      </Routes>
    </UserContentProvider>
  );
};

export default App;
