import { format, parse } from "date-fns";
import '../styles/HourlyForecast.css';

const HourlyForecast = ({data}: {data: any}) => {
    return (
        <div className="hourly-container card">
            {
                data.map((hour: any, index: number) => (
                    <div className="hour-card" key={index}>
                        <div className="hour-time">
                            {
                                format(parse(hour.time, 'yyyy-MM-dd HH:mm', new Date()), 'h a')
                            }
                        </div>
                        <img src={hour.condition.icon} alt={hour.condition.text} />
                        <div className="hour-temp">
                            {Math.round(hour.temp_c)}°C
                        </div>
                        <div className="hour-rain">
                            💧 {Math.round(hour.chance_of_rain)}%
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default HourlyForecast;