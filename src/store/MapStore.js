import ko from 'knockout';

class MapStore {
  constructor() {
    this.center = ko.observable({lat: 0, lng: 0});
    this.zoom = ko.observable(2);
  }
}
