import { GeoPoint } from "firebase/firestore";
import { Position } from "geojson";
import { Weather } from "../components/WeatherList/typesWeatherList";

const getWeatherData = async (trailCenter: GeoPoint) => {
  // const lat = trailCenter && trailCenter.latitude && 49.246292;
  // const lng = trailCenter && trailCenter.longitude && -123.116226;
  const lat = trailCenter.latitude;
  const lng = trailCenter.longitude;
  const app_id = import.meta.env.VITE_OPEN_WEATHER_APP_ID;
  const url_api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly,alerts&units=metric&appid=${app_id}`;
  const response = await fetch(url_api);
  const data: Weather = await response.json();
  console.log(data);
  return data;
};

export default getWeatherData;
