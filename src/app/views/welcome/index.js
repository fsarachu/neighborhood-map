import ko from "knockout";
import postal from "postal";
import UIkit from "uikit";
import NeighborhoodService from "../../services/NeighborhoodService";

class Welcome {

  constructor(ctx) {
    this.ctx = ctx;
    this.mapZoom = ko.observable(2);
    this.mapCenter = ko.observable({
      lat: ko.observable(0),
      lng: ko.observable(0),
    });

    this.showWelcome()
      .then(this.showChooseMethod.bind(this));

    postal.subscribe({
      channel: "googleMap",
      topic: "map.click",
      callback: function (data, envelope) {
        console.log(`Map clicked at ${data.lat}, ${data.lng}`);
      }
    })
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

  showWelcome() {
    let message = `
      <h2 class="uk-modal-header">Welcome!</h2>
      <p class="uk-modal-body">It looks like it's your first time here... Let's create your neighborhood!</p>
    `;

    let options = {
      labels: {
        ok: 'Get Started <span uk-icon="icon: arrow-right"></span>'
      },
      center: true,
    };

    return UIkit.modal.alert(message, options);
  }

  showChooseMethod () {
    let message = `
      <h2 class="uk-modal-header">Create Your Neighborhood</h2>
      <p class="uk-modal-body">Choose your preferred method</p>
    `;

    let options = {
      labels: {
        ok: '<span uk-icon="icon: location"></span> Geolocation',
        cancel: 'Manual'
      },
      center: true,
    };

    return UIkit.modal.confirm(message, options);
  }

}

export default {
  viewModel: Welcome,
  template: require('./template.html')
};
