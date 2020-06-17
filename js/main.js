< !DOCTYPE html >
    <
    html lang = "en" >

    <
    head >
    <
    meta charset = "UTF-8" >
    <
    meta name = "viewport"
content = "width=device-width, initial-scale=1.0" >
    <
    link rel = "stylesheet"
href = "css/main.css" >
    <
    title > ES6 < /title> <
    /head>

<
body >
    <
    header class = "flex justify-center" >
    <
    h1 > Travel Tip < /h1> <
    /header> <
    main class = "flex col justify-center align-center" >
    <
    div class = "container flex row" >
    <
    input class = "loc-input"
type = "text" >
    <
    button class = "btn-text-search" > Go to location < /button> <
    button class = "btn-my-location" > Go to My location < /button> <
    button class = "btn" > Copy this location < /button> <
    /div> <
    h4 class = "loc-Name" > < /h4>

<
div id = "map"
style = "width: 500px; height: 400px;" > < /div> <
    div class = "weather" >
    <
    div class = "location-name" > < /div> <
    div class = "location-tempature" > < /div> <
    /div> <
    /main> <
    script src = "lib/axios.js" > < /script> <
    script type = "module"
src = "js/main.js" > < /script> <
    /body>

<
/html>     mapService.panTo(loc.lat, loc.lng)
document.querySelector('.location-name').innerHTML = loc.locName //שיניתי פה
return loc //שיניתי פה
})
.then(loc => {
weatherService.getWeatherAdress(loc.lat, loc.lng)
})
})


document.querySelector('.btn-my-location').addEventListener('click', (ev) => {
    console.log('Button 2!', ev.target);
    let currPos = locService.getPosition()
    currPos
        .then(loc => {
            // location.href = "http://127.0.0.1:5501/?lat=3.14&lng=1.63";
            return loc
        })
        .then(loc => {
            // location.href = "http://127.0.0.1:5501/?lat=3.14&lng=1.63";
            mapService.panTo(loc.coords.latitude, loc.coords.longitude)
            mapService.addMarker({ lat: loc.coords.latitude, lng: loc.coords.longitude });
            console.log("loc", loc)
            console.log('loc lat', loc.coords.latitude)
            console.log('loc long', loc.coords.latitude)
        })


})

function renderLocName(lat, lng) {
    var str = locService.getLocByCords(lat, lng)
    var container = document.querySelector('.loc-Name');
    str.then((str) => {
        container.innerText = str;
    })
}