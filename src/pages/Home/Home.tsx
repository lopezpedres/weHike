import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import GeneralList from "../../components/GeneralList/GeneralList";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import loadingGift from "/assets/images/loading.gif";
import { trailsProvider } from "../../context/NearByTrailsProvider/NearByTrailsProvider";
const Home = () => {
  const features = useContext(trailsProvider);
  const [searchInput, setSearchInput] = useState("");
  const filtedFeatures =
    features?.filter((f) => f.name.toLowerCase().includes(searchInput)) || null;
  return (
    <>
      <main className="bg-white">
        <h1 className="text-center mt-5 text-4xl">Hi Miguel🌄</h1>
        <SearchComponent setSearchInput={setSearchInput} />
        {features && (
          <GeneralList features={filtedFeatures ? filtedFeatures : features} />
        )}
        {!features && (
          <div className="absolute top-1/2 -translate-y-1/2">
            <img alt="loading" src={loadingGift} />
          </div>
        )}
      </main>
      <Navbar activeNavbar={true} />
    </>
  );
};

export default Home;
