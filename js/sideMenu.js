$(function () {
    var $sideMenu = $(".side-menu");
    var $menuToggle = $sideMenu.find(".menu-toggle");
    var $menuContent = $sideMenu.find(".menu-content");
    var $menuToggleIcon = $menuToggle.find(".fa");

    menuToggle();

    $menuToggle.on('click', function () {
        menuToggle();
    });

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