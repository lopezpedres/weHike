import MyMap from "./components/Map/MyMap";
import ImageForm from "./components/ImageForm/ImageForm";
import UserContentProvider from "./context/UserContentProvider/UserContentProvider";
import LogIn from "./pages/auth/LogIn";
import { addDoc, collection, GeoPoint } from "firebase/firestore";
import { db, auth } from "./firebase/firebaseConfig";
import createNewUser, {
  addCustomTrail,
  addImageToTrail,
  addUserTrail,
  deleteSingleTrail,
  updateUserTrails,
} from "./firebase/firebaseQueries/firebaseQueries";
import { start } from "repl";
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
              trail_id: "01",
              trail_name: "Ahora tambien",
              tags: { custom: true, planning: true },
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
              tags: { custom: true, planning: false, done: true },
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
        <br />
        <button
          onClick={() =>
            addImageToTrail({
              trail_images_id: "06a5c3ca-dfa4-438f-a117-68a2a23c5e7b",
              image_description: "something2",
              image_name: "image2",
              image_point: start_trail,
              image_url: "www.image.co2222",
            })
          }
        >
          Add Image to Trail
        </button>
      </div>
    </UserContentProvider>
  );
}

export default App;
