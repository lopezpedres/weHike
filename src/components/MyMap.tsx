import Map, { Layer, SkyLayer, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import skyLayer from "../Layers/skyLayer";
import getRouteLayer from "../Layers/routeLayer";
import getRoute from "../utils/getRoute";

const start = [-123.01484612998101, 49.95358547262097];
const MAP_BOX_TOKEN = import.meta.env.VITE_MAPBOX_API_KEY;

const MyMap = () => {
  const [viewState, setViewState] = useState({
    latitude: 49.95358547262097,
    longitude: -123.01484612998101,
    zoom: 14,
  });
  const [geojson, getGeojson] = useState<GeoJSON.Feature | undefined>();

  useEffect(() => {
    const gettingRoute = async () => {
      const geojsonResponse = await getRoute(start, start);
      getGeojson(geojsonResponse);
    };
  });
  //Layers to add
  const routeLayer = getRouteLayer(geojson);
  //On load Functions
  const setDirections = () => {};
  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: 800, height: 600 }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAP_BOX_TOKEN}
      terrain={{ source: "mapbox-dem", exaggeration: 2 }}
      maxPitch={85}
      onLoad={() => {
        setDirections();
      }}
    >
      //Source is not for Layers, is for this type of examples
      <Source
        id="mapbox-dem"
        type="raster-dem"
        url="mapbox://mapbox.mapbox-terrain-dem-v1"
      />
      <Layer {...skyLayer} />
      <Layer {...routeLayer} />
    </Map>
  );
};

export default MyMap;
