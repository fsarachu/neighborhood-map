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
      console.log('Running dialog polyfill');
      dialogPolyfill.registerDialog(this.dialog);
    }
  }

  subscribeToObservable() {
    this.showDialog.subscribe(value => {
      if (value) {
        console.log(`Open dialog ${this.showDialog()}`);
        this.dialog.showModal();
      } else {
        console.log(`Close dialog ${this.showDialog()}`);
        this.dialog.close();
      }
    });
  }

  openIfRequired() {
    if (this.showDialog()) {
      console.log('Open from init()');
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
