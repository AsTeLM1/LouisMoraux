// estimation.js

// Déclaration et initialisation de la variable total en dehors de la fonction
let total = 0;
let totalMin = 0;
let totalMax = 0;

// Sélectionner le formulaire
const formulaire = document.getElementById('formEstimation');
const titlePriceElement = document.querySelector('.titlePrice');
const PriceEstimation = document.getElementById('PriceEstimation');
const fourchette = document.getElementById('fourchette')
const redirection = document.getElementById('titlePrice');

// Ajouter un écouteur d'événement sur la soumission du formulaire
formulaire.addEventListener('submit', function(event) {
    event.preventDefault();

    // Récupérer les valeurs des champs du formulaire
    const typeSite = formulaire.elements['type_site'].value;
    const nbPages = formulaire.elements['nb_pages'].value;
    const design = formulaire.elements['design'].value;
    const referencement = formulaire.elements['referencement'].value;

    // Convertir la chaîne nbPages en nombre entier
    const nb_pages_int = convertstr(nbPages);

    // Réinitialiser les valeurs de total, totalMin et totalMax
    total = 0;
    totalMin = 0;
    totalMax = 0;

    // Ajouter les coûts en fonction des valeurs récupérées
    if (typeSite === "Vitrine") {
        total += PrixVitrine;
    }
    if (typeSite === "RDV") {
        total += PrixRDV;
    }
    if (typeSite === "VitRDV") {
        total += PrixVitrine + PrixRDV;
    }

    if (!isNaN(nb_pages_int)) {
        total += nb_pages_int * PrixPage;
    }

    if (design === "Simple") {
        total += NivDesignSimple;
    }
    if (design === "Avance") {
        total += NivDesignAvance;
    }
    if (design === "Complexe") {
        total += NivDesignComplexe;
    }
    if (referencement === "Refoui") {
        total += Referencement;
    }

    totalMin = total - (total * 0.3); // 10% en dessous du total
    totalMax = total + (total * 0.1); // 10% au-dessus du total


    PriceEstimation.textContent =  "Coût approximatif de votre site : ";
    fourchette.textContent = totalMin + "€" + " - " + totalMax + "€";
    titlePriceElement.style.display = "none";
    redirection.style.display = "none";
});

// Définition de la fonction convertstr
function convertstr(str) {
    if (str === "Plus") {
        return 10;
    }
    const entier = parseInt(str, 10); // Convertir str en entier
    return entier;
}

// Constantes des prix et niveaux de design
const PrixPage = 50;
const PrixVitrine = 30;
const PrixRDV = 110;
const NivDesignSimple = 0;
const NivDesignAvance = 75;
const NivDesignComplexe = 150;
const Referencement = 100;
