import React from "react";
import { useMap } from "react-map-gl";
import GeneralListItem from "../GeneralListItem/GeneralListItem";
//Todo: Need to define all the possible types of my array items
const GeneralList = () => {
  const { globalMap } = useMap();
  const pathNames = [{ title: "Name 1" }];
  console.log(globalMap);
  return (
    <ul className="w-full">
      {pathNames &&
        pathNames.map((item, index) => (
          <GeneralListItem key={index} item={item} />
        ))}
    </ul>
  );
};

export default GeneralList;
