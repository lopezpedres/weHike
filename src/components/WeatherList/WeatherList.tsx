import React, { useContext, useEffect, useState } from "react";
import { userContentState } from "../../context/UserContentProvider/UserContentProvider";
import getWeatherData from "../../utils/getWeatherData";
import WeatherCard from "../WeatherCard/WeatherCard";
import { DailyEntity, Weather } from "./typesWeatherList";

const WeatherList = () => {
  const [forecast, setForecast] = useState<DailyEntity[] | null | undefined>();
  const { selectedtrailDetails } = useContext(userContentState);
  const { trailCenter } = selectedtrailDetails;

  //Getting data from API
  const getData = async () => {
    const { daily } = await getWeatherData(trailCenter);
    if (daily) {
      setForecast(daily);
    }
  };
  useEffect(() => {
    getData();
  }, [selectedtrailDetails]);

  return (
    <>
      {forecast ? (
        <div className="scrollbar-hide w-full flex overflow-x-auto">
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
