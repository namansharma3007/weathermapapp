import React, { useState, useEffect } from "react";
import "./MapCities.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import FetchDataCity from "../FetchData/FetchDataCity";

const cities = ["New York","Agra","Chicago","Houston","Phoenix","Philadelphia","San Antonio","San Diego","Dallas","San Jose","Austin","Jacksonville","Fort Worth","Columbus","San Francisco","Charlotte","Indianapolis","Seattle","Denver","Washington DC","Boston","Nashville","El Paso","Detroit","Memphis","Portland","Alaska","Delhi","Louisville","Baltimore"];

const MapCities = () => {
  const [page, setPage] = useState(1);
  const size = 10;
  const [citiesToDisplay, setCitiesToDisplay] = useState([]);

  // select the list to be displayed
  useEffect(() => {
    const skip = size * (page - 1);
    const limit = size;
    setCitiesToDisplay(cities.slice(skip, skip + limit));
  }, [page, size]);

  const [cityName, setCity] = useState("");

  const citiesLinks = citiesToDisplay
    ? citiesToDisplay.map((item) => (
        <a
          className="cities-name"
          href="#"
          key={item}
          onClick={() => setCity(item)}
        >
          <span>{item}</span>
        </a>
      ))
    : null;

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
          {cityData == null ? <Popup>Fetching data or please select any city</Popup> : 
          <Popup>
            <p>{cityData?.name}</p>
            <div className="cloud-deiscription">
              <img src={`https://openweathermap.org/img/wn/${cityData?.weather[0]?.icon}.png`} alt="description" />
              <span>{cityData?.weather[0]?.description}</span>
            </div>
            <p>Temp: {cityData?.main ? `${cityData?.main?.temp}°C` : ""}</p>
            <p>
              Humidity: {cityData?.main ? `${cityData?.main?.humidity}%` : ""}
            </p>
            <p>
              Wind Speed: {cityData?.wind ? `${cityData?.wind?.speed} m/s` : ""}
            </p>
          </Popup>
}
        </Marker>
      </MapContainer>

      <aside className="list-cities">{citiesLinks}</aside>
      <div className="pagination-section">
        {page > 1 ? <button className="pagination-button" onClick={() => setPage(page-1)}>Prev</button> : null}
        {page < 3 ? <button className="pagination-button" onClick={()=> setPage(page+1)}>Next</button> : null}
      </div>
    </section>
  );
};

export default MapCities;
