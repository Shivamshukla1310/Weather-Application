// Function to fetch coordinates for a city
async function getCoordinates(city) {
  const geoApiKey = "e369f3b73013371919c12ceb8d9b6cfd"; // Use a valid API key for geocoding if needed
  const geoApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${geoApiKey}`;

  try {
    const response = await fetch(geoApiUrl);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    if (data.length === 0) {
      throw new Error("City not found");
    }
    return { latitude: data[0].lat, longitude: data[0].lon };
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    alert("Error: " + error.message);
    return null;
  }
}

// Function to fetch weather data using OpenWeather API
async function fetchWeatherData(city) {
  const weatherApiKey = "e369f3b73013371919c12ceb8d9b6cfd";
  const coordinates = await getCoordinates(city);
  if (!coordinates) return;

  const { latitude, longitude } = coordinates;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${weatherApiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Weather data not found");
    }

    const data = await response.json();
    console.log("Weather data:", data);

    // Update DOM with fetched data
    document.getElementById(
      "city-name"
    ).textContent = `City: ${city} (Lat: ${latitude}, Lon: ${longitude})`;
    document.getElementById(
      "temperature"
    ).textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById(
      "weather-description"
    ).textContent = `Description: ${data.weather[0].description}`;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Error: " + error.message);
  }
}

// Event listener for search button
document.getElementById("search-btn").addEventListener("click", function () {
  const city = document.getElementById("city-input").value.trim();
  if (city) {
    fetchWeatherData(city);
  } else {
    alert("Please enter a city name.");
  }
});
