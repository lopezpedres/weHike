import MyMap from "./components/NavigateMap/NavigateMap";
import ImageForm from "./components/ImageForm/ImageForm";
import UserContentProvider from "./context/UserContentProvider/UserContentProvider";
import LogIn from "./pages/auth/LogIn";
import { addDoc, collection, GeoPoint } from "firebase/firestore";
import { db, auth } from "./firebase/firebaseConfig";
import createNewUser, {
  addCustomTrail,
  addImageToTrail,
  addNoteToTrail,
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
              trail_id: "01",
              trail_name: "Trail 1 Name",
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
              trail_id: "01",
              trail_name: "Trail 1 Updated Name",
              tags: { custom: true, planning: false, done: true },
            })
          }
        >
          UpdateTrail
        </button>
        <br />
        <button onClick={() => deleteSingleTrail("01")}>
          Delete Single Trail
        </button>
        <br />
        <button
          onClick={() =>
            addCustomTrail({
              trail_end: start_trail,
              trail_start: start_trail,
              trail_name: "Custom Trail",
            })
          }
        >
          Add Custome Trail
        </button>
        <br />
        <button
          onClick={() =>
            addImageToTrail({
              trail_images_id: "0d76ef41-245f-434f-8170-170bf31420d1",
              image_description: "something2",
              image_name: "image2",
              image_point: start_trail,
              image_url: "www.image.co2222",
            })
          }
        >
          Add Image to Trail
        </button>
        <button
          onClick={() =>
            addNoteToTrail({
              trail_notes_id: "838d5152-f3cd-4e72-96a4-58be58678a1a",
              note_title: "image2",
              note_point: start_trail,
              note_content: "Content",
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
