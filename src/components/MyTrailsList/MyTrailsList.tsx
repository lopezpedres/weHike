import React, { useContext } from "react";
import { userContentState } from "../../context/UserContentProvider/UserContentProvider";
import type { Trail } from "../../context/UserContentProvider/UserContentTypes";
import MyTrailsItem from "../MyTrailsItem/MyTrailsItem";
import loadingGift from "/assets/images/loading.gif";
interface Props {
  userTrails: Trail | null;
}
const MyTrailsList = ({ userTrails }: Props) => {
  return (
    <ul>
      {userTrails ? (
        Object.entries(userTrails).map(([key, value]) => (
          <MyTrailsItem key={key} value={value} />
        ))
      ) : (
        <div className="absolute top-1/2 -translate-y-1/2">
          <img alt="loading" src={loadingGift} />
          <h1 className="text-xl text-center">Loading ...</h1>
        </div>
      )}
    </ul>
  );
};

export default MyTrailsList;
