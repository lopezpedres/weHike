import { Geometry } from "geojson";
import React, { useContext, useEffect, useState } from "react";
import { Layer, MapboxGeoJSONFeature, useMap } from "react-map-gl";
import { userContentState } from "../../context/UserContentProvider/UserContentProvider";
import GeneralListItem from "../GeneralListItem/GeneralListItem";
//Todo: Need to define all the possible types of my array items
interface InterfacePropertiesFeature {
  id: string;
  name: string;
  geometry: Geometry;
  sac_scale?: string | null;
}
/**
 * Filters out all the repited features based on the given comparator
 * @param features
 * @param comparatorProperty
 * @returns
 */
const getUniqueFeatures = (
  features: MapboxGeoJSONFeature[] | undefined,
  comparatorProperty: string
) => {
  const uniqueIds = new Set();
  const uniqueFeatures = [];
  if (features) {
    for (const feature of features) {
      const id = feature.properties && feature.properties[comparatorProperty];
      if (!uniqueIds.has(id)) {
        uniqueIds.add(id);
        uniqueFeatures.push(feature);
      }
    }
  }
  return uniqueFeatures;
};

const GeneralList = () => {
  const { globalMap } = useMap();
  const [features, setFeatures] =
    useState<(InterfacePropertiesFeature | undefined)[]>();
  const { userCurrentLocation } = useContext(userContentState);
  const coordinates = userCurrentLocation?.coords;
  const lat = coordinates?.latitude;
  const lng = coordinates?.longitude;
  //lat->y
  //lon->x
  const width = 1000;
  const height = 1000;
  const afterChangeComplete = () => {
    console.count("Entering afterChange");
    console.log("latandlng", lat, lng);
    if (lat && lng) {
      const allFeatures = globalMap?.queryRenderedFeatures(
        [
          [lng - width / 2, lat - height / 2],
          [lng + width / 2, lat + height / 2],
        ],
        {
          layers: ["trails"],
          filter: ["all", ["has", "name"]],
        }
      );
      // console.log(allFeatures);
      const uniqueFeatures = getUniqueFeatures(allFeatures, "@id");
      const uniqueNameFeatures = getUniqueFeatures(uniqueFeatures, "name");
      const cleanedFeatures = uniqueNameFeatures?.map((feature) => {
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
      // console.log(cleanedFeatures);
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
    <ul className="w-full mb-40">
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
