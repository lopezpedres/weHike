import MyMap from "./components/Map/MyMap";
import ImageForm from "./components/ImageForm/ImageForm";
import UserContentProvider from "./context/UserContentProvider/UserContentProvider";
import LogIn from "./pages/auth/LogIn";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "./firebase/firebaseConfig";
import createNewUser, { addUserTrail } from "./firebase/firebaseQueries";
function App() {
  return (
    <UserContentProvider>
      {/* <LogIn /> */}
      {/* <MyMap /> */}
      <div>
        <button onClick={() => createNewUser()}>createNewUser</button>
        <br />
        <button
          onClick={() =>
            addUserTrail({
              trail_id: "12345678",
              trail_name: "Ahora tambien",
              tags: ["fav", "done", "planning"],
            })
          }
        >
          Trail?
        </button>
      </div>
    </UserContentProvider>
  );
}

export default App;
