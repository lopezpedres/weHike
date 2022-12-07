import { Position } from "geojson";
import { Weather } from "../components/WeatherList/typesWeatherList";

const getWeatherData = async (trailCenter: Position | undefined) => {
  const lat = trailCenter && trailCenter[1] && 49.246292;
  const lng = trailCenter && trailCenter[0] && -123.116226;
  const url_api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly,alerts&units=metric&appid=73cce46ae9879039e86b28fb3ec5ed98`;
  const response = await fetch(url_api);
  const data: Weather = await response.json();
  return data;
};

export default getWeatherData;
