import ko from 'knockout';
import LocationService from "../../services/LocationService";

class App {
  constructor() {
    this.center = {
      lat: ko.observable(0),
      lng: ko.observable(0),
    };
    this.zoom = ko.observable(2);
    this.services = {
      location: LocationService,
    };

    this.services.location.loadData([
      {
        name: 'First Location',
        position: {
          lat: 12.345,
          lng: 8.123
        }
      },
      {
        name: 'Second Location',
        position: {
          lat: 4.345,
          lng: -5.123
        }
      },
      {
        position: {
          lat: 'a',
          lng: -5.123
        }
      }
    ]);

    console.dir(this.services.location.locations().map(location => location.toStorable()));
  }
}

export default {
  viewModel: App,
  template: require('./app.html')
};
