import React, { useContext, useEffect, useRef } from "react";
import Map, {
  GeolocateControl,
  GeolocateControlRef,
  MapRef,
} from "react-map-gl";
import { userContentDispatch } from "../../context/UserContentProvider/UserContentProvider";

const GlobalMap = () => {
  const globalMapRef = useRef<MapRef | null>(null);
  const dispatch = useContext(userContentDispatch);
  const MAP_BOX_TOKEN = import.meta.env.VITE_MAPBOX_API_KEY;
  //   useEffect(() => {
  //     if (globalGeoControlRef) {
  //       const geoLocation = globalGeoControlRef.current?.trigger();
  //       if (geoLocation) {
  //         navigator.geolocation.getCurrentPosition((pos) => {
  //           console.log("Recived location at GlobalMap");
  //           dispatch({ type: "SET-USER-CURRENT-LOCATION", payload: pos });
  //         });
  //       }
  //     }
  //   }, [globalMapRef]);
  const geolocateControlRef = React.useCallback(
    (ref: GeolocateControlRef | null) => {
      if (ref) {
        navigator.geolocation.getCurrentPosition((pos) => {
          console.log("Recived location at GlobalMap", pos);
          dispatch({ type: "SET-USER-CURRENT-LOCATION", payload: pos });
        });
      }
    },
    []
  );
  return (
    <Map
      id="globalMap"
      ref={globalMapRef}
      mapStyle="mapbox://styles/lopezpedres/claprud1h002i15o6cuq5tg54"
      mapboxAccessToken={MAP_BOX_TOKEN}
      //   style={{ width: "100vw", height: "95vh" }}
    >
      <GeolocateControl ref={geolocateControlRef} />
    </Map>
  );
};

export default GlobalMap;
