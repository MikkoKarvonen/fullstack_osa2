import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = (props) => {
    const [toShow, setToShow] = useState('')
    console.log(props.res.capital);
    useEffect(() => {
        axios
            .get(`https://api.apixu.com/v1/current.json?key=f7ad4672325543cc95a61335190704&q=${props.res.capital}`)
            .then(response => {
                setToShow(() => (
                    <div>
                        <h2>Weather in {props.res.capital}</h2>
                        <p><strong>temperature: </strong>{response.data.current.temp_c} Celsius</p>
                        <img src={response.data.current.condition.icon} alt={response.data.current.condition.text}/>
                        <p><strong>wind: </strong>{response.data.current.wind_kph} kph direction {response.data.current.wind_dir}</p>
                    </div>
                ))
            })
    }, [])

    return (
        <div>
            {toShow}
        </div>
    )
}

export default Weather