import React, { useState, useEffect } from "react";
import Search from "./Search";
import { FaStar, FaGithub, FaLinkedin } from "react-icons/fa";
import cloudybg from "../assets/cloudy.mp4";
import rainbg from "../assets/Rain.mp4";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [background, setBackground] = useState('');

  useEffect(() => {
    if (search.trim()) fetchWeatherData(search);
  }, [search]);

  const fetchWeatherData = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=556d12137eb0f27349e311fd073882fd&units=metric`
      );

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const data = await response.json();
      setWeatherData(data);
      setBackground(data.weather[0].main.toLowerCase().includes('rain') ? rainbg : cloudybg);
    } catch (error) {
      if (error.message !== "Not Found") setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getIconSize = () => 'text-4xl';

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center relative">
      {background && (
        <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-[-1]">
          <source src={background} type="video/mp4" />
        </video>
      )}
      <div className="max-w-md w-full p-4">
        <Search search={search} setSearch={setSearch} handleSearch={() => {}} />
        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-white">Loading...</p>
          </div>
        ) : weatherData && (
          <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-6 text-gray-800">
            <h2 className="text-3xl font-bold mb-2 text-center">
              {weatherData.name}, {weatherData.sys?.country}
            </h2>
            <div className="text-5xl font-bold text-center text-blue-500 mb-4">
              {Math.round(weatherData.main.temp)}°C
            </div>
            <p className="text-center text-xl mb-6">{weatherData.weather[0]?.description}</p>
            <div className="flex justify-around text-center">
              <div>
                <p className="text-2xl font-semibold text-blue-500">{weatherData.wind?.speed} m/s</p>
                <p className="text-gray-600">Wind Speed</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-blue-500">{weatherData.main.humidity}%</p>
                <p className="text-gray-600">Humidity</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-4 mt-10">
        <a
          href="https://github.com/developer-khadim"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <FaGithub className={`text-white hover:text-blue-500 ${getIconSize()}`} />
        </a>
        <a
          href="https://www.linkedin.com/in/khadim-ali12"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <FaLinkedin className={`text-white hover:text-blue-500 ${getIconSize()}`} />
        </a>
      </div>
      <p className="text-white mt-2 text-center ">
        Please like and follow on GitHub and LinkedIn
      </p>
    </div>
  );
};

export default Weather;