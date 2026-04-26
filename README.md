# MEMORY GAME - BRU POSTIGO CAMPRUBÍ

## i. Introducció
Aquest projecte és el resultat del Treball Individual de l'assignatura. Consisteix en el clàssic joc de memòria (fer parelles, trios o quartets) programat des de zero utilitzant HTML, CSS i JavaScript pur (Vanilla JS). Tot el motor visual del joc s'executa sobre un element Canvas de HTML5, i la gestió del codi s'ha anat fent de manera progressiva utilitzant GitHub i tancant les Issues corresponents.

## ii. Descripció del disseny del joc
He dividit la interfície en tres pantalles principals (Menú, Opcions i Joc) que s'oculten o es mostren modificant l'estil de display des de JavaScript. 

Per a les cartes, complint amb l'enunciat, no he utilitzat cap imatge externa (ni .png ni .jpg). He dissenyat els dibuixos (un cercle, un quadrat, un triangle i una estrella) escrivint codi SVG directament al fitxer JavaScript. 

El joc compta amb dos modes:
* **Mode 1 (Lliure):** Permet anar a opcions i triar a quina versió vols jugar (parelles, trios, quartets) i la mida del tauler (12 o 24 cartes).
* **Mode 2 (Nivells):** Un mode campanya on comences al nivell 1 (fàcil) i el joc va pujant la dificultat automàticament passant a taulers més grans i demanant trios en lloc de parelles. A més, inclou un sistema de puntuació.

## iii. Descripció de les parts més rellevants de la implementació
La part tècnica més important ha estat la gestió del Canvas i l'estructura de dades.
* **Modularitat:** He separat el codi en diferents fitxers (`main.js` per als menús, `canvasgame.js` per a la lògica del tauler i `cards.js` per als SVG) utilitzant `import` i `export`.
* **Conversió d'SVG a Canvas:** Com que el Canvas no llegeix text SVG directament, he hagut d'implementar una funció que transforma el text (String) en un objecte de tipus Blob perquè el Canvas ho pugui pintar com si fos una imatge nativa.
* **Detecció de clics:** Per saber quina carta es toca, el joc llegeix les coordenades del ratolí `e.clientX` i `e.clientY`, els resta els marges del Canvas, i comprova dins d'un bucle si aquestes coordenades xoquen amb la posició X i Y d'alguna carta de l'array `tauler`.
* **LocalStorage:** He creat un autoguardat silenciós que converteix l'array del tauler en un text pla amb `JSON.stringify` i ho desa al navegador per poder carregar la partida posteriorment.

## iv. Conclusions i problemes trobats
El projecte m'ha servit per entendre molt millor com funciona la lògica de redibuixat del Canvas i com comunicar diferents fitxers JS entre ells.

El principal problema que m'he trobat durant el desenvolupament ha estat la maquetació del tauler al Canvas. Al principi, quan es generaven 24 cartes, les de la part inferior sortien tallades fora del Canvas i s'encavalcaven amb el text de la puntuació. Ho vaig haver de solucionar refent la funció que calcula la graella, ajustant les mides de les cartes dinàmicament (fent-les més petites si n'hi ha 24) i modificant els espais.

També m'ha costat una mica adaptar-me al flux de treball amb Git (crear branques, fer els commits per cada pas i anar tancant les Issues), però finalment he pogut fer el merge a la branca principal sense conflictes greus.