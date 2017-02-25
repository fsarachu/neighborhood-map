export default function locate(callback) {
  locateByHtml5(callback, true);
}

function locateByHtml5(callback, fallbackToIp = false) {
  if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser');
    return;
  }

  function success(geolocation) {
    const position = {
      lat: parseInt(geolocation.coords.latitude),
      lng: parseInt(geolocation.coords.longitude)
    };

    console.log('Got html5 geolocation!');
    console.log(`lat: ${position.lat} lng: ${position.lng}`);

    callback(position);
  }

  function error() {
    console.log('Couldn\'t get html5 geolocation.');
    if (fallbackToIp) {
      locateByIp(callback);
    }
  }

  const geoOptions = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 6000
  };

  navigator.geolocation.getCurrentPosition(success, error, geoOptions);
}

function locateByIp(callback) {
  //TODO
  console.log('Gotta implement this one');
}
