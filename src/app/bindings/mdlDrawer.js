import ko from "knockout";

ko.bindingHandlers.mdlDrawer = {
  init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
    element.addEventListener("click", toggleDrawer, false);
  },
  update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
  }
};

function toggleDrawer() {
  let layout = document.querySelector('.mdl-layout');
  layout.MaterialLayout.toggleDrawer();
}
