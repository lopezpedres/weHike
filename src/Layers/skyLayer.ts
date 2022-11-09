import { SkyLayer } from "react-map-gl";

const skyLayer: SkyLayer = {
  id: "sky",
  type: "sky",
  paint: {
    "sky-type": "atmosphere",
    "sky-atmosphere-sun": [0.0, 0.0],
    "sky-atmosphere-sun-intensity": 15,
  },
};

export default skyLayer;
