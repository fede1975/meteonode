// CONFIGURAZIONE: Inserisci qui i tuoi dati
const API_KEY = '71c406cd0696048af1069afda7277927'; // Sostituisci con la tua chiave reale
const CITY = 'Rome';
const COUNTRY_CODE = 'IT';

// Endpoint per la geolocalizzazione (ottiene lat e lon dal nome della città)
const GEO_URL = `https://openweathermap.org{CITY},${COUNTRY_CODE}&limit=1&appid=${API_KEY}`;

async function getWeatherData() {
  try {
    // 1. Ottieni le coordinate della città
    const geoResponse = await fetch(GEO_URL);
    
    if (!geoResponse.ok) {
      throw new Error(`Errore geolocalizzazione: ${geoResponse.statusText}`);
    }
    
    const geoData = await geoResponse.json();
    
    if (geoData.length === 0) {
      console.log(`Città non trovata: ${CITY}`);
      return;
    }

    const { lat, lon, name } = geoData[0];
    console.log(`Coordinate trovate per ${name}: Lat ${lat}, Lon ${lon}`);

    // 2. Richiedi il meteo attuale usando la One Call API o Current Weather Data
    // Usiamo il parametro 'units=metric' per avere i gradi Celsius
    const WEATHER_URL = `https://openweathermap.org{lat}&lon=${lon}&units=metric&lang=it&appid=${API_KEY}`;
    
    const weatherResponse = await fetch(WEATHER_URL);
    
    if (!weatherResponse.ok) {
      throw new Error(`Errore dati meteo: ${weatherResponse.statusText}`);
    }
    
    const weatherData = await weatherResponse.json();

    // 3. Mostra i dati principali in console
    console.log(`\n--- Meteo attuale a ${weatherData.name} ---`);
    console.log(`Condizioni: ${weatherData.weather[0].description}`);
    console.log(`Temperatura: ${weatherData.main.temp}°C (Percepita: ${weatherData.main.feels_like}°C)`);
    console.log(`Umidità: ${weatherData.main.humidity}%`);
    console.log(`Vento: ${weatherData.wind.speed} m/s`);

  } catch (error) {
    console.error('Si è verificato un errore durante il recupero dei dati:', error.message);
  }
}

