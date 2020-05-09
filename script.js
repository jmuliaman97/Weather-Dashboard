// add an event listener for the search button
document.getElementById('searchBtn').addEventListener('click', event => {
  event.preventDefault()

  // make sure to run fetch request if user actually put something in to the search input
  if (document.getElementById('searchInput').value.length > 1) {
    // make variable for city
    let city = document.getElementById('searchInput').value
    // get the city weather
    getWeather(city)
    // render search history
    renderHistory(city)

  }
})

// create function to get weather of the city
function getWeather(city) {
  // make a fetch request to grab the api from the openweathermap
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=94ffa4a34e5045f0fb8f1ff3a338a400`)
    .then(r => r.json())
    .then(data => {
      currentSearch = data
      // render current weather of the city
      renderCurrent()
      console.log(data)
    })
}

// make a function to render search history
function renderHistory(city) {
  // create element from list item
  let listItem = document.createElement('li')
  listItem.className = 'list-group-item'
  // innerHTML is the name of the city
  listItem.innerHTML = city
  // empty search input 
  document.getElementById('searchInput').value = ''
  // append list item to the search history
  document.getElementById('searchHistory').append(listItem)
}

// make a function to render current city
function renderCurrent() {
  // make a variable for temperature and change kelvin to fahrenheit
  let tempF = (currentSearch.list[0].main.temp - 273.15) * 1.80 + 32
  tempF = Math.floor(tempF)
  // make variable for current date
  let date = new Date()

  // create element for current forecast
  let currentForecast = document.createElement('div')
  currentForecast.className = 'card-body'
  currentForecast.innerHTML = `
        <h3>
          ${currentSearch.city.name}
        </h3>
        <p>
          Date: ${date}
        </p>
        <p>
          Temperature: ${tempF}°F
        </p>
        <p>
          Humidity: ${currentSearch.list[0].main.humidity}%
        </p>
        <p>
          Wind Speed: ${currentSearch.list[0].wind.speed}mph
        </p>
        `
  // empty current city
  document.getElementById('currentCity').innerHTML = ''
  // append currentForecast to current city
  document.getElementById('currentCity').append(currentForecast)

  // make function for the next 5 days of the forecast
  document.getElementById('forecast').innerHTML = renderForecastItem(0) + renderForecastItem(8) + renderForecastItem(16) + renderForecastItem(24) + renderForecastItem(32)
}

// make a function to render 5 day forecast
function renderForecastItem(forecastIndex) {
  let tempF = (currentSearch.list[0].main.temp - 273.15) * 1.80 + 32
  tempF = Math.floor(tempF)
  return `
        <div class = 'card text-white bg-primary mb-3' style= 'max-width: 18 rem;'>
        <div class = 'card-header'>${currentSearch.list[forecastIndex].dt_txt}</div>
        <div class = 'card-body'>
          <h5 class = 'card-title'><img src='http://openweathermap.org/img/wn/${currentSearch.list[forecastIndex].weather[0].icon}@2x.png'></h5>
          <p class = 'card-text'>
            Temperature: ${tempF}°F
          </p>
          <p class = 'card-text'>
            Humidity: ${currentSearch.list[forecastIndex].main.humidity}%
          </p>
        </div>
        </div>
        `
  // empty forecast of the city
  document.getElementById('forecast').innerHTML = ''
}

// create a click event for the search history
document.getElementById('searchHistory').addEventListener('click', event => {
  console.log(event.target.innerHTML);
  // make a variable for clicked city
  let clickedcity = event.target.innerHTML
  // get weather of the clicked city
  getWeather(clickedcity)
})