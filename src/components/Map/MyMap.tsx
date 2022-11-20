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
import skyLayer from "../../Layers/skyLayer";
import routeLayer from "../../Layers/routeLayer";
import getPointToPointRoute from "../../Sources/getPointToPointRoute";
import { Feature, FeatureCollection, Position } from "geojson";
import startLayer from "../../Layers/startLayer";
import BoundingBox from "../BoundingBox/BoundingBox";
import getStartPointPathRoute from "../../Sources/getStartPoinPathRoute";
import BboxButton from "../BboxButton/BboxButton";
import Options from "../options/Options";
import getBoundingBoxPoints from "../../utils/getBoundingBoxPoints";
import GeneralList from "../GeneralList/GeneralList";

interface bboxInterface {
  south: number;
  west: number;
  north: number;
  east: number;
}
const start: Position = [-123.01484612998101, 49.95358547262097];
const MAP_BOX_TOKEN = import.meta.env.VITE_MAPBOX_API_KEY;
const defaultViewState = {
  latitude: 49.95358547262097,
  longitude: -123.01484612998101,
  zoom: 14,
};
const MyMap = () => {
  const mapRef = useRef<MapRef | null>(null);
  const [viewState, setViewState] = useState(defaultViewState);
  const [geojsonRouteSource, setGeojsonRouteSource] = useState<Feature | null>(
    null
  );
  const [displayBbox, setDisplayBbox] = useState(true);
  const [currentBbox, setCurrentBbox] = useState<bboxInterface | null>(null);
  const [currentBboxPathNames, setCurrentBboxPathNames] = useState<
    string[] | null
  >();
  //Layers to add
  const startPointLayer = startLayer(start) as CircleLayer;
  const startPointSource = getStartPointPathRoute(start);

  //Todo:Need to move this to handlers
  const displayRoute = async (e: MapLayerMouseEvent) => {
    const lng = e.lngLat.lng;
    const lat = e.lngLat.lat;
    const poitToPointGeojsonRoute = await getPointToPointRoute(start, [
      lng,
      lat,
    ]);
    if (poitToPointGeojsonRoute) {
      setGeojsonRouteSource(poitToPointGeojsonRoute);
    }
  };
  return (
    <div>
      <Map
        {...viewState}
        ref={mapRef}
        onClick={(e) => displayRoute(e)}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100vw", height: "70vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAP_BOX_TOKEN}
        terrain={{ source: "mapbox-dem", exaggeration: 2 }}
        maxPitch={85}
        onRender={(event) => event.target.resize()}
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
        <Source id="data" type="geojson" data={startPointSource}>
          <Layer {...startPointLayer} />
        </Source>
        <NavigationControl />
        <GeolocateControl />
        {displayBbox && (
          <BoundingBox setCurrentBbox={setCurrentBbox} mapRef={mapRef} />
        )}
      </Map>
      <BboxButton
        activateButton={() => setDisplayBbox(!displayBbox)}
        displayBbox={displayBbox}
      />
      <Options
        currentBbox={currentBbox}
        setCurrentBboxPathNames={setCurrentBboxPathNames}
      />
      <GeneralList pathNames={currentBboxPathNames} />
    </div>
  );
};

export default MyMap;