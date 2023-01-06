import Map, {
  CircleLayer,
  NavigationControl,
  Layer,
  MapLayerMouseEvent,
  MapRef,
  Source,
  GeolocateControl,
} from "react-map-gl";
import { useNavigate } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import { useContext, useRef, useState } from "react";
import skyLayer from "../../Layers/skyLayer";
import chevronLeft from "/assets/icons/chevron-left.svg";
import { userContentState } from "../../context/UserContentProvider/UserContentProvider";
import AddIcon from "../AddIcon/AddIcon";
import { addUserTrail } from "../../firebase/firebaseQueries/firebaseQueries";
import { GeoPoint } from "firebase/firestore";
interface Props {
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}
const TrailMap = ({ setShowMap }: Props) => {
  const MAP_BOX_TOKEN = import.meta.env.VITE_MAPBOX_API_KEY;
  const [displayOptions, setDisplayOptions] = useState(false);
  const [success, setSucess] = useState(false);

  const { selectedtrailDetails } = useContext(userContentState);
  const { trailName, trailCenter, trailId, sac_scale } = selectedtrailDetails;
  const navigate = useNavigate();
  const defaultLat = 49.246292;
  const defaultLng = -123.116226;
  const latitude = trailCenter ? trailCenter.latitude : defaultLat;
  const longitude = trailCenter ? trailCenter.longitude : defaultLng;
  const defaultViewState = {
    latitude: latitude,
    longitude: longitude,
    zoom: 10,
  };
  const mapRef = useRef<MapRef | null>(null);
  const [viewState, setViewState] = useState(defaultViewState);
  const onLoadHandler = (target: mapboxgl.Map) => {
    target.flyTo({ center: { lat: latitude, lng: longitude }, zoom: 15 });
    target.setFilter("updated_trails", [
      "all",
      ["match", ["get", "name"], [trailName], true, false],
    ]);
  };
  const addTrailHandler = async () => {
    const splitedId = trailId?.split("/")[1];
    if (trailCenter && splitedId) {
      try {
        const centerGeoPoint = trailCenter;
        await addUserTrail({
          trail_id: splitedId,
          trail_name: trailName,
          trail_center: centerGeoPoint,
          tags: {
            planning: true,
          },
          sac_scale,
          distance: 1,
          elevation_gain: 1,
          max_elevation: 1,
        });
        setDisplayOptions(false);
        setSucess(true);
        setTimeout(() => setSucess(false), 2000);
      } catch (error) {}
    }
  };
  return (
    <div className="fixed">
      <Map
        {...viewState}
        id="myMap"
        ref={mapRef}
        onMove={({ viewState }) => setViewState(viewState)}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/lopezpedres/claprud1h002i15o6cuq5tg54"
        mapboxAccessToken={MAP_BOX_TOKEN}
        terrain={{ source: "mapbox-dem", exaggeration: 2 }}
        maxPitch={85}
        onRender={(event) => event.target.resize()}
        onLoad={({ target }) => onLoadHandler(target)}
      >
        <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
        />
        <div
          onClick={() => setShowMap(false)}
          className="p-2 rounded-full absolute bg-white top-4 left-4"
        >
          <img className="w-6" src={chevronLeft} />
        </div>
        <Layer {...skyLayer} />
        <NavigationControl />
        <GeolocateControl />
        <div
          onClick={() => setDisplayOptions(!displayOptions)}
          className="absolute w-12 bottom-10 right-2"
        >
          <AddIcon />
        </div>
        {displayOptions && (
          <article className="absolute p-10 shadow-md max-w-xs w-10/12 text-xl font-semibold  bg-white rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <button
              onClick={() => addTrailHandler()}
              className="w-full border-2 shadow-md hover:bg-primary rounded-md py-4 my-4 border-[black]"
            >
              Save Trail
            </button>
          </article>
        )}
        {success && (
          <article className="absolute p-10 shadow-md max-w-xs w-10/12 text-xl font-semibold  bg-white rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <h1 className="text-center">Trail Added!</h1>
          </article>
        )}
      </Map>
    </div>
  );
};

export default TrailMap;
