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

export function iniciarJocCanvas() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    cartesGiradesTemporalment = [];
    bloqueigTauler = false;
    carregarImatges();
    setTimeout(() => {
        generarTaulerProva();
        dibuixarTauler(canvas, ctx);
        configurarClics(canvas, ctx);
    }, 100);
}

function generarTaulerProva() {
    tauler = [];
    let idCartes = [0, 0, 1, 1, 2, 2, 3, 3, 0, 0, 1, 1]; 
    idCartes.sort(() => Math.random() - 0.5);
    let margeX = 140; 
    let margeY = 40;
    let espai = 20;
    let index = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            tauler.push({
                x: margeX + j * (100 + espai),
                y: margeY + i * (150 + espai),
                width: 100,
                height: 150,
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
        }, 1000);
    }
}