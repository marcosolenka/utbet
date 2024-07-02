export class UsuarioService {
    constructor(){}

    async salvarUsuario(usuario){
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: usuario
        })

        .then(response => response.json())
        .then(data => {
            console.log('Usuário salvo com sucesso:', data);
        })
        .catch(error => {
            console.error('Erro ao salvar usuário:', error);
        });
    } 

    async verificarUsuario(email, senha) {
        try {
            const response = await fetch('http://localhost:3000/users');
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados da API');
            }
            const usuarios = await response.json();
            const usuarioEncontrado = usuarios.find(usuario => usuario._email === email && usuario._senha === senha);
            return usuarioEncontrado ? true : false;

        } catch (error) {
            console.error('Erro ao verificar usuário:', error);
            return false;
        }
    }

    async verificaEmail(email) {
        try {
            const response = await fetch('http://localhost:3000/users');
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados da API');
            }
            const usuarios = await response.json();
            const usuarioEncontrado = usuarios.find(usuario => usuario._email === email);
            return usuarioEncontrado ? true : false;

        } catch (error) {
            console.error('Erro ao verificar usuário:', error);
            return false;
        }
    }

    async depositar(valor, email) {
        try {
            const response = await fetch('http://localhost:3000/users');
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados da API');
            }
            const usuarios = await response.json();
            const usuarioEncontrado = usuarios.find(usuario => usuario._email === email);
    
            if (usuarioEncontrado) {
                // Adiciona o valor ao saldo do usuário encontrado
                usuarioEncontrado.valorEmConta += valor;
                return true; 
            } else {
                return false; 
            }
    
        } catch (error) {
            console.error('Erro ao depositar:', error);
            return false;
        }
    }

    async consultarSaldo(email) {
        try {
            const response = await fetch('http://localhost:3000/users');
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados da API');
            }
            const usuarios = await response.json();
            const usuarioEncontrado = usuarios.find(usuario => usuario._email === email);
    
            if (usuarioEncontrado) {
                let valor = usuarioEncontrado.valorEmConta;
                return valor;
            } else {
                throw new Error('Usuário não encontrado');
            }
    
        } catch (error) {
            console.error('Erro ao consultar saldo:', error);
            throw error;
        }
    }  
}

