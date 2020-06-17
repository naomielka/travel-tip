export const locService = {
    getLocs,
    getPosition,
    getLocByAdress
}
var locs = [{ lat: 11.22, lng: 22.11 }]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function getLocByAdress(adress) {
    var adressInfo = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${adress}&key=AIzaSyB6yvi2SP3dL00sl9NoekkrvqIEq0u2iLE`)
    return adressInfo.then((loc) => {
        console.log('get loc by adress', loc)
        var adress = loc.data;
        let lat = adress.results[0].geometry.location.lat;
        let lng = adress.results[0].geometry.location.lng;
        let locName = adress.results[0].formatted_address; // הוספתי פה
        let locObj = { lat, lng, locName } // הוספתי פה
        return locObj;
    })
}