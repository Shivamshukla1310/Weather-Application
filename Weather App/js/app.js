// Function to fetch weather data using Agromonitoring API
async function fetchWeatherData(city) {
  const apiKey = "e369f3b73013371919c12ceb8d9b6cfd"; // Added actual API key

  // Placeholder coordinates (update with dynamic coordinates if needed)
  const latitude = 35; // Example latitude
  const longitude = 139; // Example longitude
  const apiUrl = `https://api.agromonitoring.com/agro/1.0/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

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
    ).textContent = `Coordinates: (${latitude}, ${longitude})`;
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
    // Currently, fetchWeatherData uses static coordinates.
    // You can implement a geocoding API to convert city names to coordinates if needed.
    fetchWeatherData(city);
  } else {
    alert("Please enter a city name.");
  }
});
