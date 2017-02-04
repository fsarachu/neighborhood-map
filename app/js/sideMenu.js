$(function () {
    // Cache some elements
    var $sideMenu = $(".side-menu");
    var $menuToggle = $sideMenu.find(".menu-toggle");
    var $menuContent = $sideMenu.find(".menu-content");
    var $menuToggleIcon = $menuToggle.find(".fa");

    // First, close the menu
    menuToggle();

    // Toggle menu when toggle area is clicked
    $menuToggle.on('click', function () {
        menuToggle();
    });

    // If window is resized menu can get resized, so if it's closed we should check if it's still in place.
    $(window).on("resize", debounce(function () {
        if ($sideMenu.css("left") != "0px") {
            $sideMenu.css("left", -$menuContent.outerWidth() + "px");
        }
    }, 250));

    // Toggle opened/closed menu state
    function menuToggle() {
        console.log($sideMenu.css("left"));

        if ($sideMenu.css("left") == "0px") {
            $menuToggleIcon.removeClass("fa-chevron-left").addClass("fa-chevron-right");
            $sideMenu.css("left", -$menuContent.outerWidth() + "px");
        } else {
            $menuToggleIcon.removeClass("fa-chevron-right").addClass("fa-chevron-left");
            $sideMenu.css("left", "0");
        }
    }
});

// Returns a function, that, as long as it continues to be invoked, will not be triggered.
// The function will be called after it stops being called for N milliseconds.
// If `immediate` is passed, trigger the function on the leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
