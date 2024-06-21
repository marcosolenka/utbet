$(document).ready(function () {
  $("#footer").load("./footer.html");
});

window.addEventListener("DOMContentLoaded", importHeader);
catchCountryNames();
getCountryFlag("Brazil");
catchCountryIDD();

/*function importHeader() {
  $("#header").load("header.html");
}*/
