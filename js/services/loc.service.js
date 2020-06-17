export const locService = {
    getLocs,
    getPosition,
    getLocByAdress,
    getLocByCords
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
        var adress = loc.data;
        let lat = adress.results[0].geometry.location.lat;
        let lng = adress.results[0].geometry.location.lng;
        let locName = adress.results[0].formatted_address; // הוספתי פה
        let locObj = { lat, lng, locName } // הוספתי פה
        return locObj;
    })
}

function getLocByCords(lat, lng) {
    var loc = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyB6yvi2SP3dL00sl9NoekkrvqIEq0u2iLE`)
    return loc.then((loc) => {
        var str = ''
        str += loc.data.results[0].formatted_address;
        // console.log(loc.data.results)
        // var adrsComps = loc.data.results[0].address_components;
        // console.log(loc.data.results[0])
        // str += adrsComps[adrsComps.length - 3].long_name
        // str += ', '
        // str += adrsComps[adrsComps.length - 1].long_name
        return str
    })

}