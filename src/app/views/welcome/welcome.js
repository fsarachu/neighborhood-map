import ko from "knockout";
import swal from "sweetalert2";
import NeighborhoodService from "../../services/NeighborhoodService";

class Welcome {

  constructor(ctx) {
    this.ctx = ctx;
    this.mapZoom = ko.observable(2);
    this.mapCenter = ko.observable({
      lat: ko.observable(0),
      lng: ko.observable(0),
    });
    this.showWelcomeMessage();
  }

  createHood() {
    let service = new NeighborhoodService();
    let neighborhood = service.save({
      name: 'My Neighborhood',
      position: {
        lat: 12.32131,
        lng: 3.31312
      }
    });

    if (neighborhood) {
      this.ctx.router.update('//');
    }
  }

  showWelcomeMessage() {
    swal({
      title: 'Welcome!',
      text: 'It looks like it\'s your first time here... Let\'s create your neighborhood!',
      confirmButtonText: 'Get Started',
      confirmButtonClass: 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored',
      buttonsStyling: false,
    });
  }

  onMapClick(e) {
    console.log(`Map clicked at ${e.latLng.lat()}, ${e.latLng.lng()}`);
  }

}

export default {
  viewModel: Welcome,
  template: require('./welcome.html')
};
