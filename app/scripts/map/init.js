import loadGoogleMapsApi from 'load-google-maps-api';
import geolocate from './geolocator';

export default function initMap(callback) {
  loadGoogleMapsApi({key: 'AIzaSyClOMwnqYq0BzWIu4XvFHY_FJ20w3PZ5cw'}).then((googleMaps) => {
    let uluru = {lat: -25.363, lng: 131.044};
    let map = new googleMaps.Map(document.getElementById('map'), {
      zoom: 8,
      center: uluru
    });

    geolocate((latitude, longitude) => {
      let userLocation = {lat: parseInt(latitude), lng: parseInt(longitude)};

      map.setCenter(userLocation);

      let marker = new googleMaps.Marker({
        position: userLocation,
        map: map
      });
    });

    callback(map);
  }).catch((err) => {
    console.error(err);
  });
}
