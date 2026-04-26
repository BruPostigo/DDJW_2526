import { dissenysCartes, reversCarta } from './cards.js';

let tauler = [];
let imgRevers;
let imgAnvers = [];
let cartesGiradesTemporalment = [];
let bloqueigTauler = false;
let midaGrup = 2;

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

export function iniciarJocCanvas(configuracio) {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    // Si no ens arriba configuració, posem la de per defecte
    midaGrup = configuracio ? configuracio.midaGrup : 2; 
    let numCartes = configuracio ? configuracio.numCartes : 12;

    cartesGiradesTemporalment = [];
    bloqueigTauler = false;
    carregarImatges();

    setTimeout(() => {
        generarTaulerProva(numCartes);
        dibuixarTauler(canvas, ctx);
        configurarClics(canvas, ctx);
    }, 100);
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

    // --- MILLORA DE DISSENY: Cartes més petites si n'hi ha 24 ---
    let columnes = numCartesTotal === 12 ? 4 : 6;
    let ampleCarta = numCartesTotal === 12 ? 100 : 80;
    let altCarta = numCartesTotal === 12 ? 150 : 120;
    let espai = 15;
    let margeX = (800 - (columnes * (ampleCarta + espai))) / 2;
    let margeY = 50;
    
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
        bloqueigTauler = false; 
    } else {
        setTimeout(() => {
            cartesGiradesTemporalment.forEach(carta => carta.girada = false);
            cartesGiradesTemporalment = [];
            dibuixarTauler(canvas, ctx);
            bloqueigTauler = false;
        }, 800);
    }
}