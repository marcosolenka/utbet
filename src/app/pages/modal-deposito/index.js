import { UsuarioService } from "../../services/usuario.service.js";

let form = document.getElementById("modal-deposito");
let botaoCopiaPix = document.getElementById('btn-copia-pix');
let valor = 0;

document.getElementById('valor-deposito').addEventListener('blur', function () {
    let botaoDepositar = document.getElementById('botao-depositar-valor');
    if (form.checkValidity()) {
        console.log('Formulário válido');
        botaoDepositar.disabled = false;
        botaoDepositar.classList.remove('cursor-not-allowed', 'opacity-50');
        valor = document.getElementById('valor-deposito').value;
    } else {
        console.log('Formulário inválido');
        botaoDepositar.disabled = true;
        botaoDepositar.classList.add('cursor-not-allowed', 'opacity-50');
    }
});

botaoCopiaPix.addEventListener("click", function (event) {
    event.preventDefault();
    adicionarSaldo(valor);
});

async function adicionarSaldo(valor) {
    const usuario = new UsuarioService();
    const email = localStorage.getItem("usuarioLogado");
      
    try {
        await usuario.depositar(valor, email);
    } catch (error) {
        console.error('Erro ao adicionar saldo:', error);
        throw error; 
    }
}