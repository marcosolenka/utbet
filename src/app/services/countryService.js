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

async function catchCountryIDD() {
  try {
    // Faz a requisição GET para a API Rest Countries usando fetch
    const response = await fetch("https://restcountries.com/v3.1/all");

    if (response.ok) {
      const data = await response.json();

      data.forEach((country) => {
        let idd = ""; // Inicializa idd como uma string vazia
        // Verifica se o país tem sufixos
        if (country.idd.suffixes) {
          // Se houver sufixos, adiciona o root apenas depois de concatenar o primeiro sufixo
          idd += `${country.idd.root}${country.idd.suffixes[0]}`;
          // Concatena os outros sufixos se houver mais de um
          for (let i = 1; i < country.idd.suffixes.length; i++) {
            idd += `, ${country.idd.root}${country.idd.suffixes[i]}`;
          }
        }

        console.log(`IDD de ${country.name.common}: ${idd}`);
      });
    } else {
      throw new Error("Erro ao buscar os dados da API");
    }
  } catch (error) {
    console.error("Ocorreu um erro ao fazer a requisição:", error);
  }
}
