const puppeteer = require('puppeteer');
const fs = require('fs');
const ExcelJS = require('exceljs');


function removeWords(tableau_to_change, nom_personnage) {
    let tableau_changed = new Array(1);
    tableau_changed[0] = nom_personnage;

    for (let l = 0; l < tableau_to_change.length; l++) {
        // l = 5, 17, 29, 41
        // l -5 % 12 = 0 ☺
        if (!isNaN(tableau_to_change[l]) || tableau_to_change[l] == '-' && (l - 5) % 12 != 0)
            tableau_changed.push(tableau_to_change[l])
        // else 
        //     console.log("\t\t\t- " + tableau_to_change[l]);
    }
    return (tableau_changed);
}


function getCharacterName(titre) {
    let n = -1;
    nom_personnage = "";
    while (n < 100) {
        n++;
        if (titre[n] == ' ')
            return (nom_personnage);
        nom_personnage += titre[n];
    }
    return ("erreur nom trop long - fonction getCharacterName");
}

const list_url = fs.readFileSync('url.txt', 'utf8').split(/\r?\n/).map(line => line.trim()).filter(line => line !== '');
let tableau = new Array(list_url.length + 1);
tableau[0] = fs.readFileSync("entete.txt", 'utf8').split(/\r?\n/).map(line => line.trim()).filter(line => line !== '');


let titre = "erreur titre non récupéré";

(async () => {
    console.log("ouverture navigateur");
    const browser = await puppeteer.launch({ headless: true });
    console.log("navigateur ouvert, lancement de la boucle de recherche");
    const page = await browser.newPage();

    for (let i = 0; i < list_url.length; i++) {
        console.log("i = " + i);

        console.log("redirection vers la page : https://wiki.hoyolab.com/pc/hsr/entry/" + list_url[i].toString());
        await page.goto("https://wiki.hoyolab.com/pc/hsr/entry/" + list_url[i].toString(), { waitUntil: "load" });

        titre = await page.title();
        console.log("\tarrivé sur la page : " + titre);

        console.log("\t\ten attente du chargement du tableau...");
        await page.waitForSelector(".d-ascension-td", { visible: true });
        console.log("\t\t\t---");
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log("\t\t\ttableux chargé, début de la récupération du tableau...");

        let tableau_text = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".d-ascension-td"))
                .map(el => el.innerText.trim())
        });

        titre = await page.title();
        console.log("\t\t\ttableau récupéré, début de la mise en forme du tableau...");
        tableau[i + 1] = removeWords(tableau_text, getCharacterName(titre));
    }
    console.log("\nfin des recherches traitement en cours\n");
    await browser.close();

// envoyer dans un fichier Texte (optionnel)
    // fs.writeFileSync('resultats.txt', tableau.join("\n"), 'utf8');

    // Création d'un fichier Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("statistiques_personnages");

    tableau.forEach(row => {
        worksheet.addRow(row);
    });

    workbook.xlsx.writeFile("tableau_personnages.xlsx")
        .then(() => console.log("Fichier Excel créé avec succès : tableau_personnages.xlsx"))
        .catch(err => console.error("Erreur :", err));


    console.log("\n\t--- fin du programme ---\n");
})();
