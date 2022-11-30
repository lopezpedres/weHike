import MyMap from "./components/Map/MyMap";
import ImageForm from "./components/ImageForm/ImageForm";
import UserContentProvider from "./context/UserContentProvider/UserContentProvider";
function App() {
  return (
    <UserContentProvider>
      <ImageForm />;
    </UserContentProvider>
  );
}

export default App;
