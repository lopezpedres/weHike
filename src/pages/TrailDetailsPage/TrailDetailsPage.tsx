import React, { useContext } from "react";
import { useMap } from "react-map-gl";
import { userContentState } from "../../context/UserContentProvider/UserContentProvider";
import genericMap from "../../assets/images/generic-map.jpg";
import chevronLeft from "/assets/icons/chevron-left.svg";
import { useNavigate } from "react-router-dom";
import WeatherList from "../../components/WeatherList/WeatherList";
const TrailDetailsPage = () => {
  const { selectedTrailName } = useContext(userContentState);
  const { globalMap } = useMap();
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(-1);
  };

  return (
    <main>
      <section className=" relative h-96  bg-cover  bg-[url(/assets/images/mtn.jpg)]">
        <div
          onClick={() => clickHandler()}
          className="p-2 rounded-full absolute bg-white top-4 left-4"
        >
          <img className="w-6" src={chevronLeft} />
        </div>
        <article className="opacity-90 w-full bg-white p-7 absolute top-20">
          <h1 className="text-3xl ">{selectedTrailName}</h1>
          <span className="text-[green]">easy</span>
        </article>
        <article className=" p-7 flex justify-between absolute w-full rounded-t-3xl bg-primary bottom-0 shadow-xl">
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold">Distance</span>
            <span className="text-xl">20 km</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold">Elevation Gain</span>
            <span className="text-xl">904 m</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold">Max Altitud</span>
            <span className="text-xl">3244 km</span>
          </div>
        </article>
      </section>
      <section>
        <article className="flex justify-center items-center mt-4 relative h-36  bg-cover  bg-[url(/assets/images/generic-map.jpg)]">
          <div className="border-2 border-primary rounded-md p-2">
            <h5 className="text-xl font-semibold">Open in Map</h5>
          </div>
        </article>
        <WeatherList />
      </section>
    </main>
  );
};

export default TrailDetailsPage;
