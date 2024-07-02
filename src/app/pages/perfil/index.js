import { UsuarioService } from "../../services/usuario.service.js";

let botaoVoltar = document.getElementById('voltar');
let botaoSair = document.getElementById('sair');

botaoVoltar.addEventListener('click', (event) => {
    event.preventDefault();

    window.location.href = '/src/index.html';
});

botaoSair.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.clear();
    window.location.href = '/src/index.html';
});

consultaEmail();
consultaPais();
consultaMoeda();
consultaNumero();
consultaCPF();
consultaNome();
consultaSobrenome();
consultaDataNascimento();

async function consultaEmail() {
    const usuario = new UsuarioService();
    const email = localStorage.getItem("usuarioLogado");
    let inputEmail = document.getElementById('input-email');
  
    try {
        let valor = await usuario.getEmail(email);
        
        if (inputEmail) {
            console.log(valor);
            inputEmail.value = valor;
        }
        return valor; 
    } catch (error) {
        console.error('Erro ao consultar saldo:', error);
        throw error; 
    }
  }

  async function consultaPais() {
    const usuario = new UsuarioService();
    const email = localStorage.getItem("usuarioLogado");
    let inputPais = document.getElementById('select-pais');
  
    try {
        let valor = await usuario.getPais(email);
        
        if (inputPais) {
            console.log(valor);
            let option = document.createElement('option');
            option.value = valor;
            option.text = valor;
            inputPais.add(option);
        }
        return valor; 
    } catch (error) {
        console.error('Erro ao consultar saldo:', error);
        throw error;
    } 
 }

 async function consultaMoeda() {
    const usuario = new UsuarioService();
    const email = localStorage.getItem("usuarioLogado");
    let inputMoeda = document.getElementById('select-moedas');
  
    try {
        let valor = await usuario.getMoeda(email);
        
        if (inputMoeda) {
            console.log(valor);
            let option = document.createElement('option');
            option.value = valor;
            option.text = valor;
            inputMoeda.add(option);
        }
        return valor; 
    } catch (error) {
        console.error('Erro ao consultar saldo:', error);
        throw error;
    } 
}

async function consultaNumero() {
    const usuario = new UsuarioService();
    const email = localStorage.getItem("usuarioLogado");
    let inputNumero = document.getElementById('input-numero');
  
    try {
        let valor = await usuario.getNumero(email);
        
        if (inputNumero) {
            console.log(valor);
            inputNumero.value = valor;
        }
        return valor; 
    } catch (error) {
        console.error('Erro ao consultar saldo:', error);
        throw error; 
    }
  }

  async function consultaCPF() {
    const usuario = new UsuarioService();
    const email = localStorage.getItem("usuarioLogado");
    let inputCPF = document.getElementById('input-cpf');
  
    try {
        let valor = await usuario.getCPF(email);
        
        if (inputCPF) {
            console.log(valor);
            inputCPF.value = valor;
        }
        return valor; 
    } catch (error) {
        console.error('Erro ao consultar saldo:', error);
        throw error; 
    }
  }

  async function consultaNome() {
    const usuario = new UsuarioService();
    const email = localStorage.getItem("usuarioLogado");
    let inputNome = document.getElementById('input-nome');
  
    try {
        let valor = await usuario.getNome(email);
        
        if (inputNome) {
            console.log(valor);
            inputNome.value = valor;
        }
        return valor; 
    } catch (error) {
        console.error('Erro ao consultar saldo:', error);
        throw error; 
    }
  }

  async function consultaSobrenome() {
    const usuario = new UsuarioService();
    const email = localStorage.getItem("usuarioLogado");
    let inputSobrenome = document.getElementById('input-sobrenome');
  
    try {
        let valor = await usuario.getSobrenome(email);
        
        if (inputSobrenome) {
            console.log(valor);
            inputSobrenome.value = valor;
        }
        return valor; 
    } catch (error) {
        console.error('Erro ao consultar saldo:', error);
        throw error; 
    }
  }


