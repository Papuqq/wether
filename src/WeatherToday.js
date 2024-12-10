import format_date from "./format_date";
import './css/owfont-regular.css'


function WeatherToday(weather) {
	const imgURL = "owf owf-" + weather.weather[0].id + " owf-5x icon-style"
	return (
		<div>
			<div className='location-box'>
				
			</div>
			<div className='weather-box'>
				<div className='date-box'>{format_date(new Date((weather.dt + weather.timezone) * 1000))}</div>
				<i className={imgURL} title={weather.weather[0].description}></i>
				<div className='temp'>
					{Math.round(weather.main.temp)}°c
				</div>
			</div>
		</div>
	);
}

export default WeatherToday;