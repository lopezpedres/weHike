import { useContext, useEffect, useState } from "react";
import { useMap } from "react-map-gl";
import { userContentState } from "../../context/UserContentProvider/UserContentProvider";
import GeneralListItem from "../GeneralListItem/GeneralListItem";
import getUniqueFeatures from "../../utils/getUniqueFeatures";
import { InterfacePropertiesFeature } from "./typesGeneralList";
import getElevationGain from "../../utils/getElevationGain";
import turfCombine from "@turf/combine";
import center from "@turf/center";
import { featureCollection } from "@turf/helpers";
import { FeatureCollection, LineString, Position } from "geojson";
import mergeStringlineGeometries from "../../utils/mergeLineStringArrays";

const GeneralList = () => {
  const { globalMap } = useMap();
  const [features, setFeatures] =
    useState<(InterfacePropertiesFeature | undefined)[]>();
  const { userCurrentLocation } = useContext(userContentState);
  const coordinates = userCurrentLocation?.coords;
  let lat = coordinates?.latitude;
  let lng = coordinates?.longitude;
  //lat->y
  //lon->x
  const width = 1000000;
  const height = 100000;
  const afterChangeComplete = () => {
    if (lat && lng && globalMap) {
      // lat = 49.246292;
      // lng = -123.116226;
      const allFeatures = globalMap?.queryRenderedFeatures(
        [
          [lng - width / 2, lat - height / 2],
          [lng + width / 2, lat + height / 2],
        ],
        {
          layers: ["updated_trails"],
          filter: ["all", ["has", "name"]],
        }
      );
      const uniqueFeatures = getUniqueFeatures(allFeatures, "@id"); //Always need this
      const uniqueNameFeatures = getUniqueFeatures(uniqueFeatures, "name");
      const cleanedFeatures = uniqueNameFeatures?.map((feature) => {
        const featuresNameGroup = uniqueFeatures.filter(
          (f) => f.properties?.name === feature.properties?.name
        );

        const featuresCollectionTurf = featureCollection(featuresNameGroup);

        //This is the only typing that I can't figure  out
        // @ts-ignore: Unreachable code error
        const featureCenter = center(featuresCollectionTurf);

        const elevationFeaturesByName =
          featuresNameGroup.length === 1
            ? getElevationGain(featuresNameGroup[0], globalMap)
            : ["Not available"];
        const { properties } = feature;
        if (properties) {
          const featureObj: InterfacePropertiesFeature = {
            id: properties["@id"],
            name: properties.name,
            geometry: featureCenter.geometry.coordinates,
            sac_scale: properties.sac_scale,
            elevation_gain: elevationFeaturesByName as number,
          };
          return featureObj;
        }
      });
      setFeatures(cleanedFeatures);
      globalMap?.off("render", afterChangeComplete);
    }
  };
  useEffect(() => {
    //This is a bit complex:

    if (globalMap?.loaded()) {
      console.log("The map is loaded");
      return afterChangeComplete();
    } else {
      console.log("The map is not loading", globalMap);
      globalMap?.on("load", () => {
        console.log("loading map");
        if (!globalMap?.loaded()) {
          console.log("The map is not loaded");
          return;
        }
        globalMap.on("render", afterChangeComplete);
      });
    }
  }, [globalMap, userCurrentLocation]);
  return (
    <ul className="w-full mt-2 mb-40">
      {features &&
        features.map((item) => (
          <GeneralListItem
            key={item?.id}
            geometry={item?.geometry}
            id={item?.id}
            name={item?.name}
            sac_scale={item?.sac_scale}
            elevation_gain={item?.elevation_gain}
          />
        ))}
    </ul>
  );
};

export default GeneralList;
