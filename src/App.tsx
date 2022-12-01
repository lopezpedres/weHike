import MyMap from "./components/Map/MyMap";
import ImageForm from "./components/ImageForm/ImageForm";
import UserContentProvider from "./context/UserContentProvider/UserContentProvider";
import LogIn from "./pages/auth/LogIn";
import { addDoc, collection, GeoPoint } from "firebase/firestore";
import { db, auth } from "./firebase/firebaseConfig";
import createNewUser, {
  addCustomTrail,
  addUserTrail,
  deleteSingleTrail,
  updateUserTrails,
} from "./firebase/firebaseQueries/firebaseQueries";
function App() {
  const start_trail = new GeoPoint(49, -120);
  return (
    <UserContentProvider>
      <LogIn />
      {/* <MyMap /> */}
      <div>
        <button onClick={() => createNewUser()}>createNewUser</button>
        <br />
        <button
          onClick={() =>
            addUserTrail({
              trail_id: "33",
              trail_name: "Ahora tambien",
              tags: ["fav", "done", "planning"],
            })
          }
        >
          AddTrail
        </button>
        <br />
        <button
          onClick={() =>
            updateUserTrails({
              trail_id: "910111213",
              trail_name: "otro brother",
              tags: ["fav", "done", "plan", "sisepuede"],
            })
          }
        >
          UpdateTrail
        </button>
        <br />
        <button onClick={() => deleteSingleTrail("910111213")}>
          Delete Single Trail
        </button>
        <br />
        <button
          onClick={() =>
            addCustomTrail({
              trail_end: start_trail,
              trail_start: start_trail,
              trail_name: "Name",
            })
          }
        >
          Add Custome Trail
        </button>
      </div>
    </UserContentProvider>
  );
}

export default App;
