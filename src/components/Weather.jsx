import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [temp, setTemp] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [showMyComponent, setShowMyComponent] = useState(false);

  const getWeatherData = async (city, country) => {
    await axios({
      method: "GET",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=f75ca55e645718c7b385f47bf09f04a8`,
    })
      .then((res) => {
        console.log(res.data.main.temp);
        setTemp(res.data.main.temp - 275.15);
        setIcon(res.data.weather[0].icon);
        setMin(res.data.main.temp_min-275.15);
        setMax(res.data.main.temp_max-275.15);
        setDescription(res.data.weather[0].description);
        setCountry(res.data.sys.country);
        setShowMyComponent(true);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container my-4" >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Cityname" className="mx-1 p-1"
      />
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Countryname" className="mx-1 p-1"
      />
      <button
        onClick={() => getWeatherData(city, country)}
        className="btn btn-primary" style={{backgroundColor: "#51456a", fontWeight: "bold", fontSize: 20, border: 0}}
      >
        Get Weather
      </button>

      {showMyComponent ? (
           <div className="data_container p-4 my-5">
           <h1>
             {city}, {country}
           </h1>
           <div className="my-2">
             <img
               src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
               alt="weather-icon"
               style={{ width: 100, height: 100 }}
             />
           </div>
           {temp ? <h1>{Math.floor(temp)}°C</h1> : null}
           <h4 className="my-4">Min: <span>{Math.floor(min)}°C</span> <span className="mx-3">|</span> Max: <span>{Math.floor(max)}°C</span></h4>
           <h1>{description}</h1>
           <h4 className="my-4">Date: {new Date().toLocaleDateString()}</h4>
         </div>
      ): null}

    
    </div>
  );
};

export default Weather;
