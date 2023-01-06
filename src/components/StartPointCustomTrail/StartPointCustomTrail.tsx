import { Position } from "geojson";
import { Layer, Source } from "react-map-gl";
import circleLayer from "../../Layers/startLayer";
import getStartPointPathRoute from "../../Sources/getStartPoinPathRoute";

const StartPointCustomTrail = ({ start }: { start: Position }) => {
  const startPointSource = getStartPointPathRoute(start);
  return (
    <Source id="data" type="geojson" data={startPointSource}>
      <Layer {...circleLayer} />
    </Source>
  );
};

export default StartPointCustomTrail;
