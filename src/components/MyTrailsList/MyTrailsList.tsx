import React, { useContext } from "react";
import { userContentState } from "../../context/UserContentProvider/UserContentProvider";
import type { Trail } from "../../context/UserContentProvider/UserContentTypes";
import MyTrailsItem from "../MyTrailsItem/MyTrailsItem";
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
        <h1>Loading</h1>
      )}
    </ul>
  );
};

export default MyTrailsList;
