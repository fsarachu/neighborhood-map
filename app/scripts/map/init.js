import loadGoogleMapsApi from 'load-google-maps-api';
// import geolocate from './geolocator';

export default function initMap(callback) {
  loadGoogleMapsApi({key: 'AIzaSyClOMwnqYq0BzWIu4XvFHY_FJ20w3PZ5cw'}).then((googleMaps) => {
    let map = new googleMaps.Map(document.getElementById('map'), {
      zoom: 3,
      center: {lat: 0, lng: 0}
    });

    // geolocate((position) => {
    //   map.setCenter(position);
    //   map.setZoom(8);
    // });

    callback(map);
  }).catch((err) => {
    console.error(err);
  });
}
