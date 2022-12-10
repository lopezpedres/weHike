import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import GeneralList from "../../components/GeneralList/GeneralList";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
const Home = () => {
  return (
    <>
      <main className="bg-white">
        <h1 className="text-center mt-5 text-4xl">Hi Miguel🌄</h1>
        <SearchComponent />
        <GeneralList />
      </main>
      <Navbar activeNavbar={true} />
    </>
  );
};

export default Home;
