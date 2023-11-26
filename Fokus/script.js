const html = document.querySelector('html')
//buscam os botões no html
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const botoes = document.querySelectorAll('.app__card-button')

const startpauseBt = document.querySelector('#start-pause')
//busca a imagem no html
const banner = document.querySelector('.app__image')
//busca o titulo no html
const titulo = document.querySelector('.app__title')

//busca, cria, e deixa a musica de fundo em loop
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('sons/luna-rise-part-one.mp3')
musica.loop = true

const iniciarOuPausarBt = document.querySelector('#start-pause span')

const imagemBotao = document.querySelector('.app__card-primary-butto-icon')

const tempoNaTela = document.querySelector('#timer')

//temporizador
let tempoDecorridoEmSegundos = 1500
let intervaloId = null

//música ao dar play no temporizador
const temporizadorSoundPlay = new Audio('./sons/play.wav')

// Variável para controlar se o som já foi tocado
let somPlayJaTocado = false;

//música ao dar pause no temporizador
const temporizadorSoundPause = new Audio('./sons/pause.mp3')

//Variável para controlar se o som de pause já foi reproduzido
let somPauseJaTocado = false;

//música quando o temporizador zera
const temporizadorSoundZerado = new Audio('./sons/beep.mp3')

//Variável para controlar se o som de zerado já foi tocado
let somZeroJaTocado = false;

//toca a musica de fundo
musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else{
        musica.pause()
    }
})

//confere o click no botão foco
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alteraContexto('foco')
    focoBt.classList.add('active')
})

//confere o click no botão descanso-curto
curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alteraContexto('descanso-curto')
    curtoBt.classList.add('active')
})

//confere o click no botão descanso-longo
longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alteraContexto('descanso-longo')
    longoBt.classList.add('active')
})

//altera o contexto com base no botão selecionado
function alteraContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
            break;
        default:
            break;

    }
}


const contagemRegressiva = () => {
    if (!somPlayJaTocado) {
        temporizadorSoundPlay.play();
        somPlayJaTocado = true; // Marca que o som já foi tocado
    }


    if(tempoDecorridoEmSegundos <= 0) {
        if(!somZeroJaTocado){
            temporizadorSoundZerado.play()
            somZeroJaTocado = true; // Marca que o som já foi tocado
        }
        zerar()
        alert('tempo finalizado!!')
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startpauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId) {
        zerar()
        somPlayJaTocado = false; // Reseta a variável 
        //para permitir que o som toque novamente
        somZeroJaTocado = false; // Reseta a variável 
        //para permitir que o som toque novamente
        if(!somPauseJaTocado){
            temporizadorSoundPause.play()
            somPauseJaTocado = true;
        }
        somPauseJaTocado = false; // Reseta a variável 
        //para permitir que o som toque novamente
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar" 
    imagemBotao.setAttribute('src', './imagens/pause.png') 
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    intervaloId = null
    imagemBotao.setAttribute('src', './imagens/play_arrow.png')
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML  = `${tempoFormatado}` 
}

mostrarTempo()