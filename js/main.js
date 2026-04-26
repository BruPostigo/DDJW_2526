import { iniciarJocCanvas, carregarPartidaCanvas } from './canvasgame.js';

document.addEventListener('DOMContentLoaded', () => {
    const pantallaMenu = document.getElementById('pantalla-menu');
    const pantallaJoc = document.getElementById('pantalla-joc');
    const pantallaOpcions = document.getElementById('pantalla-opcions'); 
    
    const btnJugar = document.getElementById('btn-jugar');
    const btnJugarMode2 = document.getElementById('btn-jugar-mode2');
    const btnOpcions = document.getElementById('btn-opcions');
    const btnGuardarOpcions = document.getElementById('btn-guardar-opcions'); 
    const btnPuntuacions = document.getElementById('btn-puntuacions');
    const btnCarregar = document.getElementById('btn-carregar');
    const btnSortirJoc = document.getElementById('btn-sortir-joc'); // NOU BOTÓ!

    let configuracioJoc = { midaGrup: 2, numCartes: 12, mode: 1 };

    btnJugar.addEventListener('click', () => {
        pantallaMenu.style.display = 'none';
        pantallaJoc.style.display = 'block';
        configuracioJoc.mode = 1;
        iniciarJocCanvas(configuracioJoc); 
    });

    btnJugarMode2.addEventListener('click', () => {
        pantallaMenu.style.display = 'none';
        pantallaJoc.style.display = 'block';
        iniciarJocCanvas({ mode: 2, midaGrup: 2, numCartes: 12 });
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


    btnSortirJoc.addEventListener('click', () => {
        pantallaJoc.style.display = 'none';
        pantallaMenu.style.display = 'block';
    });


    btnCarregar.addEventListener('click', () => {
        const partidaCarregada = carregarPartidaCanvas(); 
        if (partidaCarregada) {
            pantallaMenu.style.display = 'none';
            pantallaJoc.style.display = 'block';
        }
    });

    btnPuntuacions.addEventListener('click', () => { alert("Puntuacions no requerides en aquesta versió base."); });
});