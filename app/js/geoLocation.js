function getUserLocation(locationCallback) {
    /* Gets the most accurate position available */
    if (navigator.geolocation) {
        // Try to use html5 geolocation
        function geoSuccess(position) {
            // Use user provided geolocation
            console.log("geoSuccess");
            locationCallback(position.coords.latitude, position.coords.longitude);
        }

        function geoError() {
            // Fallback to ip geolocation
            console.log("geoError");
            getIpGeolocation(locationCallback);
        }

        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

    } else {
        // Fallback to ip geolocation
        console.log("ipFallback");
        getIpGeolocation(locationCallback);
    }
}

function getIpGeolocation(callback) {
    $.getScript('http://www.geoplugin.net/javascript.gp', function () {
        var lat = parseInt(geoplugin_latitude());
        var lng = parseInt(geoplugin_longitude());
        alert("Bout to call..");
        callback(lat, lng);
    });
}