import React, { useEffect, useState } from "react";
import getWeatherData from "../../utils/getWeatherData";
import WeatherCard from "../WeatherCard/WeatherCard";
import { DailyEntity, Weather } from "./typesWeatherList";

const WeatherList = () => {
  const [forecast, setForecast] = useState<DailyEntity[] | null | undefined>();

  //Getting data from API
  const getData = async () => {
    //TODO:Need to pass the actual coordinates of the trail to the getWeatherData
    const { daily } = await getWeatherData();
    setForecast(daily);
  };
  useEffect(() => {
    getData();
  }, []);
  867777000;

  return (
    <>
      {forecast ? (
        <div className=" w-full flex overflow-x-auto">
          {forecast.map((daily) => (
            <WeatherCard
              key={daily.dt}
              date={daily.dt}
              temp={daily.temp}
              weather={daily.weather}
            />
          ))}
        </div>
      ) : (
        <p>There is no data from Api</p>
      )}
    </>
  );
};

export default WeatherList;
