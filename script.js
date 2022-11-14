var jogador;
var jogador1;
var jogador2;
var vencedor;

var pontuacao =[];
var texto = document.querySelector("#textoJogador");
var res = document.querySelector("#resultado");

var botao1 = document.getElementById('botaojog1');
botao1.addEventListener('click', escolherJogador1);

var botao2 = document.getElementById('botaojog2');
botao2.addEventListener('click', escolherJogador2);

jogador1 = document.getElementById('selecao1');
jogador2 = document.getElementById('selecao2');


function escolherJogador1(){
    selecao1.disabled= true;
    botao1.disabled= true;
    var cjog1 = document.getElementById('jog1');
    cjog1.innerHTML = jogador1.value;
}

function escolherJogador2(){
    selecao2.disabled= true;
    botao2.disabled= true;
    var cjog2 = document.getElementById('jog2');
    cjog2.innerHTML = jogador2.value;
    iniciarJogo();
}

function iniciarJogo(){
    pontuacao = [['','',''], ['','',''], ['','','']];
    texto.classList.remove("textoJogador");
    res.textContent='';
    var quadros = document.querySelectorAll(".quadro");
    jogador = jogador1.value;
    document.getElementById("jogadorDoTurno").textContent = jogador;
    for(let quadro of quadros){
        quadro.addEventListener('click', marcarQuadro);
        quadro.textContent="";
    }
}

function conferirResultado(){
    var possuiGanhador = false;
    for(var linha=0;linha<3;linha++){
        if(pontuacao[linha][0]!='' && pontuacao[linha][1]!='' && pontuacao[linha][2]!=''){
            if(pontuacao[linha][0] == pontuacao[linha][1] && pontuacao[linha][0] == pontuacao[linha][2]){
                possuiGanhador = true;
            }
        }
    }

    for(var coluna=0;coluna<3;coluna++){
        if(pontuacao[0][coluna]!='' && pontuacao[1][coluna]!='' && pontuacao[2][coluna]!=''){
            if(pontuacao[0][coluna] == pontuacao[1][coluna] && pontuacao[0][coluna] == pontuacao[2][coluna]){
                possuiGanhador = true;
            }
        }
    }

    //diagonais
    if(pontuacao[0][0] != '' && pontuacao[1][1]!= '' && pontuacao[2][2]!= ''){
        if(pontuacao[0][0] == pontuacao[1][1] && pontuacao[0][0] ==  pontuacao[2][2]){
            possuiGanhador=true;
        }
    }
    if(pontuacao[2][0] != '' && pontuacao[1][1]!= '' && pontuacao[0][2]!= ''){
        if(pontuacao[2][0] == pontuacao[1][1] && pontuacao[2][0] ==  pontuacao[0][2]){
            possuiGanhador=true;
        }
    }
    if(possuiGanhador){
        encerrarJogo();
    }
}

function encerrarJogo(){
    texto.classList.add("textoJogador");
    res.textContent = `Jogador ${jogador} ganhou!!!`
    placar();
    document.querySelectorAll(".quadro");
    var quadros =document.querySelectorAll(".quadro"); 
    for(let quadro of quadros){
        quadro.removeEventListener("click", marcarQuadro);
    }
}

function trocarJogador(){
    if(jogador == jogador1.value)
        jogador = jogador2.value;
    else
        jogador = jogador1.value;
}

function marcarQuadro(){
    if(this.textContent ==''){
        this.textContent = jogador;
        var linha = this.dataset.linha - 1;
        var coluna = this.dataset.coluna - 1;
        pontuacao[linha][coluna] = jogador;
        conferirResultado();
        trocarJogador();
        document.getElementById("jogadorDoTurno").textContent = jogador; 
    }
}

var vitoria1 = document.getElementById('vitoria__j1');
var derrota1 = document.getElementById('derrota__j1');
var vitoria2 = document.getElementById('vitoria__j2');
var derrota2 = document.getElementById('derrota__j2');
function placar(){
    
    console.log(jogador, jogador1.value, jogador2.value);
    if(jogador == jogador1.value){
        derrota2.innerHTML = parseInt(derrota2.textContent)+1;
        vitoria1.innerHTML= parseInt(vitoria1.textContent) + 1;
    } else if(jogador == jogador2.value){
        derrota1.innerHTML = parseInt(derrota1.textContent)+1;
        vitoria2.innerHTML= parseInt(vitoria2.textContent) + 1;
    }
}

function finalizarPartidas(){
    vencedor.classList.remove('esconde');   
    if(parseInt(vitoria1.textContent)>parseInt(vitoria2.textContent)){
        vencedor.innerHTML = `O jogador ${jogador1.value} venceu!<br> <img src="fogos2.png" alt="">`;
    }
    else
        vencedor.innerHTML = `O jogador ${jogador2.value} venceu!<br> <img src="fogos2.png" alt="">`;
}

var vencedor = document.getElementById('campeao');
document.getElementById('finalizarPartidas').addEventListener('click', finalizarPartidas);

document.getElementById('reiniciar').addEventListener('click', iniciarJogo);
