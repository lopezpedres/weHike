import Map, {
  CircleLayer,
  NavigationControl,
  Layer,
  MapLayerMouseEvent,
  MapRef,
  Source,
  GeolocateControl,
  FullscreenControl,
  GeolocateControlRef,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
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
import { userContentState } from "../../context/UserContentProvider/UserContentProvider";
import AddIcon from "../AddIcon/AddIcon";
import { addCustomTrail } from "../../firebase/firebaseQueries/firebaseQueries";
import { GeoPoint } from "firebase/firestore";
import getMaxAltitude from "../../utils/getMaxAltitude";
import StartPointCustomTrail from "../StartPointCustomTrail/StartPointCustomTrail";
import EndPointCustomTrail from "../EndPointCustomTrail/EndPointCustomTrail";

interface customPoints {
  start: Position | undefined;
  end: Position | undefined;
  name?: string;
}
// const start: Position = [-123.01484612998101, 49.95358547262097]; lng,lat
const MAP_BOX_TOKEN = import.meta.env.VITE_MAPBOX_API_KEY;
const NavigateMap = () => {
  // const { userCurrentLocation } = useContext(userContentState);
  // const coordinates = userCurrentLocation?.coords;
  // let lat = coordinates?.latitude;
  // let lng = coordinates?.longitude;
  const lat = 49.246292;
  const lng = -123.116226;
  const defaultViewState = {
    latitude: lat,
    longitude: lng,
    zoom: 14,
  };

  const mapRef = useRef<MapRef | null>(null);
  const [viewState, setViewState] = useState(defaultViewState);
  const [displayOptions, setDisplayOptions] = useState(false);
  const [showCustomTrailOptions, setShowcustomTrailOptions] = useState(false);
  const [customPoints, setCustomPoints] = useState<customPoints>();
  const [showForm, setShowForm] = useState(false);
  const [geojsonRouteSource, setGeojsonRouteSource] = useState<Feature | null>(
    null
  );
  useEffect(() => {
    const getCustomGeometry = async () => {
      if (customPoints?.end && customPoints.start) {
        const poitToPointGeojsonRoute = await getPointToPointRoute(
          customPoints.start,
          customPoints.end
        );
        if (poitToPointGeojsonRoute) {
          setGeojsonRouteSource(poitToPointGeojsonRoute);
        }
      }
    };
    getCustomGeometry();
  }, [customPoints]);
  //Layers to add
  // const startPointLayer = startLayer(start) as CircleLayer;
  // const startPointSource = getStartPointPathRoute(start);

  //Todo:Need to move this to handlers
  const displayRoute = async (e: MapLayerMouseEvent) => {
    console.log(e.point);
    const width = 100;
    const height = 100;
    const features = mapRef.current?.queryRenderedFeatures(
      [
        [e.point.x - width / 2, e.point.y - height / 2],
        [e.point.x + width / 2, e.point.y + height / 2],
      ],
      {
        layers: ["updated_trails"],
      }
    );
  };
  const onMapClickHandler = async (e: MapLayerMouseEvent) => {
    if (showCustomTrailOptions) {
      const [ko] = [mapRef.current?.unproject(e.point)];
      if (ko?.lat && ko?.lng) {
        setCustomPoints({
          end: undefined,
          start: [ko.lng, ko.lat],
        });
      }
      if (customPoints?.start) {
        const [ko] = [mapRef.current?.unproject(e.point)];
        if (ko?.lat && ko?.lng) {
          setCustomPoints({
            ...customPoints,
            end: [ko.lng, ko.lat],
          });
        }
      }
    }
  };
  const onSaveCustomTrailHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (customPoints?.end && customPoints.start && customPoints?.name) {
      if (geojsonRouteSource && mapRef.current) {
        const maxElevation = getMaxAltitude(
          [geojsonRouteSource],
          mapRef.current
        );
        await addCustomTrail({
          trail_end: new GeoPoint(customPoints?.end[1], customPoints?.end[0]),
          trail_start: new GeoPoint(
            customPoints?.start[1],
            customPoints?.start[0]
          ),
          trail_name: customPoints?.name,
          trail_max_altitude: maxElevation,
          trail_center: new GeoPoint(
            customPoints?.end[1],
            customPoints?.end[0]
          ),
        });
        setCustomPoints({ end: undefined, start: undefined });
        setShowForm(false);
      }
    }
  };
  const geolocateControlRef = useCallback((ref: GeolocateControlRef) => {
    if (ref) {
      ref.trigger();
    }
  }, []);
  return (
    <div className="fixed">
      <Map
        {...viewState}
        id="myMap"
        ref={mapRef}
        onClick={(e) => onMapClickHandler(e)}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100vw", height: "91vh" }}
        mapStyle="mapbox://styles/lopezpedres/claprud1h002i15o6cuq5tg54"
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
        {/* For some reason I cant render bnoth conditions at the same time */}
        {customPoints?.end && <EndPointCustomTrail end={customPoints.end} />}
        {customPoints?.start && (
          <StartPointCustomTrail start={customPoints.start} />
        )}
        <NavigationControl />
        <GeolocateControl ref={geolocateControlRef} />
      </Map>
      <div
        onClick={() => setDisplayOptions(!displayOptions)}
        className="absolute w-12 bottom-10 right-2"
      >
        <AddIcon />
      </div>
      {displayOptions && (
        <article className="absolute p-10 shadow-md max-w-xs w-10/12 text-xl font-semibold  bg-white rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <button
            onClick={() => {
              setShowcustomTrailOptions(true);
              setDisplayOptions(false);
            }}
            className="w-full border-2 shadow-md hover:bg-primary rounded-md py-4 my-4 border-[black]"
          >
            Add Custom Trail
          </button>
        </article>
      )}
      {showCustomTrailOptions && (
        <section className="absolute flex justify-evenly items-center p-2 shadow-md max-w-xs w-9/12 text-xl font-semibold  bg-white rounded-xl top-10 left-1/2 -translate-x-1/2 ">
          <h1 className="text-sm">
            Select {!customPoints?.start ? "start " : " end "}of your trail
          </h1>
          <button
            className="text-xs px-2 py-1 rounded-2xl bg-primary"
            onClick={() => {
              console.log("cancelling");
              setShowcustomTrailOptions(false);
              setCustomPoints({ end: undefined, start: undefined });
            }}
          >
            Cancel
          </button>
        </section>
      )}
      {customPoints?.end && customPoints.start && !showForm && (
        <section className="absolute flex justify-evenly items-center p-2 shadow-md max-w-xs w-9/12 text-xl font-semibold  bg-white rounded-xl top-10 left-1/2 -translate-x-1/2 ">
          <h1 className="text-sm">Save Custom Trail </h1>
          <button
            className="text-sm px-2 py-1 rounded-2xl bg-primary"
            onClick={() => {
              setShowForm(true);
              setShowcustomTrailOptions(false);
            }}
          >
            Save
          </button>
          <button
            className="text-sm px-2 py-1 rounded-2xl bg-primary"
            onClick={() => {
              setGeojsonRouteSource(null);
              setShowcustomTrailOptions(false);
              setCustomPoints({ end: undefined, start: undefined });
            }}
          >
            Cancel
          </button>
        </section>
      )}
      {customPoints?.end && customPoints.start && showForm && (
        <form
          onSubmit={(e) => {
            onSaveCustomTrailHandler(e);
          }}
          className="absolute flex flex-col justify-evenly items-center p-4 shadow-md max-w-xs w-10/12 text-xl font-semibold  bg-white rounded-xl top-48 left-1/2 -translate-x-1/2"
        >
          <label className="text-[black] text-xs px-4">
            TRAIL'S NAME
            <input
              onChange={(e) => {
                setCustomPoints({
                  ...customPoints,
                  [e.currentTarget.name]: e.currentTarget.value,
                });
              }}
              className="py-4 outline-none text-xl"
              name="name"
              placeholder="Ex: My Super Cool Trail"
            />
          </label>
          <button
            type="submit"
            className=" mt-4 p-2 px-6 rounded-3xl bg-primary"
          >
            Save Trail
          </button>
          <button
            className="mt-4 p-2 px-6 rounded-3xl bg-primary"
            onClick={() => {
              console.log("cancelling");
              setShowcustomTrailOptions(false);
              setCustomPoints({ end: undefined, start: undefined });
            }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default NavigateMap;
