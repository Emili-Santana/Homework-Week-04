import React, { useState } from "react";
import axios from "axios";
import "./styles.css"; //import style file
import ReactAnimatedWeather from "react-animated-weather";

const Weather = (props) => {
  // Define and save the component's state
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");

  //function will be called when API is received
  const showTemperature = (response) => {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  };
  //function will be called when form is sent  and request API
  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a94f3778290bfeee61278505dbbe51d&units=metric`;

    axios
      .get(url)
      .then(showTemperature)
      .catch((error) => {
        setMessage("City not found or API error.");
        setLoaded(false);
      });

    setMessage(`The weather in ${city.toUpperCase()} is: `); // Set the message
  }

  //function will be called when user type the city
  function updateCity(event) {
    setCity(event.target.value); //Updated the city sta
  }

  let form = (
    <form onSubmit={handleSubmit}>
      {" "}
      {/* Call the function handleSubmit when form is sent */}
      <input
        type="search"
        onChange={updateCity}
        placeholder="Enter a city"
        required
        className="form-input"
      />{" "}
      {/* Updated 'city'  */}
      <input type="submit" value="Search" className="button" />{" "}
      {/* Sent the form*/}
    </form>
  );

  // if receive the data, show the weather information
  if (loaded) {
    // Array information
    const weatherDetails = [
      { label: "Temperature", value: `${Math.round(weather.temperature)}°C` },
      { label: "Description", value: weather.description },
      { label: "Humidity", value: `${weather.humidity}%` },
      { label: "Wind", value: `${weather.wind} km/h` },
    ];

    return (
      <div>
        <h1>Weather App</h1>
        <ReactAnimatedWeather
          icon="CLEAR_DAY"
          color="red"
          size={34}
          animate={true}
          className="icon"
          padding
        />
        <ReactAnimatedWeather
          icon="PARTLY_CLOUDY_DAY"
          color="yellow"
          size={34}
          animate={true}
          className="icon"
        />

        <ReactAnimatedWeather
          icon="RAIN"
          color="purple"
          size={34}
          className="icon"
          animate={true}
        />
        {form}
        <br />
        <h2>{message}</h2>
        <ul>
          {/* With .map() transform array in a list */}
          {weatherDetails.map((detail, index) => (
            <li key={index}>
              <strong> {detail.label}</strong>: {detail.value}
            </li>
          ))}
        </ul>
        <img src={weather.icon} alt={weather.description} />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Weather App</h1>
        <ReactAnimatedWeather
          icon="CLEAR_DAY"
          color="red"
          size={34}
          animate={true}
          className="icon"
        />
        <ReactAnimatedWeather
          icon="PARTLY_CLOUDY_DAY"
          color="yellow"
          size={34}
          animate={true}
          className="icon"
        />
        <ReactAnimatedWeather
          icon="RAIN"
          color="purple"
          size={34}
          className="icon"
          animate={true}
        />
        {form}
        {message && <h2>{message}</h2>}{" "}
        
      </div>
    );
  }
};

export default Weather;
