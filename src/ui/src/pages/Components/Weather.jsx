import React, {useState, useEffect} from "react";
import '../../styles/components/weather.scss'
import { getCurrentWeather } from "../../services/WeatherApi";

function Weather() {

   const [query, setQuery] = useState('95035')

   const [city, setCity] = useState('')
   const [state, setState] = useState('')
   const [temp, setTemp] = useState(0)
   const [condition, setCondition] = useState(null)
   
   useEffect(() => {
      getCurrentWeather(query)
         .then( success => {
            // console.log( 'here: ', success)
            setCity( success.location.name)
            setState( success.location.region)
            setTemp( success.current.temp_f )
            setCondition( success.current.condition )
         })
         .catch( error => console.log( "could not fetch weather. ", error ))
      
   }, [])

   const renderWeather = () => {
      if ( !(city && state && temp && condition )) {
         return null;
      }

      return (
         <div className="weather-container">
            <div className="weather-header">
               Weather
               {/* <span><img src={condition.icon}></img></span> */}
            </div>
            
            <div className="weatherInfo">              
               <span className="temperature">{String(temp).padStart(3, ' ')}</span>              
               <span className="scale">F</span>
            </div>
            <div className="geolocation">{city + ", " + state}</div>
         </div>
      )
   }

   return (      
      <div className="weather">
         { renderWeather() }
      </div>
   )
}

export default Weather