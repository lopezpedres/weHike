import { Point, Position } from "geojson";
import React, { useContext, useEffect, useRef, useState } from "react";
import Map, {
  GeolocateControl,
  GeolocateControlRef,
  MapRef,
} from "react-map-gl";
import { userContentDispatch } from "../../context/UserContentProvider/UserContentProvider";
interface InterfaceLatLng {
  lat: number;
  lng: number;
}
const lat = 49.246292;
const lng = -123.116226;
const GlobalMap = () => {
  const [latLng, setLatLng] = useState<InterfaceLatLng>();
  const dispatch = useContext(userContentDispatch);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log("Recived location at GlobalMap", pos);
      setLatLng({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      dispatch({ type: "SET-USER-CURRENT-LOCATION", payload: pos });
    });
  }, []);
  const defaultViewState = {
    latitude: 49.668131,
    longitude: -123.162498,
    //Zoom here is super important, otherwise, I wont be able to get my trails
    //12 seems to be ideal
    zoom: 12,
  };
  const globalMapRef = useRef<MapRef | null>(null);
  const MAP_BOX_TOKEN = import.meta.env.VITE_MAPBOX_API_KEY;

  return (
    <Map
      {...defaultViewState}
      id="globalMap"
      ref={globalMapRef}
      mapStyle="mapbox://styles/lopezpedres/claprud1h002i15o6cuq5tg54"
      mapboxAccessToken={MAP_BOX_TOKEN}
      // style={{ width: "100vw", height: "95vh" }}
    >
      {/* <GeolocateControl ref={(ev)=> ev?.trigger()} /> */}
    </Map>
  );
};

export default GlobalMap;
