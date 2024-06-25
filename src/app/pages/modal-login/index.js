import { UsuarioService } from '../../services/usuario.service.js';
const form = document.getElementById('modal-login');

// VALIDA O LOGIN DO USUARIO
form.addEventListener('submit', async function(event) {
    event.preventDefault();
  
    if (form.checkValidity()) {
        const email = document.getElementById('email-input').value;
        const senha = document.getElementById('senha-input').value;
        console.log(email);
        console.log(senha);
        
        console.log('Iniciando verificação do usuário com:', email, senha); // Log para depuração

        const usuarioService = new UsuarioService(); // Corrigir a instância aqui
        const verificaUsuario = await usuarioService.verificarUsuario(email, senha);
  
        if (verificaUsuario) {
            localStorage.setItem('usuarioLogado', 'true');
        } else {
            console.log('erro');
        }
    } 
});
