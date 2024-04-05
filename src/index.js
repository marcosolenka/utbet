window.addEventListener("DOMContentLoaded", importHeader);
catchCountryNames();
getCountryFlag("Brazil");

function importHeader() {
  fetch("/src/app/header/header.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("header-container").innerHTML = html;
    })
    .catch((error) => console.error("Erro ao importar o cabeçalho:", error));
}

async function catchCountryNames() {
  try {
    // Faz a requisição GET para a API Rest Countries usando fetch
    const response = await fetch("https://restcountries.com/v3.1/all");

    if (response.ok) {
      const data = await response.json();

      let countryNames = data.map((country) => country.name.common);
      console.log(countryNames);
    } else {
      throw new Error("Erro ao buscar os dados da API");
    }
  } catch (error) {
    console.error("Ocorreu um erro ao fazer a requisição:", error);
  }
}

async function getCountryFlag(countryName) {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");

    if (response.ok) {
      const data = await response.json();

      const country = data.find(
        (country) => country.name.common === countryName
      );

      // Verifica se o país foi encontrado
      if (country) {
        // Obtém a bandeira do país
        const flag = country.flags.png;

        console.log(`A bandeira de ${countryName} é: ${flag}`);
      } else {
        console.error(
          `Não foi possível encontrar informações para o país "${countryName}".`
        );
      }
    } else {
      throw new Error("Erro ao buscar os dados da API");
    }
  } catch (error) {
    console.error("Ocorreu um erro ao fazer a requisição:", error);
  }
}
