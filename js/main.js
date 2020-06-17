console.log('Main!');

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather.service.js'


locService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {

    mapService.initMap()
        .then(() => {

            mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch(console.log('INIT MAP ERROR'));

    locService.getPosition()
        .then(pos => {

            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

document.querySelector('.close').addEventListener('click', (ev) => {
    document.querySelector('.weather').style.display = 'none'
})
document.querySelector('.btn-text-search').addEventListener('click', (ev) => {
    var adress = document.querySelector('.loc-input').value;
    var locObj = locService.getLocByAdress(adress);
    locObj.then((loc) => {
            mapService.panTo(loc.lat, loc.lng)
            document.querySelector('.location-name').innerHTML = loc.locName //שיניתי פה
            renderLocName(loc.lat, loc.lng)
            return loc //שיניתי פה
        })
        .then(loc => {
            return weatherService.getWeatherAdress(loc.lat, loc.lng)
        })
        .then(weather => {
            renderWeather(weather)
            remderWeatherPicture(weather)
            document.querySelector('.weather').style.display = 'block'
        })
})


document.querySelector('.btn-my-location').addEventListener('click', (ev) => {
    console.log('Button 2!', ev.target);
    let currPos = locService.getPosition()
    currPos
        .then(loc => {
            mapService.panTo(loc.coords.latitude, loc.coords.longitude)
            mapService.addMarker({ lat: loc.coords.latitude, lng: loc.coords.longitude });
            renderLocName(loc.coords.latitude, loc.coords.longitude)
            return loc
        })
        .then(loc => {
            return weatherService.getWeatherAdress(loc.coords.latitude, loc.coords.longitude)
        })

    .then(weather => {
        renderWeather(weather)
        remderWeatherPicture(weather)
        document.querySelector('.weather').style.display = 'block'

    })



})

function renderLocName(lat, lng) {
    var str = locService.getLocByCords(lat, lng)
    var container = document.querySelector('.location-name'); //שיניתי פה
    str.then((str) => {
        container.innerText = str;
    })
}



function renderWeather(weather) {
    document.querySelector('.location-tempature').innerHTML = `Tempature: ${Math.round((weather.data.main.temp - 273.15))}`
    document.querySelector('.location-humidity').innerHTML = `Humidity: ${weather.data.main.humidity}`
    document.querySelector('.location-forecast').innerHTML = `Forecast: ${weather.data.weather[0].main}`
}

function remderWeatherPicture(weather) {
    let weatherPicture = document.querySelector('.weather-pic')
    console.log(weather.data.weather[0].main);

    if (weather.data.weather[0].main === 'Clear') weatherPicture.style.backgroundPosition = '-22px -21px'
    if (weather.data.weather[0].main === 'Clouds') weatherPicture.style.backgroundPosition = '-288px -25px'
    if (weather.data.weather[0].main === 'Rain') weatherPicture.style.backgroundPosition = '-24px -271px'
        //  if (weather.data.weather[0].main === 'Clear') weatherPicture.style.backgroundPosition = '-22px -21px'

}