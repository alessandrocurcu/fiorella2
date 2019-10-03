## Intro
* Node: v11.9.0
* Assicurati di avere node installato: `node -v`
* Installa le dipendenze con `npm i`
* Il task manager è gulp 4. Se non si ha gulp installato globalmente si possono lanciare i comandi di gulp, da terminale, prefissando tali comandi con `npx`; "npx" è una utility di npm che permette di usare i CLI dei vari pacchetti usando i pacchetti installati localmente nel `node_modules` con `npm i`.
* I task si trovano nel file `gulpfile.js`

## Tool usati
### Preprocessori e Bundler
* PUG per file HTML 
* SCSS per file CSS
* Webpack come bundler per i JS

### Immagini
* Le immagini non ottimizzate si trovano in src/img-not
* Siccome ottimizzare le immagini richiede tempo (e alla fine è una cosa che va fatta una volt sola), il task per ottimizzare le immagini non viene eseguito quando si fa la build.
* Occorre esplicitamente lanciare il task di ottimizzazione delle immagini lanciando `npx gulp optimizeImage`: le immagini ottimizzate finiranno in src/img.
* Lanciando il comando di build il task prenderà le immagini da src/img e le porterà nel dist con un'ulteriore ottimizzazione

## Sviluppo
* Durante lo sviluppo lancia il server con live reload e browser sincronizzati con `npx gulp dev` — o `gulp dev` se hai gulp 4 installato globalmente

## Build
* Ottimizza le immagini: `npx gulp optimizeImage` (Non lanciarlo se non sono state aggiunte nuove immagini in "./src/img-not")
* Lancia `npx gulp build`
 