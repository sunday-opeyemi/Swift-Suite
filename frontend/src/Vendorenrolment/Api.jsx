import React, { useState, useEffect } from 'react';

function Api() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    // Fetching countries
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        // Extracting country names from the response
        const countryNames = data.map(country => country.name.common);
        setCountries(countryNames);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });

    // Fetching states
    fetch('https://api.first.org/data/v1/countries')
      .then(response => response.json())
      .then(data => {
        // Extracting state names from the response
        const stateNames = Object.values(data.data).reduce((acc, country) => {
          return acc.concat(country.regions.map(region => region.name));
        }, []);
        setStates(stateNames);
      })
      .catch(error => {
        console.error('Error fetching states:', error);
      });
  }, []);

  return (
    <div>
      <h1>Choose a Country:</h1>
      <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
        <option value="">Select Country</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>{country}</option>
        ))}
      </select>

      {selectedCountry && (
        <div>
          <h1>Choose a State/Province:</h1>
          <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
            <option value="">Select State/Province</option>
            {states.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default Api;