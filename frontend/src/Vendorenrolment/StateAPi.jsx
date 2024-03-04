import React, { useEffect, useState } from 'react';

const StateAPI = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  // Fetching countries and states
  useEffect(() => {
    fetch('https://api.first.org/data/v1/countries')
      .then(response => response.json())
      .then(data => {
        // Extracting country names from the response
        const countryNames = Object.keys(data.data);
        setCountries(countryNames);

        // Extracting state names from the response
        const stateNames = Object.values(data.data).reduce((acc, country) => {
          return acc.concat(country.regions.map(region => region.name));
        }, []);
        setStates(stateNames);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  return (
    <div>
      <h1>List of Countries</h1>
      <ul>
        {countries.map((country, index) => (
          <li key={index}>{country}</li>
        ))}
      </ul>

      <h1>List of States/Provinces</h1>
      <ul>
        {states.map((state, index) => (
          <li key={index}>{state}</li>
        ))}
      </ul>
    </div>
  );
};

export default StateAPI;
