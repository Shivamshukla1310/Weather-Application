// Function to fetch coordinates for a city
async function getCoordinates(city) {
  const geoApiKey = "e369f3b73013371919c12ceb8d9b6cfd";
  const geoApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${geoApiKey}`;

  try {
    const response = await fetch(geoApiUrl);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    if (data.length === 0) throw new Error("City not found");

    return { latitude: data[0].lat, longitude: data[0].lon };
  } catch (error) {
    alert("Error: " + error.message);
    return null;
  }
}

// Function to fetch weather data
async function fetchWeatherData(city) {
  const weatherApiKey = "e369f3b73013371919c12ceb8d9b6cfd";
  const coordinates = await getCoordinates(city);
  if (!coordinates) return;

  const { latitude, longitude } = coordinates;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${weatherApiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Weather data not found");

    const data = await response.json();

    document.getElementById("city-name").textContent = `City: ${city}`;
    document.getElementById(
      "temperature"
    ).textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById(
      "weather-description"
    ).textContent = `Description: ${data.weather[0].description}`;
  } catch (error) {
    alert("Error: " + error.message);
  }
}

// Event listeners
document.getElementById("search-btn").addEventListener("click", function () {
  const city = document.getElementById("city-input").value.trim();
  if (city) fetchWeatherData(city);
  else alert("Please enter a city name.");
});

// Fetch weather using geolocation
document.getElementById("location-btn").addEventListener("click", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const reverseGeoUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=e369f3b73013371919c12ceb8d9b6cfd`;
      const response = await fetch(reverseGeoUrl);
      const data = await response.json();
      const city = data[0].name;
      fetchWeatherData(city);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});
