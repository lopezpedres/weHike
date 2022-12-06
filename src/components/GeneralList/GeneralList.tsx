import { useContext, useEffect, useState } from "react";
import { useMap } from "react-map-gl";
import { userContentState } from "../../context/UserContentProvider/UserContentProvider";
import GeneralListItem from "../GeneralListItem/GeneralListItem";
import getUniqueFeatures from "../../utils/getUniqueFeatures";
import { InterfacePropertiesFeature } from "./typesGeneralList";
import getElevationGain from "../../utils/getElevationGain";
import turfCombine from "@turf/combine";
import { featureCollection } from "@turf/helpers";
import { FeatureCollection, LineString } from "geojson";

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
        // // //Get just the features of the given name
        // const featuresNameGroup = uniqueFeatures.filter(
        //   (f) => f.properties?.name === feature.properties?.name
        // );
        // const
        // // // const newFeaturesCollection = featuresNameGroup.filter(
        // // //   (feature) => feature.geometry.type === "LineString"
        // // // );
        // // const featuresCollectionTurf = featureCollection(featuresNameGroup);
        // const featuresCollectionTurf: FeatureCollection<LineString> = featureCollection(featuresNameGroup);

        // // // !: How tf can I do it without the ts-ignore?
        // //// @ts-ignore: Unreachable code error
        // const featuresCombined = turfCombine(featuresCollectionTurf);
        // console.log(feature.properties?.name, featuresCombined);
        // // const elevationFeaturesByName = getElevationGain(featuresCombined)
        const { properties } = feature;
        if (properties) {
          const featureObj: InterfacePropertiesFeature = {
            id: properties["@id"],
            name: properties.name,
            geometry: feature.geometry,
            sac_scale: properties.sac_scale,
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
          />
        ))}
    </ul>
  );
};

export default GeneralList;
