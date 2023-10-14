// OpenWeather API Key
const apiKey = "023d873c6169369be5faffbf2aa16d3d";

// Declare Variables
const results = document.getElementById("results");
const search = document.getElementById("search");
const city = document.getElementById("city");
// const state = "MN";
const country = "United States";
const limit = 1;
const unit = "imperial";

// Fetch Weather Data
const fetchWeather = async () => {
   const geocodingURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city.value},${country}&limit=${limit}&appid=${apiKey}`;

   if (!city.value) {
    alert('Please enter a valid city name.');
    return;
   }

  try {
    // Fetch the Lat/Lon based on the provided City & State
    const response = await fetch(geocodingURL);
    const data = await response.json();
    const { lat, lon, state } = data[0];
    // console.log(data);
    // Fetch Weather Data
    const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;

    const weatherResponse = await fetch(openWeatherURL);
    const weatherData = await weatherResponse.json();
        // console.log(weatherData);
        let region = weatherData.name;
        let temp = weatherData.main.temp;
        let humidity = weatherData.main.humidity;
        let conditions = weatherData.weather[0].main;

        results.innerHTML = `
            <h2>Current Weather in ${region}, ${state}</h2>
            <p>Temperature: ${temp} °F</p>
            <p>Humidity: ${humidity}%</p>
            <p>Conditions: ${conditions}</p>
        `;

        results.classList.remove("hidden");

  } catch (error) {
    console.error(error);
  }
};

search.addEventListener('click', fetchWeather);