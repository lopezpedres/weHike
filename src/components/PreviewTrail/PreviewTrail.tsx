import { GeoPoint } from "firebase/firestore";
import React, { useState } from "react";
import { addUserTrail } from "../../firebase/firebaseQueries/firebaseQueries";
import center from "@turf/center";
import { AllGeoJSON } from "@turf/helpers";

interface Props {
  feature: mapboxgl.MapboxGeoJSONFeature;
  setPreviewTrail: React.Dispatch<
    React.SetStateAction<mapboxgl.MapboxGeoJSONFeature | undefined>
  >;
}
const PreviewTrail = ({ feature, setPreviewTrail }: Props) => {
  const { properties } = feature;
  const [success, setSucess] = useState(false);
  const addTrailHandler = async () => {
    const id = properties ? properties["@id"] : "noid";
    const splitedId = id.split("/")[1];
    console.log(splitedId);
    const { geometry } = center(feature as AllGeoJSON);
    const trailCenter = geometry.coordinates;

    if (geometry.coordinates && splitedId) {
      try {
        const centerGeoPoint = new GeoPoint(trailCenter[1], trailCenter[0]);
        await addUserTrail({
          trail_id: splitedId,
          trail_name: feature.properties?.name,
          trail_center: centerGeoPoint,
          tags: {
            planning: true,
          },
          sac_scale: feature.properties?.sac_scale,
          distance: 1,
          elevation_gain: 1,
          max_elevation: 1,
        });
        setSucess(true);
        setTimeout(() => setSucess(false), 2000);
      } catch (error) {}
    }
  };
  return (
    <>
      {feature?.properties?.name && (
        <article
          className="
      absolute
      top-1/2
      left-1/2
      -translate-x-1/2
      bg-white
      w-11/12
      p-4
      rounded-md
      flex
      flex-col
      justify-center
      "
          onClick={() => setPreviewTrail(undefined)}
        >
          <h1 className="text-xl text-center mb-2">
            {feature.properties?.name}
          </h1>
          <button
            onClick={addTrailHandler}
            className="p-2 text-lg bg-primary rounded-md "
          >
            Add Trail
          </button>
        </article>
      )}
      {success && (
        <article className="absolute p-10 shadow-md max-w-xs w-10/12 text-xl font-semibold  bg-white rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <h1 className="text-center">Trail Added!</h1>
        </article>
      )}
    </>
  );
};

export default PreviewTrail;
