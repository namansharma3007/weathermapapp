import React, { useState, useEffect } from "react";
import "./MapCities.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import FetchDataCity from "../FetchData/FetchDataCity";


const MapCities = () => {


  const [cityName, setCity] = useState("");
  const [useCity, setuseCity] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
  };
 

  const { cityData, error } = FetchDataCity(cityName);

  const myIcon = L.icon({
    iconUrl: require("../../Assets/location.png"),
    iconSize: 30,
  });
  const center =
    cityData?.coord != null
      ? [cityData.coord.lat, cityData.coord.lon]
      : [28.6667, 77.2167];

  return (
    <section className="body-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={useCity}
          placeholder="enter your city"
          onChange={(event) => setuseCity(event.target.value)}
        />
        <button type="submit" onClick={() => setCity(useCity)}>
          Search
        </button>
      </form>
      <MapContainer
        id="map"
        zoom={2}
        center={center}
        scrollWheelZoom={true}
        fadeAnimation={true}
        markerZoomAnimation={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} icon={myIcon}>
          {cityData == null ? (
            <Popup>Fetching data or please select any city</Popup>
          ) : (
            <Popup>
              <p>{cityData?.name}</p>
              <div className="cloud-deiscription">
                <img
                  src={`https://openweathermap.org/img/wn/${cityData?.weather[0]?.icon}.png`}
                  alt="description"
                />
                <span>{cityData?.weather[0]?.description}</span>
              </div>
              <p>Temp: {cityData?.main ? `${cityData?.main?.temp}°C` : ""}</p>
              <p>
                Humidity: {cityData?.main ? `${cityData?.main?.humidity}%` : ""}
              </p>
              <p>
                Wind Speed:{" "}
                {cityData?.wind ? `${cityData?.wind?.speed} m/s` : ""}
              </p>
            </Popup>
          )}
        </Marker>
      </MapContainer>

      
    </section>
  );
};

export default MapCities;
