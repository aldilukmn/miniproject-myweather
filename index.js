const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const weather = document.querySelector('.weather');
const error = document.querySelector('.error');
const empty = document.querySelector('.empty');

const checkWeather = async (city) => {
    try {
        const apiKey = '863242cfb2b1d357e6093d9a4df19a4b';
        const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
        const options = {method: 'GET'};
        const response = await fetch(url, options);

        switch (response.status) {
            case 400 :
                empty.style.display = 'block'
                error.style.display = 'none';
                weather.style.display = 'none';
            break;
            case 404 :
                empty.style.display = 'none'
                error.style.display = 'block';
                weather.style.display = 'none';
            break;
            case 200 :
                empty.style.display = 'none'
                error.style.display = 'none';
                weather.style.display = 'block';
            break;
        }

        const data = await response.json();
        document.querySelector('.city').innerText = data.name;
        document.querySelector('.temp').innerText = data.main.temp + ' °C';
        document.querySelector('.humidity').innerText = data.main.humidity + ' %';
        document.querySelector('.wind').innerText = data.wind.speed + ' km/h';

        switch (data.weather[0].main) {
            case 'Clouds' :
                weatherIcon.src = './assets/images/clouds.png';
            break;
            case 'Clear' :
                weatherIcon.src = './assets/images/clear.png';
            break;
            case 'Rain' :
                weatherIcon.src = './assets/images/rain.png';
            break;
            case 'Drizzle' :
                weatherIcon.src = './assets/images/drizzle.png';
            break;
            case 'Mist' :
                weatherIcon.src = './assets/images/mist.png';
            break;
        }
        weather.style.display = 'block';
    } catch (error) {
        console.log(error);
    }
};

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
})

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'Enter' :
            checkWeather(searchBox.value);
        break;
    }
})