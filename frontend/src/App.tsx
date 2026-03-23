import { useEffect, useState } from 'react'
import { getWeatherData } from './api'

import './App.css'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import WeeklyForecast from './components/WeeklyForecast';
import { parse } from 'date-fns';

interface WeatherData {
  current: any; 
  hourly: [];
  weekly: [];
  location: string
}

const getGradientClass = (hour: any) => {
    if (hour >= 6 && hour < 12) {
      return 'bg-morning';
    } else if (hour >= 12 && hour < 18) {
      return 'bg-day';
    } else if (hour >= 18 && hour < 21) {
      return 'bg-evening';
    } else {
      return 'bg-night';
    }
  }

function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [city, setCity] = useState('Buenos Aires')
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  const hour = weatherData?.location?.localtime
  ? parse(
    weatherData.location.localtime,
    'yyyy-MM-dd HH:mm',
    new Date()
  ): new Date().getHours();
 
  const gradientClass = getGradientClass(hour)


  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)
      setError('')

      try {
        const data = await getWeatherData(city)

        const { mintemp_c, maxtemp_c} = data.forecast.forecastday[0].day

        setWeatherData({
          current: {...data.current, mintemp_c, maxtemp_c},
          hourly: data.forecast.forecastday[0].day,
          weekly: data.forecast.forecastday.slice(1),
          location: data.location
        })
        setError('')
      } catch (e) {
        setError(`Error: ${e}`);
      } finally {
        setLoading(false);
      }
    }
    
    fetchWeather()
  }, [city]);
  
  console.log(weatherData)

  return (
    <div className={`app ${gradientClass}`}>
      <div className='container'>
        <SearchBar onSearch={setCity} />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weatherData && (
          <div>
            <CurrentWeather data={weatherData.current} location={weatherData.location} />
            <HourlyForecast data={weatherData.hourly} />
            <WeeklyForecast data={weatherData.weekly} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
