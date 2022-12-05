import MyMap from "../../components/Map/MyMap";
import { useMap } from "react-map-gl";
import Navbar from "../../components/navbar/Navbar";

const MapNavigate = () => {
  return (
    <>
      <div className="mb-80">
        <MyMap />
      </div>
      <Navbar activeNavbar={true} />
    </>
  );
};

export default MapNavigate;
