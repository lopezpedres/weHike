import { Position } from "geojson";
import { CircleLayer } from "react-map-gl";

const circleLayer = (start: Position) => {
  const layer: CircleLayer = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#3887be",
    },
  };

  return layer;
};

export default circleLayer;
