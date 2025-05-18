# Weather-Application
Weather Application Project
================================================
FILE: README.md
================================================
# Weather-Application
Weather Application Project



================================================
FILE: docs/app.js
================================================
// Application Codegit add .
document
    .getElementById("search-btn")
    .addEventListener("click", async function () {
        const city = document.getElementById("city-input").value.trim();
        if (!city) {
            alert("Please enter a city name.");
            return;
        }
        fetchWeatherData(city);
    });

document.getElementById("location-btn").addEventListener("click", function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherByCoordinates(lat, lon);
            },
            () => {
                alert("Unable to access location.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

async function fetchWeatherData(city) {
    const apiKey = "e369f3b73013371919c12ceb8d9b6cfd";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Weather data not found");
        const data = await response.json();
        updateUI(data, city);
    } catch (error) {
        alert(error.message);
    }
}

async function fetchWeatherByCoordinates(lat, lon) {
    const apiKey = "e369f3b73013371919c12ceb8d9b6cfd";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Weather data not found");
        const data = await response.json();
        updateUI(data, "Your Location");
    } catch (error) {
        alert(error.message);
    }
}

function updateUI(data, city) {
    document.getElementById("city-name").textContent = `City: ${city}`;
    document.getElementById(
        "temperature"
    ).textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById(
        "weather-description"
    ).textContent = `Description: ${data.weather[0].description}`;
}



================================================
FILE: docs/index.html
================================================
<!-- Weather Application Done-->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Weather App</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="container">
      <h1 class="fade-in">Weather App</h1>
      <div class="search-box slide-in">
        <input
          type="text"
          id="city-input"
          placeholder="Enter city name"
          class="input-box"
        />
        <button id="search-btn" class="btn">Search</button>
        <button id="location-btn" class="btn">Access My Location</button>
      </div>
      <div class="weather-info zoom-in">
        <p id="city-name">City: -</p>
        <p id="temperature">Temperature: -</p>
        <p id="weather-description">Description: -</p>
      </div>
      <div class="forecast fade-in">
        <h2>3-Day Weather Forecast</h2>
        <div class="forecast-days">
          <div class="day-card">
            <div class="day-date">Monday</div>
            <div class="day-weather-icon">
              <img src="cloud.png" alt="Weather Icon" />
            </div>
            <div class="day-temperature">25°C</div>
            <div class="day-description">Partly Cloudy</div>
          </div>
          <div class="day-card">
            <div class="day-date">Tuesday</div>
            <div class="day-weather-icon">
              <img src="sunny-day.png" alt="Weather Icon" />
            </div>
            <div class="day-temperature">28°C</div>
            <div class="day-description">Sunny</div>
          </div>
          <div class="day-card">
            <div class="day-date">Wednesday</div>
            <div class="day-weather-icon">
              <img src="rainy.png" alt="Weather Icon" />
            </div>
            <div class="day-temperature">22°C</div>
            <div class="day-description">Rainy</div>
          </div>
        </div>
      </div>
    </div>
    <script src="app.js"></script>
  </body>
</html>



