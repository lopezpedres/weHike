import Map, {
  NavigationControl,
  Layer,
  MapRef,
  Source,
  GeolocateControl,
  Marker,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useContext, useEffect, useRef, useState } from "react";
import skyLayer from "../../Layers/skyLayer";
import chevronLeft from "/assets/icons/chevron-left.svg";
import { userContentState } from "../../context/UserContentProvider/UserContentProvider";
import { doc, GeoPoint, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import AddIcon from "../AddIcon/AddIcon";
import AddMedia from "../AddMedia/AddMedia";
import {
  ImagesTrail,
  imageTrail,
  InterfaceCustomTrail,
  InterfaceSelectedTrailDetails,
  UpdatedAtOrCreatedAt,
} from "./typesMyTrailMap";
import ImagesMarkers from "../ImagesMarkers/ImagesMarkers";
import ImageDisplayInfo from "../ImageDisplayInfo/ImageDisplayInfo";
import routeLayer from "../../Layers/routeLayer";
import { Feature } from "geojson";
import getPointToPointRoute from "../../Sources/getPointToPointRoute";
interface Props {
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}
const defaultImagesValue = {} as ImagesTrail;
const MyTrailMap = ({ setShowMap }: Props) => {
  const MAP_BOX_TOKEN = import.meta.env.VITE_MAPBOX_API_KEY;
  const [currentMyTrail, setCurrentMyTrail] =
    useState<InterfaceSelectedTrailDetails>();
  const [trailImages, setTrailImages] =
    useState<ImagesTrail>(defaultImagesValue);
  const { userTrails, selectedMyTrailName, userCurrentLocation } =
    useContext(userContentState);
  const [showPopup, setShowPopup] = useState<imageTrail>();
  const [customTrailData, setCustomTrailData] =
    useState<InterfaceCustomTrail | null>(null);
  const [geojsonRouteSource, setGeojsonRouteSource] = useState<Feature | null>(
    null
  );

  useEffect(() => {
    if (userTrails && selectedMyTrailName) {
      const filteredTrail = Object.entries(userTrails).filter(
        ([_key, value]) => value.trail_name === selectedMyTrailName
      );
      const noKeyFilteredTrail = filteredTrail[0][1];
      const { trail_center, images_id, notes_id, trail_id, custom_id } =
        noKeyFilteredTrail;
      const { latitude: TrailLat, longitude: TrailLng } =
        trail_center as unknown as GeoPoint;

      setCurrentMyTrail({
        TrailLat,
        TrailLng,
        images_id,
        notes_id,
        trail_id,
        custom_id: custom_id ? custom_id : "",
      });
    }
    //Open a listener to get the images of the user's trail
    //Get the imageurl of the current trail
    //Get snapshot of the images-trail collection and retrive the doc with the id === imageUrl
    //Save data in a state and use it to display Pins to the map
  }, []);
  useEffect(() => {
    console.log("The effect works");
    if (currentMyTrail) {
      const trailImagesRef = doc(
        db,
        "images-trail",
        `${currentMyTrail.images_id}`
      );
      console.log(currentMyTrail.images_id);
      try {
        const unsub = onSnapshot(trailImagesRef, (querySnapshot) => {
          const snap = querySnapshot.data();
          if (snap) {
            setTrailImages(snap as ImagesTrail);
          }
        });
        return unsub;
      } catch (error) {
        console.error(error);
      }
    }
  }, [currentMyTrail]);
  useEffect(() => {
    {
      console.log("The Custom Trail effect works");
      if (currentMyTrail) {
        const customTrailRef = doc(
          db,
          "custom-trails",
          `${currentMyTrail.custom_id}`
        );
        console.log(currentMyTrail.custom_id);
        try {
          const unsub = onSnapshot(customTrailRef, (querySnapshot) => {
            const snap = querySnapshot.data();
            if (snap) {
              const trailData = snap as InterfaceCustomTrail;
              setCustomTrailData(trailData);
            }
          });
          return unsub;
        } catch (error) {
          console.error(error);
        }
      }
    }
  }, [currentMyTrail]);
  useEffect(() => {
    const setGeojsonTrail = async () => {
      if (customTrailData) {
        const key = Object.keys(customTrailData)[0];
        const start = customTrailData[key].trail_start;
        const end = customTrailData[key].trail_end;
        const geometry = await getPointToPointRoute(
          [end.longitude, end.latitude],
          [start.longitude, start.latitude]
        );
        if (geometry) {
          setGeojsonRouteSource(geometry);
        }
      }
    };
    setGeojsonTrail();
  }, [customTrailData]);
  //TODO: Need to set this defaults with the value of the user location
  const defaultLat = 49.246292;
  const defaultLng = -123.116226;
  const latitude = currentMyTrail ? currentMyTrail.TrailLat : defaultLat;
  const longitude = currentMyTrail ? currentMyTrail.TrailLng : defaultLng;
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
      ["match", ["get", "name"], [selectedMyTrailName], true, false],
    ]);
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
        {trailImages && (
          <ImagesMarkers
            setShowPopup={setShowPopup}
            trailImages={trailImages}
          />
        )}
        {geojsonRouteSource && (
          <Source id="current-route" type="geojson" data={geojsonRouteSource}>
            <Layer {...routeLayer} />
          </Source>
        )}
      </Map>
      {currentMyTrail && (
        <AddMedia
          images_id={currentMyTrail.images_id}
          notes_id={currentMyTrail.notes_id}
          trail_id={currentMyTrail.trail_id}
        />
      )}
      {showPopup && (
        <ImageDisplayInfo setShowPopup={setShowPopup} showPopup={showPopup} />
      )}
    </div>
  );
};

export default MyTrailMap;
