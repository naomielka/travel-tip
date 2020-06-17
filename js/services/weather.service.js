export const weatherService = {
    getWeatherAdress
}



function getWeatherAdress(lat, lon) {
    console.log(lat, lon);

    var prmWeather = axios.get(`
    http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=71cc57a02f3afe8d62dfae2f05932a23`)
    prmWeather
        .then((weather) => {
            console.log(weather);
            return weather

        })
    return prmWeather
}