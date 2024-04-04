function importHeader() {
  fetch("/src/app/header/header.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("header-container").innerHTML = html;
    })
    .catch((error) => console.error("Erro ao importar o cabeçalho:", error));
}

// utiliza a função importHeader no carregamento da pagina
window.addEventListener("DOMContentLoaded", importHeader);
