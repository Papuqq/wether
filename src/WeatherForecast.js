import format_date from "./format_date";
import './css/owfont-regular.css'


function WeatherForecast(weather, timezone){
    const imgURL = "owf owf-"+ weather.weather[0].id +" owf-5x icon-style"

    return (
        <div key={weather.dt} className='weather-box'>
            <div className='date-box'>{format_date(new Date((weather.dt + timezone) * 1000))}</div>
            <div>
                <i className={imgURL} title={weather.weather[0].description}></i>
            </div>
            <div className='temp'>
                {Math.round(weather.main.temp)}°c
            </div>
        </div>
    );
}

export default WeatherForecast;