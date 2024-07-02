import { UsuarioService } from "./app/services/usuario.service.js";

$(document).ready(function () {
  $("#footer").load("./footer.html");
});

//VERIFICA LOGIN ANTES DE CARREGAR A PAGINA
document.addEventListener("DOMContentLoaded", function () {
  if (!verificarAutenticacao()) {
    $("#nav-logado").addClass("hidden");
    $("#nav-deslogado").removeClass("hidden");
    return;
  }
  $("#modal").addClass("hidden");
  $("#nav-logado").removeClass("hidden");
  $("#nav-deslogado").addClass("hidden");
  consultaSaldoEmConta();
});

// index.html

//ESCUTA O EVENTO PERSONALIZADO DE LOGIN NO ARQUIVO MODAL-LOGIN > INDEX.JS
document.addEventListener("loginSuccessEvent", function () {
  console.log("logado com sucesso");
  $("#modal").addClass("hidden");
  $("#nav-logado").removeClass("hidden");
  $("#nav-deslogado").addClass("hidden");
});

let botaoEntrar = document.getElementById("botao-login");
let botaoInscricao = document.getElementById("botao-inscricao");
let botaoDepositar = document.getElementById("botao-depositar");
let iconeUsuario = document.getElementById("icon-usuario");

//ABRE O MODAL DE LOGIN AO CLICAR NO BOTAO ENTRAR
botaoEntrar.addEventListener("click", function (event) {
  event.preventDefault();

  $(document).ready(function () {
    $("#modal").load("./app/pages/modal-login/index.html", function () {
      $("#modal").removeClass("hidden");
    });
  });
});

//ABRE O MODAL DE INSCRICAO AO CLICAR NO BOTAO INSCREVER-SE
botaoInscricao.addEventListener("click", function (event) {
  event.preventDefault();

  $(document).ready(function () {
    $("#modal").load("./app/pages/modal-registro/index.html", function () {
      $("#modal").removeClass("hidden");
    });
  });
});

//ABRE O MODAL DE DEPOSITO AO CLICAR NO BOTAO DEPOSITAR
botaoDepositar.addEventListener("click", function (event) {
  event.preventDefault();

  $(document).ready(function () {
    $("#modal").load("./app/pages/modal-deposito/index.html", function () {
      $("#modal").removeClass("hidden");
    });
  });
});

//MODAL-DEPOSITO: CARREGA A SEGUNDA PARTE DO DEPOSITO AO CLICAR NO BOTAO PROXIMO
$(document).on("click", "#botao-depositar-valor", function (event) {
  event.preventDefault();
  $("#etapa-deposito-1").addClass("hidden");
  $("#etapa-deposito-2").removeClass("hidden");
});

//MODAL-DEPOSITO: "COPIA" O CODIGO PIX E, AO PASSAR 5 SEGUNDOS, EFETUA O "DEPOSITO" NA CONTA
$(document).on("click", "#btn-copia-pix", function (event) {
  event.preventDefault();
  $("#pix-copia-sucesso").removeClass("hidden");

  setTimeout(function () {
    $("#pix-copia-sucesso").addClass("hidden");
    $("#deposito-efetuado").removeClass("hidden");
  }, 5000);
});

//ABRE O MODAL DE ENTRAR AO CLICAR NO TEXTO ENTRAR EM QUALQUER MODAL
$(document).on("click", "#modais-entrar", function (event) {
  event.preventDefault();
  $("#modal").addClass("hidden");

  $(document).ready(function () {
    $("#modal").load("./app/pages/modal-login/index.html", function () {
      $("#modal").removeClass("hidden");
    });
  });
});

//FECHA TODOS OS MODAIS AO CLICAR NO X
$(document).on("click", "#icone-fechar", function (event) {
  event.preventDefault();
  $("#modal").addClass("hidden");
});

//FECHA TODOS OS MODAIS AO CLICAR FORA DELE
window.addEventListener("click", function (event) {
  if (event.target === document.getElementById("modal")) {
    $("#modal").addClass("hidden");
  }
});

//CARREGA O MODAL-REGISTRO AO CLICAR NO BOTAO DE INSCREVER-SE DO MODAL-LOGIN
$(document).on("click", "#modal-login-btn-inscrever", function (event) {
  event.preventDefault();
  $("#modal").addClass("hidden");

  $(document).ready(function () {
    $("#modal").load("./app/pages/modal-registro/index.html", function () {
      $("#modal").removeClass("hidden");
    });
  });
});

//MODAL-REGISTRO: CARREGA A SEGUNDA PARTE DO REGISTRO AO CLICAR NO BOTAO PROXIMO
$(document).on("click", "#btn-proximo-modal-registro", function (event) {
  event.preventDefault();
  $("#etapa-registro-1").addClass("hidden");
  $("#etapa-registro-2").removeClass("hidden");
});

//MODAL-REGISTRO: CARREGA A PRIMEIRA PARTE DO REGISTRO AO CLICAR NO BOTAO VOLTAR
$(document).on("click", "#btn-voltar-modal-registro", function (event) {
  event.preventDefault();
  $("#etapa-registro-1").removeClass("hidden");
  $("#etapa-registro-2").addClass("hidden");
});

//ABRE A PAGINA DE PERFIL DO USUARIO AO CLICAR NO ICONE DO USUARIO
iconeUsuario.addEventListener("click", function (event) {
  event.preventDefault();


  $(document).ready(function () {
    $("#main").load("./app/pages/perfil/index.html", function () {
      $("#main").addClass("hidden");
    });
  });
});

//VERIFICA SE O USUARIO ESTA LOGADO
function verificarAutenticacao() {
  return localStorage.getItem("usuarioLogado") !== null;
}

//ADICIONA O SALDO EM CONTA AO HEADER
async function consultaSaldoEmConta() {
  const usuario = new UsuarioService();
  const email = localStorage.getItem("usuarioLogado");

  try {
      let valor = await usuario.consultarSaldo(email);
      let spanValor = document.getElementById('valor-depositado');
      if (spanValor) {
          spanValor.textContent = valor; // Atualiza o valor na UI
      }
      return valor; // Retorna o valor consultado
  } catch (error) {
      console.error('Erro ao consultar saldo:', error);
      throw error; // Opcional: você pode decidir o que fazer em caso de erro
  }
}

