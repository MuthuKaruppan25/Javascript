async function generateWeather(){
    const apikey = "968df098cfdf94084c866bf7597cc025";
    let city = document.getElementById("city").value.trim();
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    try{
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("City not found!");

        const data = await res.json();
        displayWeatherData(data);

    }
    catch(e){
        console.log(e.message);
    }
}
function displayWeatherData(data){
    const tempInfo = document.getElementById('weather-temp');
    const humInfo =  document.getElementById('weather-hum');
    const weatherInfo = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const cityName = data.name;
    const temp = Math.round(data.main.temp - 273.15);
    const hum = data.main.humidity;
    const desc = data.weather[0].description;
    const iconcode = data.weather[0].icon;
    const iconurl = `https://openweathermap.org/img/wn/${iconcode}@4x.png`;

    tempInfo.innerHTML = `<p>${temp} °C</p>`;
    humInfo.innerHTML = `<p>${hum} %</p>`;
    weatherInfo.innerHTML= `
     <p>${cityName}</p>
     <p>${desc}</p>
    `;

    weatherIcon.src = iconurl;
    weatherIcon.alt = desc;
    

    weatherIcon.classList.add('active');

}

