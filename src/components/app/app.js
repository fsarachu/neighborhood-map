import addressStore from '../../store/AddressStore';

class App {
  constructor(params) {
    this.someProperty = params.something;
    this.store = {
      address: addressStore
    };

    this.store.address.loadData([
      {name: 'Almacen', position: {x: 12, y: 4}},
      {name: 'Super', position: {x: -2, y: 1}}
    ]);
  }
}

export default {
  viewModel: App,
  template: require('./app.html')
};
