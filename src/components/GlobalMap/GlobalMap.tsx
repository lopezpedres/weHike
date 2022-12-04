import React from "react";
import Map from "react-map-gl";

const GlobalMap = () => {
  const MAP_BOX_TOKEN = import.meta.env.VITE_MAPBOX_API_KEY;
  return (
    <Map
      id="globalMap"
      mapStyle="mapbox://styles/lopezpedres/claprud1h002i15o6cuq5tg54"
      mapboxAccessToken={MAP_BOX_TOKEN}
      style={{ width: "0%", height: "0%" }}
    />
  );
};

export default GlobalMap;
