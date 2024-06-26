import { UsuarioService } from "../../services/usuario.service.js";
const form = document.getElementById("modal-login");

// VALIDA O LOGIN DO USUARIO
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (form.checkValidity()) {
    const email = document.getElementById("email-input").value;
    const senha = document.getElementById("senha-input").value;

    const usuarioService = new UsuarioService(); // Corrigir a instância aqui
    const verificaUsuario = await usuarioService.verificarUsuario(email, senha);

    if (verificaUsuario) {
      localStorage.setItem("usuarioLogado", "true");
      logadoComSucesso();
    } else {
      console.log("erro");
    }
  }
});

//DISPARA UM EVENTO PERSONALIZADO DE LOGIN BEM SUCEDIDO
function logadoComSucesso() {
  const loginEvent = new CustomEvent("loginSuccessEvent");
  document.dispatchEvent(loginEvent);
}
