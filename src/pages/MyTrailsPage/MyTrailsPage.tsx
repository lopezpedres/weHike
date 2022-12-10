import React, { useContext } from "react";
import MyTrailsList from "../../components/MyTrailsList/MyTrailsList";
import Navbar from "../../components/Navbar/Navbar";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import { userContentState } from "../../context/UserContentProvider/UserContentProvider";

const MyTrailsPage = () => {
  const { userTrails } = useContext(userContentState);
  return (
    <main>
      <SearchComponent />
      <MyTrailsList userTrails={userTrails} />;
      <Navbar />
    </main>
  );
};

export default MyTrailsPage;
