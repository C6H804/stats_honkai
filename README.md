# stats_honkai

## Description
Ce projet permet de récupérer les données des personnages de hokai depuis le wiki et de les exporté dans un fichier excel

---

## Prérequis
Avant de commencer assure-toi d'avoir :
- [Node.js](https://nodejs.org/) installé sur ton ordinateur
- [npm](https://www.npmjs.com/) installé (fourni avec Node.js)

---

## Sources
Utilise les données du site : https://wiki.hoyolab.com/pc/hsr/aggregate/104
Utilise puppeteer : https://pptr.dev/
Utilise exceljs : https://www.npmjs.com/package/exceljs/v/0.2.19

---


## Utilisation
Assure-toi d'avoir tous les fins de liens dans le fichier url.txt
chaques lignes doit contenir un code qui correspond à l'url de la page des personnages du site https://wiki.hoyolab.com/pc/hsr/aggregate/104
- exemple : 17 pour la page https://wiki.hoyolab.com/pc/hsr/entry/17

**IMPORTANT : La page doit contenir le tableau de stats (si le personnage est trop récent il est possible qu'il n'y soit pas, dans ce cas ne pas l'inclure dans url.txt)**

---

## Installation
Clone le projet et installe les dépendances :
```sh
npm install puppeteer
npm install exceljs
```

---

## Démarage du programme
Dans le repo en bash effectuer la commande :
```sh
node app.js
```
