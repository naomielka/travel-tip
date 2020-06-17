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
            document.querySelector('.weather').style.visibility = 'visible'


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
        document.querySelector('.weather').style.visibility = 'visible'

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