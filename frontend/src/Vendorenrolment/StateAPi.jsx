import React, { useEffect, useState } from 'react';

const StateApi = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setCountries(data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      <h1>Country List with States</h1>
     
    </div>
  );
};

export default StateApi;
