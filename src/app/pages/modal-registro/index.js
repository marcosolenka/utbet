import { User } from '../../model/User.js';
import { UsuarioService } from '../../services/usuario.service.js';

//CHAMA A FUNCAO PAISES QUE RECEBE VIA API O NOME DOS PAISES
paises();

let form = document.getElementById('form-registro');
//ESCUTA AS ALTERACOES DO SELECT PAIS PARA DEFINIR AS MOEDAS
document.getElementById('select-pais').addEventListener('change', function() {
    const valorSelectPais = document.getElementById('select-pais').value;
    MoedaPorPais(valorSelectPais); 
  });

//ADICIONA MASCARA AO INPUT CPF
$(function () {
    $('#input-cpf').mask('000.000.000-00');
  });

//ADICIONA MASCARA AO INPUT NUMERO
$(function () {
    $('#input-numero').mask('+00 (00) 0 0000-0000');
});

//VALIDACOES DOS INPUTS
document.getElementById('input-email').addEventListener('blur', function () {
    validaEmail();
});

document.getElementById('input-senha').addEventListener('blur', function () {
    validaSenha();
});

document.getElementById('select-pais').addEventListener('blur', function () {
    validaPais();
});

document.getElementById('input-numero').addEventListener('blur', function () {
    validaNumero();
});

document.getElementById('input-cpf').addEventListener('blur', function () {
    validaCPF();
});

document.getElementById('input-nome').addEventListener('blur', function () {
    validaNome();
});

document.getElementById('input-sobrenome').addEventListener('blur', function () {
    validaSobrenome();
});

document.getElementById('date-nascimento').addEventListener('blur', function () {
    validaDataNascimento();
});


//TRATA OS VALORES DO FORMULARIO
form.addEventListener('submit', function(event) {
    event.preventDefault();


    if (form.checkValidity()){
      let valorInicial = 0;
      const email = document.getElementById('input-email').value;
      const senha = document.getElementById('input-senha').value;
      const pais = document.getElementById('select-pais').value;
      const moeda = document.getElementById('select-moedas').value;
      const numero = document.getElementById('input-numero').value;
      const cpf = document.getElementById('input-cpf').value;
      const nome = document.getElementById('input-nome').value;
      const sobrenome = document.getElementById('input-sobrenome').value;
      const dataNascimento = document.getElementById('date-nascimento').value;
      const codigoPromocional = document.getElementById('input-promo').value;
      if (codigoPromocional === 'utf30'){
        valorInicial += 30;
      }
            
      const usuario = new User(email, senha, pais, moeda, numero, cpf, nome, sobrenome, dataNascimento, valorInicial);
      const usuarioService = new UsuarioService();
      const usuarioJSON = JSON.stringify(usuario);

      usuarioService.salvarUsuario(usuarioJSON);
    } 
});

//FAZ A REQUISICAO PARA PEGAR OS PAISES NA API
async function paises() {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
  
      if (response.ok) {
        const data = await response.json();
  
        let paises = data.map((nomePais) => nomePais.translations.por.common);
        let selectPais = document.getElementById('select-pais');


        paises.sort((a, b) => a.localeCompare(b));

        paises.forEach((nomePais) => {
            let option = document.createElement('option');
            option.textContent = nomePais;
            selectPais.appendChild(option);
        });

      } else {
        throw new Error("Erro ao buscar os dados da API");
      }
    } catch (error) {
      console.error("Ocorreu um erro ao fazer a requisição:", error);
    }
  }

  //DEFINE A MOEDA A PARTIR DO NOME DO PAIS NO SELECT PAISES
  async function MoedaPorPais(nomePais) {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error("Erro ao buscar os dados da API");
      }
      const data = await response.json();
  
      const country = data.find((pais) => {
        return pais.translations.por.common.toLowerCase() === nomePais.toLowerCase();
      });
  
      if (!country) {
        throw new Error("País não encontrado");
      }
  
      const selectMoedas = document.getElementById('select-moedas');
      selectMoedas.innerHTML = ''; // Limpa opções anteriores, se houver
  
  
      for (const currency in country.currencies) {
        const option = document.createElement('option');
        option.textContent = country.currencies[currency].name;
        selectMoedas.appendChild(option);
      }
  
    } catch (error) {
      console.error("Ocorreu um erro ao buscar e imprimir as moedas:", error);
    }
  }

   //VALIDA A ENTRADA DO INPUT EMAIL
   async function validaEmail() {
    const emailInput = document.getElementById('input-email');
    const usuarioService = new UsuarioService();
    const emailValido = await usuarioService.verificaEmail(emailInput.value);
  
    if (emailInput.validity.valueMissing) {
      emailInput.classList.add('border-red-500');
      emailInput.classList.add('border-4');
      return false; 
    } else {
      emailInput.classList.remove('border-red-500');
      emailInput.classList.remove('border-4');
    }
  
    if (emailInput.validity.patternMismatch) {
      emailInput.classList.add('border-red-500');
      emailInput.classList.add('border-4');
      return false;  
    } else {
      emailInput.classList.remove('border-red-500');
      emailInput.classList.remove('border-4');
    }

    if(emailValido){
      alert('Já existe um usuário cadastrado com esse email');
      emailInput.classList.add('border-red-500');
      emailInput.classList.add('border-4');
      return false;
    }else {
      emailInput.classList.remove('border-red-500');
      emailInput.classList.remove('border-4');
    }

    return true;  
  }
  

  //VALIDA A ENTRADA DO INPUT SENHA
  function validaSenha() {
    const senhaInput = document.getElementById('input-senha');
    const spanSenha = document.getElementById('span-senha');

    if (senhaInput.validity.valueMissing) {
        senhaInput.classList.add('border-red-500');
        senhaInput.classList.add('border-4');
        spanSenha.classList.remove('hidden');
      return false;
    } else{
        senhaInput.classList.remove('border-red-500');
        senhaInput.classList.remove('border-4');
        spanSenha.classList.add('hidden');
    }

    if (senhaInput.validity.patternMismatch) {
        senhaInput.classList.add('border-red-500');
        senhaInput.classList.add('border-4');
        spanSenha.classList.remove('hidden');
        return false;
      } else{
        senhaInput.classList.remove('border-red-500');
        senhaInput.classList.remove('border-4');
        spanSenha.classList.add('hidden');
    }

    return true;
}

 //VALIDA A ENTRADA DO SELECT PAIS
 function validaPais() {
    const paisSelect = document.getElementById('select-pais');

    if (paisSelect.validity.valueMissing) {
        paisSelect.classList.add('border-red-500');
        paisSelect.classList.add('border-4');
      return false;
    } else{
        paisSelect.classList.remove('border-red-500');
        paisSelect.classList.remove('border-4');
    }

    return true;
}

