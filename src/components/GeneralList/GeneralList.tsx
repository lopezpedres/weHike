import { Geometry } from "geojson";
import React, { useContext, useEffect, useState } from "react";
import { MapboxGeoJSONFeature, useMap } from "react-map-gl";
import { userContentState } from "../../context/UserContentProvider/UserContentProvider";
import GeneralListItem from "../GeneralListItem/GeneralListItem";
//Todo: Need to define all the possible types of my array items
interface InterfacePropertiesFeature {
  id: string;
  name: string;
  geometry: Geometry;
  sac_scale?: string | null;
}

const GeneralList = () => {
  const { globalMap } = useMap();
  const [features, setFeatures] = useState<InterfacePropertiesFeature[]>();
  console.log(globalMap);
  const { userCurrentLocation } = useContext(userContentState);
  const coordinates = userCurrentLocation?.coords;
  const lat = coordinates?.latitude;
  const lng = coordinates?.longitude;
  //lat->y
  //lon->x
  const width = 1000;
  const height = 1000;
  const afterChangeComplete = () => {
    if (lat && lng) {
      const allFeatures = globalMap?.queryRenderedFeatures(
        [
          [lng - width / 2, lat - height / 2],
          [lng + width / 2, lat + height / 2],
        ],
        {
          layers: ["trails"],
        }
      );
      console.log(allFeatures);
      const cleanedFeatures = allFeatures?.map((feature) => {
        const properties = feature.properties as InterfacePropertiesFeature;
        const featureObj = {
          id: properties.id,
          name: properties.name,
          geometry: feature.geometry,
        };
        return featureObj;
      });

      setFeatures(cleanedFeatures);
      globalMap?.off("render", afterChangeComplete);
    }
  };
  globalMap?.on("load", () => {
    console.log("loading map");
    if (!globalMap?.loaded()) return;
    globalMap.on("render", afterChangeComplete);
  });
  return (
    <ul className="w-full">
      {features &&
        features.map((item, index) => (
          <GeneralListItem
            key={item.id}
            geometry={item.geometry}
            id={item.id}
            name={item.name}
            sac_scale={item.sac_scale}
          />
        ))}
    </ul>
  );
};

export default GeneralList;
