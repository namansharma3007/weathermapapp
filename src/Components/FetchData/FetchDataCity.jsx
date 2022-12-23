import { useState, useEffect } from 'react';

const FetchDataCity = city => {
  const [cityData, setCityData] = useState(null);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://sideways-helix-mallow.glitch.me/weather/${city}`);
        const data = await response.json();
        setCityData(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchData();
  }, [city]);

  return { cityData, error };
};

export default FetchDataCity;
