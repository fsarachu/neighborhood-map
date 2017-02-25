export default function locate(callback) {
  locateByHtml5(callback, true);
}

function locateByHtml5(callback, fallbackToIp = false) {
  if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser');
    return;
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log('Got html5 geolocation!');
    console.log(`lat: ${latitude} lng: ${longitude}`);

    callback(latitude, longitude);
  }

  function error() {
    console.log('Couldn\'t get html5 geolocation.');
    if (fallbackToIp) {
      locateByIp(callback);
    }
  }

  navigator.geolocation.getCurrentPosition(success, error);
}

function locateByIp(callback) {
  console.log('Gotta implement this one');
}
