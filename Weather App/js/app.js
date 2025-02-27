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
