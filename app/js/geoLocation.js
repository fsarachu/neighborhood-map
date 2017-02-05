function getUserLocation(locationHandler) {
    /* Gets the most accurate position available */
    var lat, lng;

    if (navigator.geolocation) {
        // Try to use html5 geolocation
        function geoSuccess(position) {
            // Use user provided geolocation
            console.log("geoSuccess");
            locationHandler(position.coords.latitude, position.coords.longitude);
        }

        function geoError() {
            // Fallback to ip geolocation
            console.log("geoError");
            var coords = ipGeolocation();
            locationHandler(coords.lat, coords.lng);
        }

        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

    } else {
        // Fallback to ip geolocation
        console.log("ipFallback");
        var coords = ipGeolocation();
        locationHandler(coords.lat, coords.lng);
    }
}

function ipGeolocation() {
    var coords = {
        lat: 0,
        lng: 0
    };

    $.getScript('http://www.geoplugin.net/javascript.gp', function () {
        coords.lat = parseInt(geoplugin_latitude());
        coords.lng = parseInt(geoplugin_longitude());
    });

    return coords;
}