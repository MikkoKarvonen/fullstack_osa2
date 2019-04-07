import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [ toShow, setToShow ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    const val = event.target.value;
    var result = countries.filter(obj => {
      return obj.name.toLowerCase().includes(val.toLowerCase())
    })
    if (result.length > 10){
      setToShow(<p>Too many countries, specify another filter</p>)
    } else {
      if (result.length === 1){
        setToShow(result.map((res) => (
          <div key={res.name}>
            <h1>{res.name}</h1>
            <p>capital {res.capital}</p>
            <p>population {res.population}</p>
            <h2>languages</h2>
            <ul>
              {res.languages.map((lang) => <li key={lang.name}>{lang.name}</li>)}
            </ul>
            <img src={res.flag} alt={res.name}/>
          </div>
        )))
      } else {
        setToShow(result.map((res) => <p key={res.name}>{res.name}</p>))
      }
    }
  }

  return (
    <div>
      find countries <input  onChange={handleSearchChange} />
      {toShow}
    </div>
  );
}


export default App;
