import React from "react";
import GeneralListItem from "../GeneralListItem/GeneralListItem";
//Todo: Need to define all the possible types of my array items
const GeneralList = ({ pathNames }: any | string[] | null | undefined) => {
  console.log(pathNames);
  return (
    <ul>
      {pathNames &&
        pathNames.map((item: string) => <GeneralListItem item={item} />)}
    </ul>
  );
};

export default GeneralList;
