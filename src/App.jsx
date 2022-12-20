import React, { useEffect, useState } from "react";

const API = {
  base: "https://api.openweathermap.org/data/2.5/",
  key: "9326d6d1c72e90183cfd51bbbce1c620",
};

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;

      setIsLoading(true);

      try {
        const url = `${API.base}weather?q=${searchCity}&appid=${API.key}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          setErrorMsg(null);
          setWeatherInfo(`${data.name}, ${data.sys.country}, ${data.weather[0].description}`);
          console.log(data);
        } else {
          setErrorMsg(data.message);
        }
      } catch (error) {
        setErrorMsg(error.message);
      }

      setIsLoading(false);
    };

    fetchWeatherData();
  }, [searchCity]);

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="city"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button>Search</button>
      </form>
      {isLoading ? <div>Loading...</div> : <></>}
      {!errorMsg ? (
        <div>{weatherInfo}</div>
      ) : (
        <div style={{ color: "red" }}>{errorMsg}</div>
      )}
    </>
  );
};

export default App;