//VALIDA A ENTRADA DO INPUT NUMERO
function validaNumero() {
    
    const numeroInput = document.getElementById('input-numero');

    if (numeroInput.validity.valueMissing) {
        numeroInput.classList.add('border-red-500');
        numeroInput.classList.add('border-4');
      return false; 
    } else {
        numeroInput.classList.remove('border-red-500');
        numeroInput.classList.remove('border-4');
    }
  
    if (numeroInput.validity.patternMismatch) {
        numeroInput.classList.add('border-red-500');
        numeroInput.classList.add('border-4');
      return false;  
    } else {
        numeroInput.classList.remove('border-red-500');
        numeroInput.classList.remove('border-4');
    }
    return true;  
  }

  //VALIDA A ENTRADA DO INPUT CPF
function validaCPF() {
    
    const cpfInput = document.getElementById('input-cpf');

    if (cpfInput.validity.valueMissing) {
        cpfInput.classList.add('border-red-500');
        cpfInput.classList.add('border-4');
      return false; 
    } else {
        cpfInput.classList.remove('border-red-500');
        cpfInput.classList.remove('border-4');
    }
  
    if (cpfInput.validity.patternMismatch) {
        cpfInput.classList.add('border-red-500');
        cpfInput.classList.add('border-4');
      return false;  
    } else {
        cpfInput.classList.remove('border-red-500');
        cpfInput.classList.remove('border-4');
    }
    return true;  
  }

    //VALIDA A ENTRADA DO INPUT NOME
function validaNome() {
    
    const nomeInput = document.getElementById('input-nome');

    if (nomeInput.validity.valueMissing) {
        nomeInput.classList.add('border-red-500');
        nomeInput.classList.add('border-4');
      return false; 
    } else {
        nomeInput.classList.remove('border-red-500');
        nomeInput.classList.remove('border-4');
    }
  
    if (nomeInput.validity.patternMismatch) {
        nomeInput.classList.add('border-red-500');
        nomeInput.classList.add('border-4');
      return false;  
    } else {
        nomeInput.classList.remove('border-red-500');
        nomeInput.classList.remove('border-4');
    }
    return true;  
  }

      //VALIDA A ENTRADA DO INPUT SOBRENOME
function validaSobrenome() {
    
    const sobrenomeInput = document.getElementById('input-sobrenome');

    if (sobrenomeInput.validity.valueMissing) {
        sobrenomeInput.classList.add('border-red-500');
        sobrenomeInput.classList.add('border-4');
      return false; 
    } else {
        sobrenomeInput.classList.remove('border-red-500');
        sobrenomeInput.classList.remove('border-4');
    }
  
    if (sobrenomeInput.validity.patternMismatch) {
        sobrenomeInput.classList.add('border-red-500');
        sobrenomeInput.classList.add('border-4');
      return false;  
    } else {
        sobrenomeInput.classList.remove('border-red-500');
        sobrenomeInput.classList.remove('border-4');
    }
    return true;  
  }

  //VALIDA A DATA DO INPUT DE DATA DE NASCIMENTO
  function validaDataNascimento() {
    const dataNascimentoInput = document.getElementById('date-nascimento');
    const dataNascimento = new Date(dataNascimentoInput.value);
    const hoje = new Date();
    const idade = hoje.getFullYear() - dataNascimento.getFullYear();

    if (dataNascimentoInput.validity.valueMissing) {
        dataNascimentoInput.classList.add('border-red-500');
        dataNascimentoInput.classList.add('border-4');
      return false; 
    } else {
        dataNascimentoInput.classList.remove('border-red-500');
        dataNascimentoInput.classList.remove('border-4');
    }
  
    if (dataNascimentoInput.validity.patternMismatch) {
        dataNascimentoInput.classList.add('border-red-500');
        dataNascimentoInput.classList.add('border-4');
      return false;  
    } else {
        dataNascimentoInput.classList.remove('border-red-500');
        dataNascimentoInput.classList.remove('border-4');
    }
    if (idade < 18 || idade > 200) {
        dataNascimentoInput.setCustomValidity('A idade deve estar entre 18 e 200 anos.');
        dataNascimentoInput.classList.add('border-red-500');
        dataNascimentoInput.classList.add('border-4');
        return false;
    } else {
          dataNascimentoInput.classList.remove('border-red-500');
          dataNascimentoInput.classList.remove('border-4');
    }

    return true;  
  }




