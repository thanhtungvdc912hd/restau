const URL = 'http://api.openweathermap.org/data/2.5/weather?units=metric&appid=2b706060f0ae53d0515a98a787b0953e&q='

function getTemp(cityName) {
  return fetch(URL + cityName)
  .then(res => res.json())
  .then(resJSON => resJSON.main.temp)
}

export default getTemp;
