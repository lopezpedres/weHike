import App2 from "./App2";
import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/auth/LogIn";
import Home from "./pages/Home/Home";
import MyMap from "./components/Map/MyMap";
import { MapProvider } from "react-map-gl";
import MapNavigate from "./pages/MapNavigate/MapNavigate";
import GlobalMap from "./components/GlobalMap/GlobalMap";
import UserContentProvider from "./context/UserContentProvider/UserContentProvider";

const App = () => {
  return (
    <UserContentProvider>
      <GlobalMap />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/navigate" element={<MapNavigate />} />
      </Routes>
    </UserContentProvider>
  );
};

export default App;
