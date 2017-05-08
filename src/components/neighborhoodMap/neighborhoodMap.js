import ko from "knockout";
import LocationService from "../../services/LocationService";

class NeighborhoodMap {

  constructor(params) {
    this.services = {
      location: LocationService,
    };
    this.neighborhood = params.neighborhood;
    this.mapZoom = ko.observable(2);
  }

}

export default {
  viewModel: NeighborhoodMap,
  template: require('./neighborhoodMap.html')
};
