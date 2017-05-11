import dialogPolyfill from "dialog-polyfill";

class WelcomeDialog {

  constructor(params) {
    this.showDialog = params.showDialog;
    this.dialog = document.querySelector('.welcome-dialog');
    this.init();
  }

  init() {
    this.polyfill();
    this.subscribeToObservable();
    this.openIfRequired();
  }

  polyfill() {
    if (!('showModal' in this.dialog)) {
      dialogPolyfill.registerDialog(this.dialog);
    }
  }

  subscribeToObservable() {
    this.showDialog.subscribe(value => {
      if (value) {
        this.dialog.showModal();
      } else {
        this.dialog.close();
      }
    });
  }

  openIfRequired() {
    if (this.showDialog()) {
      this.dialog.showModal();
    }
  }

  closeDialog() {
    this.showDialog(false);
  }

}

export default {
  viewModel: WelcomeDialog,
  template: require('./welcomeDialog.html')
}