================================================
FILE: docs/style.css
================================================
body {
    font-family: Arial, sans-serif;
    background: linear-gradient(to right, #6a11cb, #2575fc);
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .container {
    background: linear-gradient(to bottom, #6cccf8, #ff7eb3);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 400px;
    animation: fadeIn 1s ease-in-out;
  }
  
  h1 {
    color: #fff;
    margin-bottom: 20px;
  }
  
  .search-box {
    display: flex;
    gap: 10px;
  }
  
  .input-box {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    flex-grow: 1;
  }
  
  .btn {
    padding: 10px;
    background: #272d85;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .btn:hover {
    background: #e91e63;
  }
  
  .weather-info {
    background: rgba(255, 255, 255, 0.2);
    padding: 20px;
    border-radius: 8px;
    margin-top: 20px;
    color: white;
  }
  
  .forecast {
    text-align: center;
    margin-top: 20px;
  }
  
  .forecast-days {
    display: flex;
    justify-content: space-around;
    gap: 10px;
  }
  
  .day-card {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 15px;
    width: 100px;
    text-align: center;
    color: white;
  }
  
  .day-card img {
    width: 50px;
    height: 50px;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  


================================================
FILE: Weather App/index.html
================================================
<!-- Weather Application Done-->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Weather App</title>
    <link rel="stylesheet" href="./css/style.css" />
  </head>
  <body>
    <div class="container">
      <h1 class="fade-in">Weather App</h1>
      <div class="search-box slide-in">
        <input
          type="text"
          id="city-input"
          placeholder="Enter city name"
          class="input-box"
        />
        <button id="search-btn" class="btn">Search</button>
        <button id="location-btn" class="btn">Access My Location</button>
      </div>
      <div class="weather-info zoom-in">
        <p id="city-name">City: -</p>
        <p id="temperature">Temperature: -</p>
        <p id="weather-description">Description: -</p>
      </div>
      <div class="forecast fade-in">
        <h2>3-Day Weather Forecast</h2>
        <div class="forecast-days">
          <div class="day-card">
            <div class="day-date">Monday</div>
            <div class="day-weather-icon">
              <img src="./images/cloud.png" alt="Weather Icon" />
            </div>
            <div class="day-temperature">25°C</div>
            <div class="day-description">Partly Cloudy</div>
          </div>
          <div class="day-card">
            <div class="day-date">Tuesday</div>
            <div class="day-weather-icon">
              <img src="./images/sunny-day.png" alt="Weather Icon" />
            </div>
            <div class="day-temperature">28°C</div>
            <div class="day-description">Sunny</div>
          </div>
          <div class="day-card">
            <div class="day-date">Wednesday</div>
            <div class="day-weather-icon">
              <img src="./images/rainy.png" alt="Weather Icon" />
            </div>
            <div class="day-temperature">22°C</div>
            <div class="day-description">Rainy</div>
          </div>
        </div>
      </div>
    </div>
    <script src="./js/app.js"></script>
  </body>
</html>



================================================
FILE: Weather App/css/style.css
================================================
body {
  font-family: Arial, sans-serif;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  background: linear-gradient(to bottom, #6cccf8, #ff7eb3);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px;
  animation: fadeIn 1s ease-in-out;
}

h1 {
  color: #fff;
  margin-bottom: 20px;
}

.search-box {
  display: flex;
  gap: 10px;
}

.input-box {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex-grow: 1;
}

.btn {
  padding: 10px;
  background: #272d85;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn:hover {
  background: #e91e63;
}

.weather-info {
  background: rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  color: white;
}

.forecast {
  text-align: center;
  margin-top: 20px;
}

.forecast-days {
  display: flex;
  justify-content: space-around;
  gap: 10px;
}

.day-card {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  width: 100px;
  text-align: center;
  color: white;
}

.day-card img {
  width: 50px;
  height: 50px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}




================================================
FILE: Weather App/js/app.js
================================================
// Application Codegit add .
document
  .getElementById("search-btn")
  .addEventListener("click", async function () {
    const city = document.getElementById("city-input").value.trim();
    if (!city) {
      alert("Please enter a city name.");
      return;
    }
    fetchWeatherData(city);
  });

document.getElementById("location-btn").addEventListener("click", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherByCoordinates(lat, lon);
      },
      () => {
        alert("Unable to access location.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

async function fetchWeatherData(city) {
  const apiKey = "e369f3b73013371919c12ceb8d9b6cfd";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather data not found");
    const data = await response.json();
    updateUI(data, city);
  } catch (error) {
    alert(error.message);
  }
}

async function fetchWeatherByCoordinates(lat, lon) {
  const apiKey = "e369f3b73013371919c12ceb8d9b6cfd";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather data not found");
    const data = await response.json();
    updateUI(data, "Your Location");
  } catch (error) {
    alert(error.message);
  }
}

function updateUI(data, city) {
  document.getElementById("city-name").textContent = `City: ${city}`;
  document.getElementById(
    "temperature"
  ).textContent = `Temperature: ${data.main.temp} °C`;
  document.getElementById(
    "weather-description"
  ).textContent = `Description: ${data.weather[0].description}`;
}


