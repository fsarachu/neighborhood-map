var map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 40.705311, lng: -74.2581952},
        zoom: 8
    });

    getUserLocation(function (lat, lng) {
        map.setCenter({"lat": parseInt(lat), "lng": parseInt(lng)});
    });
}