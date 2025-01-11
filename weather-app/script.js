const apiKey = ""; //Open weather API key
const apiUrl = ""; //Open weather API url

const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const InputRequiredMessage = "City Name Required";
const InvalidCityNameMessage = "Invalid City Name";

const checkWeather = async (city) => {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".error").textContent = InvalidCityNameMessage;
    document.querySelector(".weather").style.display = "none";
    searchInput.value = "";
  } else {
    let data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = `${Math.round(
      data.main.temp
    )}°C`;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "images/snow.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    searchInput.value = "";
  }
};

searchBtn.addEventListener("click", () => {
  if (searchInput.value == "") {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".error").textContent = InputRequiredMessage;
    document.querySelector(".weather").style.display = "none";
  } else {
    document.querySelector(".error").style.display = "none";
    const searchInputValue = searchInput.value.trim().toLowerCase();
    checkWeather(searchInputValue);
  }
});
