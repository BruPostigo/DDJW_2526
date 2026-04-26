import { dissenysCartes, reversCarta } from './cards.js';

function crearImatgeSVG(svgString) {
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.src = url;
    return img;
}

export function iniciarJocCanvas() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imgRevers = crearImatgeSVG(reversCarta);
    
    imgRevers.onload = () => {
        ctx.drawImage(imgRevers, 50, 50, 100, 150);
        ctx.drawImage(imgRevers, 170, 50, 100, 150);
        ctx.drawImage(imgRevers, 290, 50, 100, 150);
        ctx.drawImage(imgRevers, 410, 50, 100, 150);
    };
    
    console.log("Tauler preparat i cartes dibuixades!");
}