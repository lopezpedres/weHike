import { FeatureCollection, Position } from "geojson";
const getStartPointPathRoute=(start:Position)=>{
    const startPointGeoJson: FeatureCollection = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "Point",
                    coordinates: start,
        },
    },
],
};
return startPointGeoJson
}
export default getStartPointPathRoute