import { format, parse } from 'date-fns';
import '../styles/CurrentWeather.css';

interface CurrentWeatherProps {
    data: {};
    location: string;
}

const getWindDescription = (windKph) => {
  if (windKph < 10) return 'Calm';
  if (windKph < 20) return 'A little breezy';
  if (windKph < 30) return 'Windy';
  return 'Very windy';
};

const getHumidityDescription = (humidity) => {
  if (humidity < 30) return 'Dry';
  if (humidity < 60) return 'Comfortable';
  if (humidity < 80) return 'Humid';
  return 'Sticky';
};

const getUVDescription = (uv) => {
  if (uv < 3) return 'Low';
  if (uv < 6) return 'Moderate';
  if (uv < 8) return 'High';
  if (uv < 11) return 'Very high';
  return 'Extreme';
};

const getDayAndHHMM = (rawdate: Date) => {
    const date = parse(rawdate, 'yyyy-MM-dd HH:mm', new Date());
    return format(date, 'EEEE HH:mm');
}

export default function CurrentWeather({data, location}: CurrentWeatherProps) {
    const { localtime, name } = location;
    const { temp_c, condition,feelslike_c, mintemp_c, maxtemp_c, wind_kph, humidity, uv } = data;

    return (
        <div className="current-weather">
            <div className="card left-card">
                <div>
                    <h2>{name}</h2>
                    <p>{getDayAndHHMM(localtime)}</p>
                    <h1 className='temp'>{Math.round(temp_c)}°C</h1>
                    <p>
                        ↑{maxtemp_c}°C / ↓{mintemp_c}°C
                    </p>
                    <p>Feels like {feelslike_c}</p>
                </div>
                <div className='condition'>
                    <img src={condition.icon} alt={condition.text} />
                    <h2 className='condition-text'>{condition.text}</h2>
                </div>
               
            </div>

            <div className="card right-card">
                <div className='detail-item'>
                    <span className='detail-label'>🍃 Wind</span>
                    <span className='detail-value'>
                        {wind_kph} km/h
                        <br/>
                        <small>{getWindDescription(wind_kph)}</small>
                    </span>
                </div>
                 <div className='detail-item'>
                    <span className='detail-label'>💧 Humidity</span>
                    <span className='detail-value'>
                        {humidity}%
                        <br/>
                        <small>{getHumidityDescription(humidity)}</small>
                    </span>
                </div>
                 <div className='detail-item'>
                    <span className='detail-label'>☀️ UV Index</span>
                    <span className='detail-value'>
                        {uv}
                        <br/>
                        <small>{getUVDescription(uv)}</small>
                    </span>
                </div>

            </div>
        </div>
    )
}