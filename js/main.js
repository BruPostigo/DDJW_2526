import { iniciarJocCanvas } from './canvasgame.js';

document.addEventListener('DOMContentLoaded', () => {
    
    const pantallaMenu = document.getElementById('pantalla-menu');
    const pantallaJoc = document.getElementById('pantalla-joc');
    const pantallaOpcions = document.getElementById('pantalla-opcions'); 
    
    const btnJugar = document.getElementById('btn-jugar');
    const btnOpcions = document.getElementById('btn-opcions');
    const btnGuardarOpcions = document.getElementById('btn-guardar-opcions'); 
    const btnPuntuacions = document.getElementById('btn-puntuacions');
    const btnCarregar = document.getElementById('btn-carregar');

    let configuracioJoc = {
        midaGrup: 2,
        numCartes: 12
    };

    btnJugar.addEventListener('click', () => {
        pantallaMenu.style.display = 'none';
        pantallaJoc.style.display = 'block';
        console.log(configuracioJoc);
        iniciarJocCanvas(configuracioJoc); 
    });

    btnOpcions.addEventListener('click', () => {
        pantallaMenu.style.display = 'none';
        pantallaOpcions.style.display = 'block';
    });

    btnGuardarOpcions.addEventListener('click', () => {
        configuracioJoc.midaGrup = parseInt(document.getElementById('mida-grup').value);
        configuracioJoc.numCartes = parseInt(document.getElementById('num-cartes').value);
        
        pantallaOpcions.style.display = 'none';
        pantallaMenu.style.display = 'block';
    });

    btnPuntuacions.addEventListener('click', () => {
        alert("Puntuacions: properament");
    });

    btnCarregar.addEventListener('click', () => {
        alert("Carregar: properament");
    });
});