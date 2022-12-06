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
interface Props {
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}
const TrailMap = ({ setShowMap }: Props) => {
  const MAP_BOX_TOKEN = import.meta.env.VITE_MAPBOX_API_KEY;
  const { selectedtrailDetails } = useContext(userContentState);
  const { trailName, trailCenter } = selectedtrailDetails;
  const navigate = useNavigate();
  const defaultLat = 49.246292;
  const defaultLng = -123.116226;
  const latitude = trailCenter ? trailCenter[1] : defaultLat;
  const longitude = trailCenter ? trailCenter[0] : defaultLng;
  const defaultViewState = {
    latitude: latitude,
    longitude: longitude,
    zoom: 10,
  };
  const mapRef = useRef<MapRef | null>(null);
  const [viewState, setViewState] = useState(defaultViewState);
  const onLoadHandler = (target: mapboxgl.Map) => {
    const width = 1000;
    const height = 1000;
    target.queryRenderedFeatures(
      [
        [longitude - width / 2, latitude - height / 2],
        [longitude + width / 2, latitude + height / 2],
      ],
      {
        layers: ["updated_trails"],
        filter: [
          "all",
          ["match", ["get", "name"], [`${trailName}`], true, false],
        ],
      }
    );
    target.flyTo({ center: { lat: latitude, lng: longitude }, zoom: 15 });
  };
  return (
    <div className="fixed">
      <Map
        {...viewState}
        id="myMap"
        ref={mapRef}
        onMove={({ viewState }) => setViewState(viewState)}
        style={{ width: "100vw", height: "91vh" }}
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
      </Map>
    </div>
  );
};

export default TrailMap;
