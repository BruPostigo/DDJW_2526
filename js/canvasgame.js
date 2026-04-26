import { dissenysCartes, reversCarta } from './cards.js';

let tauler = [];
let imgRevers;
let imgAnvers = [];
let cartesGiradesTemporalment = [];
let bloqueigTauler = false;

let midaGrup = 2;
let modeJoc = 1;
let nivellActual = 1;
let punts = 0;

function crearImatgeSVG(svgString) {
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.src = url;
    return img;
}

function carregarImatges() {
    imgRevers = crearImatgeSVG(reversCarta);
    imgAnvers = dissenysCartes.map(dibuix => crearImatgeSVG(dibuix));
}


function guardarLocal() {
    let taulerNet = JSON.parse(JSON.stringify(tauler));
    taulerNet.forEach(c => {
        if (!c.resolta) c.girada = false;
    });

    const partida = {
        tauler: taulerNet,
        midaGrup: midaGrup,
        modeJoc: modeJoc,
        nivellActual: nivellActual,
        punts: punts
    };
    localStorage.setItem('memoryPartida', JSON.stringify(partida));
}


export function carregarPartidaCanvas() {
    let dades = localStorage.getItem('memoryPartida');
    if (!dades) {
        alert("No hi ha cap partida guardada prèviament!");
        return false;
    }

    let partida = JSON.parse(dades);
    tauler = partida.tauler;
    midaGrup = partida.midaGrup;
    modeJoc = partida.modeJoc;
    nivellActual = partida.nivellActual;
    punts = partida.punts;
    
    cartesGiradesTemporalment = [];
    bloqueigTauler = false;
    
    carregarImatges();
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    setTimeout(() => {
        dibuixarTauler(canvas, ctx);
        configurarClics(canvas, ctx);
    }, 100);
    
    return true;
}

export function iniciarJocCanvas(configuracio) {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    modeJoc = configuracio ? configuracio.mode : 1;
    cartesGiradesTemporalment = [];
    bloqueigTauler = false;
    carregarImatges();

    setTimeout(() => {
        if (modeJoc === 2) {
            nivellActual = 1;
            punts = 0;
            prepararNivell(canvas, ctx);
        } else {
            midaGrup = configuracio.midaGrup;
            generarTaulerProva(configuracio.numCartes);
            dibuixarTauler(canvas, ctx);
            configurarClics(canvas, ctx);
            guardarLocal(); 
        }
    }, 100);
}

function prepararNivell(canvas, ctx) {
    let cartesNivell = 12;
    if (nivellActual === 1) { midaGrup = 2; cartesNivell = 12; }
    else if (nivellActual === 2) { midaGrup = 3; cartesNivell = 12; }
    else if (nivellActual === 3) { midaGrup = 2; cartesNivell = 24; }
    else if (nivellActual === 4) { midaGrup = 3; cartesNivell = 24; }
    else {
        alert(`Felicitats! Has completat tots els nivells amb ${punts} punts!`);
        document.getElementById('pantalla-joc').style.display = 'none';
        document.getElementById('pantalla-menu').style.display = 'block';
        return;
    }

    cartesGiradesTemporalment = [];
    generarTaulerProva(cartesNivell);
    dibuixarTauler(canvas, ctx);
    configurarClics(canvas, ctx);
    guardarLocal(); 
}

function generarTaulerProva(numCartesTotal) {
    tauler = [];
    let idCartes = [];
    let numDibuixos = numCartesTotal / midaGrup;
    for (let i = 0; i < numDibuixos; i++) {
        for (let j = 0; j < midaGrup; j++) {
            idCartes.push(i % dissenysCartes.length); 
        }
    }
    idCartes.sort(() => Math.random() - 0.5);

    let columnes = numCartesTotal === 12 ? 4 : 6;
    let ampleCarta = numCartesTotal === 12 ? 100 : 75;
    let altCarta = numCartesTotal === 12 ? 150 : 110;
    let espai = numCartesTotal === 12 ? 20 : 12;

    let ampleTotal = (columnes * ampleCarta) + ((columnes - 1) * espai);
    let margeX = (800 - ampleTotal) / 2;
    let margeY = numCartesTotal === 12 ? 80 : 60; 
    
    let index = 0;
    for (let i = 0; index < idCartes.length; i++) {
        for (let j = 0; j < columnes && index < idCartes.length; j++) {
            tauler.push({
                x: margeX + j * (ampleCarta + espai),
                y: margeY + i * (altCarta + espai),
                width: ampleCarta,
                height: altCarta,
                id: idCartes[index],
                girada: false,
                resolta: false
            });
            index++;
        }
    }
}

function dibuixarTauler(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    if (modeJoc === 2) {
        ctx.fillText(`Nivell: ${nivellActual}`, 20, 30);
    }
    ctx.fillText(`Punts: ${punts}`, 650, 30);

    tauler.forEach(carta => {
        if (carta.girada || carta.resolta) {
            ctx.drawImage(imgAnvers[carta.id], carta.x, carta.y, carta.width, carta.height);
        } else {
            ctx.drawImage(imgRevers, carta.x, carta.y, carta.width, carta.height);
        }
    });
}

function configurarClics(canvas, ctx) {
    canvas.onclick = (e) => {
        if (bloqueigTauler) return;
        const rect = canvas.getBoundingClientRect();
        const ratoliX = e.clientX - rect.left;
        const ratoliY = e.clientY - rect.top;

        tauler.forEach(carta => {
            if (ratoliX >= carta.x && ratoliX <= carta.x + carta.width &&
                ratoliY >= carta.y && ratoliY <= carta.y + carta.height &&
                !carta.girada && !carta.resolta) {
                
                carta.girada = true;
                cartesGiradesTemporalment.push(carta);
                dibuixarTauler(canvas, ctx);

                if (cartesGiradesTemporalment.length === midaGrup) {
                    comprovarGrup(canvas, ctx);
                }
            }
        });
    };
}

function comprovarGrup(canvas, ctx) {
    bloqueigTauler = true; 
    const primerId = cartesGiradesTemporalment[0].id;
    const totesIguals = cartesGiradesTemporalment.every(carta => carta.id === primerId);

    if (totesIguals) {
        cartesGiradesTemporalment.forEach(carta => carta.resolta = true);
        cartesGiradesTemporalment = []; 
        punts += 10; 
        guardarLocal(); 
        dibuixarTauler(canvas, ctx);
        bloqueigTauler = false; 
        
        comprovarVictoria(canvas, ctx); 
    } else {
        punts = Math.max(0, punts - 2); 
        setTimeout(() => {
            cartesGiradesTemporalment.forEach(carta => carta.girada = false);
            cartesGiradesTemporalment = [];
            dibuixarTauler(canvas, ctx);
            bloqueigTauler = false;
        }, 800);
    }
}

function comprovarVictoria(canvas, ctx) {
    const totesResoltes = tauler.every(carta => carta.resolta);
    if (totesResoltes) {
        if (modeJoc === 2) {
            nivellActual++;
            setTimeout(() => {
                alert(`Nivell completat! Preparat per al Nivell ${nivellActual}?`);
                prepararNivell(canvas, ctx);
            }, 500);
        } else {
            setTimeout(() => {
                alert(`Has guanyat! Puntuació final: ${punts}`);
            }, 500);
        }
    }
}