export default function initSlidebars() {
  // Initialize Slidebars
  var controller = new slidebars();
  controller.init();

// Toggle Slidebar
  $('.nav-toggle').on('click', function (event) {
    // Stop default action and bubbling
    event.stopPropagation();
    event.preventDefault();

    // Toggle the Slidebar with id 'id-1'
    controller.toggle('id-1');
  });
}
