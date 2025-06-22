$(document).ready(function () {
  $('[data-toggle="popover"]').popover();

  var typed = new Typed("#typed", {
    strings: [
      "University Student",
      "Future",
      "Tech Expert",
      "Ambassador",
      "Star",
    ],
    typeSpeed: 100,
    backSpeed: 50,
    loop: true,
  });
});