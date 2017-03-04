import loadGoogleMapsApi from 'load-google-maps-api';
import geolocate from './geolocator';

let map = null, userMarker = null;

export default function initMap(callback) {
  loadGoogleMapsApi({
    key: 'AIzaSyClOMwnqYq0BzWIu4XvFHY_FJ20w3PZ5cw',
    libraries: ['places']
  }).then((googleMaps) => {
    map = new googleMaps.Map(document.getElementById('map'), {
      zoom: 3,
      center: {lat: 0, lng: 0},
      gestureHandling: 'cooperative'
    });

    geolocate((position) => {
      map.setCenter(position);
      map.setZoom(14);

      userMarker = new googleMaps.Marker({
        position: position,
        map: map
      });
    });

    callback(map);
  }).catch((err) => {
    console.error(err);
  });
}
