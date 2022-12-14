import { useContext, useEffect, useState } from "react";
import { useMap } from "react-map-gl";
import { userContentState } from "../../context/UserContentProvider/UserContentProvider";
import GeneralListItem from "../GeneralListItem/GeneralListItem";
import getUniqueFeatures from "../../utils/getUniqueFeatures";
import { InterfacePropertiesFeature } from "./typesGeneralList";
import getElevationGain from "../../utils/getElevationGain";
import turfCombine from "@turf/combine";
import length from "@turf/length";
import center from "@turf/center";
import { featureCollection } from "@turf/helpers";
import { FeatureCollection, LineString, Position } from "geojson";
import mergeStringlineGeometries from "../../utils/mergeLineStringArrays";
import getDifficulty from "../../utils/getDifficulty";

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
        console.log(featuresNameGroup);

        const featuresCollectionTurf = featureCollection(featuresNameGroup);
        //This is the only typing that I can't figure  out
        // @ts-ignore: Unreachable code error
        const featureCenter = center(featuresCollectionTurf);
        //todo:Need to get themaxelevation of the trail
        const maxElevation = 4444;
        //todo:Need to get the distance of the trail
        const trailDistance = length(featuresCollectionTurf, {
          units: "kilometers",
        });
        const elevationFeaturesByName =
          featuresNameGroup.length === 1
            ? getElevationGain(featuresNameGroup[0], globalMap)
            : 0;
        const { properties } = feature;
        if (properties) {
          const featureObj: InterfacePropertiesFeature = {
            id: properties["@id"],
            name: properties.name,
            trail_center: featureCenter.geometry.coordinates,
            sac_scale: getDifficulty(properties.sac_scale),
            elevation_gain: elevationFeaturesByName as number,
            max_elevation: maxElevation,
            distance: Math.round(trailDistance * 1000),
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
      return afterChangeComplete();
    } else {
      globalMap?.on("load", () => {
        if (!globalMap?.loaded()) {
          return;
        }
        globalMap.on("render", afterChangeComplete);
      });
    }
  }, [globalMap, userCurrentLocation]);
  return (
    <ul className="w-full mt-2 mb-40">
      {features ? (
        features.map((item) => (
          <GeneralListItem
            key={item?.id}
            trail_center={item?.trail_center}
            id={item?.id}
            name={item?.name}
            sac_scale={item?.sac_scale}
            elevation_gain={item?.elevation_gain}
            max_elevation={item?.max_elevation}
            distance={item?.distance}
          />
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </ul>
  );
};

export default GeneralList;
