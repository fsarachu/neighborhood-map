import loadGoogleMapsApi from 'load-google-maps-api';

export default function initMap(callback) {
  loadGoogleMapsApi({key: 'AIzaSyClOMwnqYq0BzWIu4XvFHY_FJ20w3PZ5cw'}).then((googleMaps) => {
    let uluru = {lat: -25.363, lng: 131.044};
    let map = new googleMaps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });
    callback(map);
  }).catch((err) => {
    console.error(err);
  });
}
