import { LineLayer } from "react-map-gl";

const routeLayer = (geojson: GeoJSON.Feature | undefined) => {
  const layer: LineLayer = {
    id: "route",
    type: "line",
    source: {
      type: "geojson",
      data: geojson,
    },
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#3887be",
      "line-width": 5,
      "line-opacity": 0.75,
    },
  };
  return layer;
};
export default routeLayer;
