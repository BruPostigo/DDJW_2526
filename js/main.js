addEventListener('load', function() {
    document.getElementById('play').addEventListener('click', 
    function(){
        let aliesJugador = prompt("Introdueix el teu àlies per jugar:");
        console.log(aliesJugador);
        window.location.assign("./html/game.html");
    });

    document.getElementById('options').addEventListener('click', 
    function(){
        console.error("Opció no implementada");
    });

    document.getElementById('saves').addEventListener('click', 
    function(){
        console.error("Opció no implementada");
    });

    document.getElementById('exit').addEventListener('click', 
    function(){
        console.warn("No es pot sortir!");
    });
});