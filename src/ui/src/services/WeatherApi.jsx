const BASE_URL = 'https://api.weatherapi.com/v1/'
const currentApi = 'current.json'
const forecastApi = 'forecast.json'
const airQualityIndex = 'no'
const days=3
const apiKey = '712d8a9bbf3f48d4b6370311231901'    

export const getCurrentWeather = async (location) => {
   try {
      const queryParams = new URLSearchParams({
         key: apiKey,
         q: location,
         aqi: airQualityIndex
      })

      return await fetch(`${BASE_URL}${currentApi}?${queryParams}`)
      .then( resp => resp.json() )
      .then( data => data )
   }   
   catch ( error ) {
      console.log(error)
      return null;
   }
}

export const getForecastWeather = async ({location}) => {   
   try {
      const queryParams = new URLSearchParams({
         key: apiKey,
         q: location,
         days: days,
         aqi: airQualityIndex

      })

      const res = await fetch(`${BASE_URL}${currentApi}?${queryParams}`)
      const items = res.json();
   }   
   catch (error ) {
      throw error
   }
}