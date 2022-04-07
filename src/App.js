import React, { useState, useEffect } from "react";
import "./App.css";
const api = {
  key: `15c1fbe1b5abd6a39f2481ae426fe5e4`,
  base: `https://api.openweathermap.org/data/2.5/`,
};
function App() {
  const [weatherInput, setWeatherInput] = useState("");
  const [weatherOutPut, setWeatherOutPut] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState("");
  const [loading, setLoading] = useState(false);

  function handlerWeatherInput(e) {
    setWeatherInput(e.target.value);
  }
  function handlerSubmit(e) {
    e.preventDefault();
    setWeatherOutPut(weatherInput);
  }
  useEffect(() => {
    const fetchDataWeather = async () => {
      if (!weatherOutPut) return;
      setLoading(true);
      try {
        const url = `${api.base}weather?q=${weatherInput}&units=metric&APPID=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setWeather(
            `${data.name} , ${data.sys.country}, ${data.weather[0].description} , ${data.main.temp}°c`
          );
          setError("");
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchDataWeather();
  }, [weatherOutPut]);
  return (
    <div className="container">
      <form onSubmit={handlerSubmit}>
        <input
          type="text"
          value={weatherInput}
          onChange={handlerWeatherInput}
          placeholder="Search for a city"
          className="input"
        />
        <button className="button">Search</button>
      </form>
      {loading ? (
        <div className="loading">loading...</div>
      ) : (
        <>
          {error ? (
            <div className="error">{error}</div>
          ) : (
            <div className="weather">{weather}</div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
