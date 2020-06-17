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
/html> return locObj;
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