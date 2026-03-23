import { format, parseISO } from "date-fns";
import '../styles/WeeklyForecast.css'

export default function WeeklyForecast({data}: {data: any}) {
    return (
        <div className="daily-container card">
            {data.map((day: any, index: number) => (
                <div className="day-row" key={index}>
                    <div className="day-name">{format(parseISO(day.date), 'EEE')}</div>
                    <div className="day-rain">💧 {day.day.daily_chance_of_rain}%</div>
                    <div className="day-temp">↑{Math.round(day.day.maxtemp_c)}°C / ↓{Math.round(day.day.mintemp_c)}°C</div>
                    <div className="day-condition">
                        <img src={day.day.condition.icon} alt={day.day.condition.text} /> 
                        <span>{day.day.condition.text}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}