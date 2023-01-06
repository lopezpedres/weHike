import center from "@turf/center";
import { AllGeoJSON, featureCollection } from "@turf/helpers";
import length from "@turf/length";
import { GeoPoint } from "firebase/firestore";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useMap } from "react-map-gl";
import getDifficulty from "../../utils/getDifficulty";
import getElevationGain from "../../utils/getElevationGain";
import getMaxAltitude from "../../utils/getMaxAltitude";
import getUniqueFeatures from "../../utils/getUniqueFeatures";
import { userContentState } from "../UserContentProvider/UserContentProvider";
import { InterfacePropertiesFeature } from "./typesNearByTrailsProvider";
const width = 1000000;
const height = 100000;

interface Props {
  children: React.ReactNode;
}
const trailsProvider = createContext({} as InterfacePropertiesFeature[] | null);
const NearByTrailsProvider = ({ children }: Props) => {
  const { globalMap } = useMap();
  const { userCurrentLocation } = useContext(userContentState);
  const coordinates = userCurrentLocation?.coords;
  let lat = coordinates?.latitude;
  let lng = coordinates?.longitude;
  const [features, setFeatures] = useState<InterfacePropertiesFeature[] | null>(
    null
  );
  const value = useMemo(() => {
    return features;
  }, [userCurrentLocation, features]);
  //Need to move afterChangeComplete to utils so this componet is cleaner
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
        const featureCenter = center(featuresCollectionTurf as AllGeoJSON);
        const maxElevation = getMaxAltitude(featuresNameGroup, globalMap);
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
            trail_center: new GeoPoint(
              featureCenter.geometry.coordinates[1],
              featureCenter.geometry.coordinates[0]
            ),
            sac_scale: getDifficulty(properties.sac_scale),
            elevation_gain: elevationFeaturesByName as number,
            max_elevation: maxElevation,
            distance: Math.round(trailDistance * 1000),
          };
          return featureObj;
        }
      });
      const cleanedFeaturesNoUndefined = cleanedFeatures.filter(
        (f): f is InterfacePropertiesFeature => f !== undefined
      );
      setFeatures(cleanedFeaturesNoUndefined);
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
    <trailsProvider.Provider value={value}>{children}</trailsProvider.Provider>
  );
};
export { trailsProvider };
export default NearByTrailsProvider;
