import "../data.css";
import Map, {
  CircleLayer,
  NavigationControl,
  Layer,
  MapLayerMouseEvent,
  MapRef,
  Source,
  GeolocateControl,
  FullscreenControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useState } from "react";
import skyLayer from "../Layers/skyLayer";
import routeLayer from "../Layers/routeLayer";
import getRoute from "../utils/getRoute";
import { Feature, FeatureCollection, Position } from "geojson";
import startLayer from "../Layers/startLayer";
import BoundingBox from "./BoundingBox";

const start: Position = [-123.01484612998101, 49.95358547262097];
const MAP_BOX_TOKEN = import.meta.env.VITE_MAPBOX_API_KEY;

const MyMap = () => {
  const mapRef = useRef<MapRef | null>(null);
  const defaultViewState = {
    latitude: 49.95358547262097,
    longitude: -123.01484612998101,
    zoom: 14,
  };
  const [viewState, setViewState] = useState(defaultViewState);

  const [geojsonRouteSource, setGeojsonRouteSource] = useState<Feature | null>(
    null
  );

  //Layers to add
  const circleLayer = startLayer(start) as CircleLayer;
  const circleSource: FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: start,
        },
      },
    ],
  };
  //On load Functions
  const setDirections = () => {};
  const displayRoute = async (e: MapLayerMouseEvent) => {
    const lng = e.lngLat.lng;
    const lat = e.lngLat.lat;
    const geojsonResponse = await getRoute(start, [lng, lat]);
    if (geojsonResponse) {
      setGeojsonRouteSource(geojsonResponse);
    }
  };

  return (
    <div>
      <div>
        <Map
          {...viewState}
          ref={mapRef}
          onClick={(e) => displayRoute(e)}
          onMove={(evt) => setViewState(evt.viewState)}
          style={{ width: "100vw", height: "100vh" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={MAP_BOX_TOKEN}
          terrain={{ source: "mapbox-dem", exaggeration: 2 }}
          maxPitch={85}
        >
          <Source
            id="mapbox-dem"
            type="raster-dem"
            url="mapbox://mapbox.mapbox-terrain-dem-v1"
          />
          <Layer {...skyLayer} />

          {geojsonRouteSource && (
            <Source id="current-route" type="geojson" data={geojsonRouteSource}>
              <Layer {...routeLayer} />
            </Source>
          )}
          <Source id="data" type="geojson" data={circleSource}>
            <Layer {...circleLayer} />
          </Source>
          <NavigationControl />
          <GeolocateControl />
          <FullscreenControl />
          <BoundingBox viewState={viewState} mapRef={mapRef} />
        </Map>
      </div>
    </div>
  );
};

export default MyMap;
