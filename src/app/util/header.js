let toggleButton = document.getElementById("toggle-button");
toggleButton.addEventListener("click", function () {
  toggleMenu();
});

function toggleMenu(event) {
  let menu = document.getElementById("menu");
  let header = document.getElementById("header");
  let formButtons = document.getElementById("form-buttons");

  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
    header.classList.remove("grid-cols-2");
    header.classList.add("grid-cols-1");
    header.classList.remove("h-32");
    header.classList.add("h-64");
    formButtons.classList.add("hidden");
  } else {
    menu.classList.add("hidden");
    header.classList.remove("grid-cols-1");
    header.classList.add("grid-cols-2");
    header.classList.remove("h-64");
    header.classList.add("h-32");
    formButtons.classList.remove("hidden");
  }
}
