import { Position } from "geojson";
import { Layer, Source } from "react-map-gl";
import circleLayer from "../../Layers/startLayer";
import getStartPointPathRoute from "../../Sources/getStartPoinPathRoute";

const EndPointCustomTrail = ({ end }: { end: Position }) => {
  const endPointSource = getStartPointPathRoute(end);
  return (
    <Source id="data" type="geojson" data={endPointSource}>
      <Layer {...circleLayer} />
    </Source>
  );
};

export default EndPointCustomTrail;
