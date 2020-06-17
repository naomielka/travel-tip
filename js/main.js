console.log('Main!');

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'


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

document.querySelector('.btn').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    mapService.panTo(35.6895, 139.6917);


})




document.querySelector('.btn-my-location').addEventListener('click', (ev) => {
    console.log('Button 2!', ev.target);
    let currPos = locService.getPosition()
    currPos
        .then(loc => {
            mapService.panTo(loc.latitude, loc.longtitude)
            console.log(loc)
            console.log(loc.latitude)
            console.log(loc.longtitude)
        })


})