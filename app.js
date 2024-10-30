let listaDeNumerosSorteados = [];
let numerosLimite = 10;
let nivelDeDificuldade = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

exibirTextoNaTela('h1', 'Jogo do número secreto');
exibirTextoNaTela('p', `Escolha um número entre 1 e ${nivelDeDificuldade}`);

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('proximonivel').removeAttribute('disabled');
        document.getElementById('reiniciar').removeAttribute('disabled');
        tentativas = 1;
        limparCampo();
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', `O número secreto é menor que ${chute}`);
        } else {
            exibirTextoNaTela('p', `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * nivelDeDificuldade + 1);
    let quantidadeDeNumerosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeNumerosNaLista == numerosLimite){
        exibirTextoNaTela('p', 'Clique em próximo nível!');
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    nivelDeDificuldade = 100;  // Reseta a dificuldade inicial
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('proximonivel').setAttribute('disabled', true);
}

function proximoNivel() {
    // Aumenta a dificuldade e gera um novo número secreto
    nivelDeDificuldade += 100;
    numeroSecreto = gerarNumeroAleatorio();
    exibirTextoNaTela('p', `Agora escolha um número entre 1 e ${nivelDeDificuldade}`);
    limparCampo();
    tentativas = 1;
    document.getElementById('proximonivel').setAttribute('disabled', true);
}

function exibirMensagemInicial() { 
    exibirTextoNaTela('h1', 'Jogo do número secreto'); 
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${nivelDeDificuldade}`);
}

exibirMensagemInicial();



