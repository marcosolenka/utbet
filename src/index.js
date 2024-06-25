$(document).ready(function () {
  $("#footer").load("./footer.html");
});

//VERIFICA LOGIN ANTES DE CARREGAR A PAGINA
document.addEventListener('DOMContentLoaded', function() {
  if (!verificarAutenticacao()) {
      //window.location.href = '/login.html'; 
      console.log('usuario off');
  }
});


let botaoEntrar = document.getElementById('botao-login');
let botaoInscricao = document.getElementById('botao-inscricao');


//ABRE O MODAL DE LOGIN AO CLICAR NO BOTAO ENTRAR
botaoEntrar.addEventListener('click', function(event) {
  event.preventDefault();

  $(document).ready(function() {
    $("#modal").load("./app/pages/modal-login/index.html", function() {
      $('#modal').removeClass('hidden'); 
    });
  });
});

//ABRE O MODAL DE INSCRICAO AO CLICAR NO BOTAO INSCREVER-SE
botaoInscricao.addEventListener('click', function(event) {
  event.preventDefault();

  $(document).ready(function() {
    $("#modal").load("./app/pages/modal-registro/index.html", function() {
      $('#modal').removeClass('hidden'); 
    });
  });
});

//ABRE O MODAL DE ENTRAR AO CLICAR NO TEXTO ENTRAR EM QUALQUER MODAL
$(document).on('click', '#modais-entrar', function(event) {
  event.preventDefault();
  $('#modal').addClass('hidden');

  $(document).ready(function() {
    $("#modal").load("./app/pages/modal-login/index.html", function() {
      $('#modal').removeClass('hidden'); 
    });
  });
});



//FECHA TODOS OS MODAIS AO CLICAR NO X
$(document).on('click', '#icone-fechar', function(event) {
  event.preventDefault();
  $('#modal').addClass('hidden');
});

//FECHA TODOS OS MODAIS AO CLICAR FORA DELE
window.addEventListener('click', function(event) {
  if (event.target === document.getElementById('modal')) {
    $('#modal').addClass('hidden');
  }
});

//CARREGA O MODAL-REGISTRO AO CLICAR NO BOTAO DE INSCREVER-SE DO MODAL-LOGIN
$(document).on('click', '#modal-login-btn-inscrever', function(event) {
  event.preventDefault();
  $('#modal').addClass('hidden');

  $(document).ready(function() {
    $("#modal").load("./app/pages/modal-registro/index.html", function() {
      $('#modal').removeClass('hidden'); 
    });
  });
});

//MODAL-REGISTRO: CARREGA A SEGUNDA PARTE DO REGISTRO AO CLICAR NO BOTAO PROXIMO 
$(document).on('click', '#btn-proximo-modal-registro', function(event) {
  event.preventDefault();
  $('#etapa-registro-1').addClass('hidden');
  $('#etapa-registro-2').removeClass('hidden');
});

//MODAL-REGISTRO: CARREGA A PRIMEIRA PARTE DO REGISTRO AO CLICAR NO BOTAO VOLTAR
$(document).on('click', '#btn-voltar-modal-registro', function(event) {
  event.preventDefault();
  $('#etapa-registro-1').removeClass('hidden');
  $('#etapa-registro-2').addClass('hidden');
});

//VERIFICA SE O USUARIO ESTA LOGADO
function verificarAutenticacao() {
  return localStorage.getItem('usuarioLogado') === 'true';
}

