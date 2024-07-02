let form = document.getElementById("modal-deposito");
console.log('ta aqui');

document.getElementById('valor-deposito').addEventListener('blur', function () {
    let botaoDepositar = document.getElementById('botao-depositar-valor');
    console.log('chegou aqui');
    if (form.checkValidity()) {
        console.log('Formulário válido');
        botaoDepositar.disabled = false;
        botaoDepositar.classList.remove('cursor-not-allowed', 'opacity-50');
    } else {
        console.log('Formulário inválido');
        botaoDepositar.disabled = true;
        botaoDepositar.classList.add('cursor-not-allowed', 'opacity-50');
    }
});
