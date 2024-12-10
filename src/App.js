import React, { useState } from 'react';
import WeatherToday from './WeatherToday';
import WeatherForecast from './WeatherForecast';
import './App.css'

// доступ к API сервиса погоды
const api = {
  key: '7d9d632bc6916a92fc14f219a258a5ae',
  base: 'http://api.openweathermap.org/data/2.5/'
}

function App() {

  // действия при изменении города в поле ввода
  const [city, setCity] = useState('');

  // действия с данными погоды
  const [weather_forecast, setWeatherForecast] = useState({});	// вся информация в массиве weather
  const [weather_today, setWeatherToday] = useState({});	// вся информация в массиве weather

  const [isOneDayMode, setOneDayMode] = useState(true);

  // обработчик, который срабатывает когда нажата клавиша Enter
  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}forecast?q=${city}&units=metric&appid=${api.key}`) // отправляем запрос на 5 дней
        .then(res => res.json())  // ответ преобразуем в json
        .then(result => {         // работаем с результатом
          setWeatherForecast(result);
          result.list = result.list.filter(reading => (reading.dt - (43200 - result.city.timezone)) % 86400 === 0) // фильтрация - 12 часов каждого дня по месному времени
          console.log('прогноз на 5 дней', result);
        });

      fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`) // отправляем запрос на день
        .then(res => res.json())  // ответ преобразуем в json
        .then(result => {         // работаем с результатом
          setWeatherToday(result);
          setCity('');			  // очищаем переменную city
          console.log('прогноз на сейчас', result);
        });

    }
  }


  // JSX разметка
  return (
    <>
      <div className='search-box'>
        <input
          type='text'
          list="sity"
          className='search-bar'
          placeholder='Поиск...'
          onChange={e => setCity(e.target.value)}
          value={city}
          onKeyUp={search}	// следим за нажатием кнопки
        />
      </div>

      <datalist id="sity">
        <option value="Tula" label="Тула" />
        <option value="Orel" label="Орел" />
        <option value="Omsk" label="Омск" />
        <option value="kaluga" label="Калуга" />
        <option value="Moskva" label="Москва" />
      </datalist>



      {(typeof weather_forecast.list != 'undefined') ? (
        <div className='location-box'>
          <div className='location'>{weather_forecast.city.name}</div>
          <button onClick={() => setOneDayMode(!isOneDayMode)}>
            {isOneDayMode ? '| Показать на 5 дней |' : '| Показать на 1 день |'}
          </button>
          {isOneDayMode ? (
            <div>
              <h2>Прогноз на 1 день</h2>
              {WeatherToday(weather_today)}
            </div>
          ) : (
            <div>
              <h2>Прогноз на 5 дней</h2>
              <div className='weathers'>
                {weather_forecast.list.map(arg => (
                  WeatherForecast(arg, weather_forecast.city.timezone)
                ))}
              </div>
            </div>
          )}
        </div>
      ) : ('')}
    </>
  );
}

export default App;
