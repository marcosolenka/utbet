export class User {
  constructor(email, senha, pais, moeda, numero, cpf, nome, sobrenome, dataNascimento, valorEmConta) {
    this.email = email;
    this.senha = senha;
    this.pais = pais; //PAÍS
    this.moeda = moeda;
    this.numero = numero;
    this.cpf = cpf;
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.dataNascimento = dataNascimento;
    this.valorEmConta = valorEmConta;
  }

  set email(email_p){
    this._email = email_p;
  }

  set senha(senha_p){
    this._senha = senha_p;
  }

  set pais(pais_p){
    this._pais = pais_p;
  }

  set moeda(moeda_p){
    this._moeda = moeda_p;
  }

  set numero(numero_p){
    this._numero = numero_p;
  }

  set cpf(cpf_p){
    this._cpf = cpf_p;
  }

  set nome(nome_p){
    this._nome = nome_p;
  }

  set sobrenome(sobrenome_p){
    this._sobrenome = sobrenome_p;
  }

  set dataNascimento(dataNascimento_p){
    let data = new Date(dataNascimento_p);
    this._dataNascimento = data;
  }

  set valorEmConta(valor_p){
    this._valorEmConta = valor_p;
  }

  get email(){
    return this._email;
  }

  get pais(){
    return this._pais;
  }

  get moeda(){
    return this._moeda;
  }

  get numero(){
    return this._numero;
  }

  get cpf(){
    return this._cpf;
  }

  get nome(){
    return this._nome;
  }

  get sobrenome(){
    return this._sobrenome;
  }

  get dataNascimento(){
    let data = new Date(this._dataNascimento.getTime() - 3 * 60 * 60 * 1000);
    return data;
  }


  get valorEmConta(){
    return this._valorEmConta;
  }
}