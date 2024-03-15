function fetchWeather(lat, lon) {
  const apiKey = '4d897ab567fcd67fa8d261213fe8b407';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
  return fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

function displayWeatherData(data) {
  const temperature = data.main.temp;
  const weatherDescription = data.weather[0].description;
  const weatherIcon = data.weather[0].icon;
  const name = data.name + " / " + data.sys.country  ;
  const date = new Date();
  const humidity = data.main.humidity;
  const wind = data.wind.speed;
  const pressure = data.main.pressure;
  
  document.querySelector(".weather-temp").textContent = temperature + "°C";
  document.querySelector(".weather-desc").textContent = weatherDescription;
  document.querySelector(".weather-icon").setAttribute("data-feather", weatherIcon);
  document.querySelector(".location").textContent = name;
  
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  document.querySelector(".date-dayname").textContent = dayNames[date.getDay()];
  document.querySelector(".date-day").textContent = date.toLocaleDateString();
  document.querySelector(".humidity").textContent = "Humidity = " + humidity + "%";
  document.querySelector(".wind").textContent = "Wind = " + wind;
  document.querySelector(".pressure").textContent = "Pressure = " + pressure;
}

function findCountry(countryName) {
  fetch("countries.json")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(jsonData => {
    const foundCountry = jsonData.find(item =>
      item.name.toLowerCase() === countryName.toLowerCase()
      );
      if (foundCountry) {
        fetchWeather(foundCountry.latitude, foundCountry.longitude)
        .then(displayWeatherData)
        .catch(error => {
          console.error("Error fetching weather data:", error);
        });
      } else {
        console.log("Country not found in the list.");
      }
    })
    .catch(error => {
      console.error("Error fetching JSON:", error);
    });
  }
  
  findCountry("India");
  
  fetch("countries.json")
  .then(response => response.json())
  .then(jsonData => {
    const dropdown = document.getElementById("countryDropdown");
    
    jsonData.forEach(item => {
      const option = document.createElement("option");
      option.value = item.name;
      option.textContent = item.name;
      dropdown.appendChild(option);
    });
  })
  .catch(error => {
    console.error("Error fetching JSON:", error);
  });
  document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.getElementById("countryDropdown");
    const changeValue = document.getElementById("changeValue");
    
    changeValue.addEventListener("click",()=>{
      const selectedValue = dropdown.value;
      findCountry(selectedValue);
    });
  });