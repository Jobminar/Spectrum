document.addEventListener("DOMContentLoaded", function () {
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const adminSideContainer = document.querySelector(".admin-side-container");

  hamburgerIcon.addEventListener("click", function () {
    // Toggle a CSS class to show/hide the admin-side-container
    adminSideContainer.classList.toggle("show-menu");
  });
});
