import 'material-design-lite/dist/material';
import ko from 'knockout';

window.initMap = function () {
  let google = window.google;
  window.map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 2
  });
}
