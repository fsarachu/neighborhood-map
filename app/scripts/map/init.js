import loadGoogleMapsApi from 'load-google-maps-api'

export default function initMap() {
  loadGoogleMapsApi({key: 'AIzaSyClOMwnqYq0BzWIu4XvFHY_FJ20w3PZ5cw'}).then((googleMaps) => {
    var uluru = {lat: -25.363, lng: 131.044};
    var map = new googleMaps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });
  }).catch((err) => {
    console.error(err);
  });
}
