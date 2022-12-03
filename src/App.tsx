import App2 from "./App2";
import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/auth/LogIn";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </div>
  );
};

export default App;
