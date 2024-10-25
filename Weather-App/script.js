const geocodeApiUrl = 'https://geocoding-api.open-meteo.com/v1/search?name=';
const weatherApiUrl = 'https://api.open-meteo.com/v1/forecast?current_weather=true&latitude={lat}&longitude={lon}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weatherIcon');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

async function getCoordinates(city) {
    try {
        const response = await fetch(`${geocodeApiUrl}${encodeURIComponent(city)}`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const { latitude, longitude, name, country } = data.results[0];
            getWeather(latitude, longitude, name, country);
        } else {
            showError('City not found');
        }
    } catch (error) {
        showError(error.message);
    }
}

async function getWeather(lat, lon, name, country) {
    try {
        const apiUrl = weatherApiUrl.replace('{lat}', lat).replace('{lon}', lon);
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Weather data not available');
        const data = await response.json();
        updateWeatherUI(data, name, country);
    } catch (error) {
        showError(error.message);
    }
}

function updateWeatherUI(data, name, country) {
    const currentWeather = data.current_weather;
    cityName.textContent = `${name}, ${country}`;
    temperature.textContent = `${Math.round(currentWeather.temperature)}°C`;
    description.textContent = "Weather data from Open-Meteo";
    weatherIcon.src = "https://i.pinimg.com/564x/b7/fe/30/b7fe30893ac55bb28d61f954a11b1821.jpg";
    weatherIcon.alt = "Weather Icon";
    humidity.textContent = `Humidity: ${data.hourly.relative_humidity_2m[0]}%`;
    windSpeed.textContent = `Wind Speed: ${currentWeather.windspeed} km/h`;

    document.getElementById('weatherInfo').classList.add('fade-in');
    document.getElementById('weatherInfo').style.display = 'block';
}

function showError(message) {
    cityName.textContent = '';
    temperature.textContent = '';
    description.textContent = message;
    weatherIcon.src = '';
    humidity.textContent = '';
    windSpeed.textContent = '';
    document.getElementById('weatherInfo').classList.add('fade-in');
}

function handleSearch() {
    const city = cityInput.value.trim();
    if (city) getCoordinates(city);
}

searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') handleSearch();
});

getCoordinates('Berlin');
