import { iniciarJocCanvas } from './canvasgame.js';
document.addEventListener('DOMContentLoaded', () => {
    
    const pantallaMenu = document.getElementById('pantalla-menu');
    const pantallaJoc = document.getElementById('pantalla-joc');
    
    const btnJugar = document.getElementById('btn-jugar');
    const btnOpcions = document.getElementById('btn-opcions');
    const btnPuntuacions = document.getElementById('btn-puntuacions');
    const btnCarregar = document.getElementById('btn-carregar');

    btnJugar.addEventListener('click', () => {
        pantallaMenu.style.display = 'none';
        pantallaJoc.style.display = 'block';
        console.log("Iniciant la partida... Carregant Canvas.");
		iniciarJocCanvas();
    });

    btnOpcions.addEventListener('click', () => {
        alert("Opcions del joc (A la Issue 4 i 5 ho programarem)");
    });

    btnPuntuacions.addEventListener('click', () => {
        alert("Pantalla de puntuacions");
    });

    btnCarregar.addEventListener('click', () => {
        alert("Carregant partida des de localStorage...");
    });
});