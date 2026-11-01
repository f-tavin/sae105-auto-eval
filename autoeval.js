/* =========================================================
   AUTO-ÉVALUATION – Script commun aux 6 parties
   Les questions sont définies dans chaque page HTML,
   dans la constante "questions". Ce script :
   1. affiche les questions (propositions des QCM mélangées) ;
   2. au clic sur "Valider", affiche les réponses de
      l'étudiant et le corrigé sous chaque question ;
   3. au clic sur "Recommencer", remet tout à zéro.
   ========================================================= */

const zoneQuestions = document.querySelector("#questions");
const boutonPrincipal = document.querySelector("#valider");
let modeCorrige = false;


/* ===== Outils ===== */

// Empêche le texte d'être interprété comme du HTML
function echapper(texte) {
    return texte
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

// Transforme `du code` en <code>du code</code>
function formater(texte) {
    return echapper(texte).replace(/`([^`]+)`/g, "<code>$1</code>");
}

// Mélange une copie d'une liste (algorithme de Fisher-Yates)
function melanger(liste) {
    const copie = liste.slice();
    for (let i = copie.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = copie[i];
        copie[i] = copie[j];
        copie[j] = temp;
    }
    return copie;
}

function libelleType(question) {
    if (question.type === "qroc") {
        return "Réponse courte";
    }
    if (question.type === "qcmN") {
        return "Plusieurs réponses possibles";
    }
    return "Une seule réponse";
}


/* ===== 1. Affichage des questions ===== */

function afficherQuestions() {
    let html = "";

    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const nom = "q" + (i + 1);

        html += '<section class="question" id="' + nom + '">';
        html += '<p class="entete-question"><span class="numero">Question ' + (i + 1) + '</span>';
        html += '<span class="type">' + libelleType(q) + "</span></p>";
        html += '<h2 class="intitule">' + formater(q.intitule) + "</h2>";

        if (q.type === "qroc") {
            html += '<textarea class="saisie" rows="2" spellcheck="false" placeholder="Votre réponse…" aria-label="Votre réponse à la question ' + (i + 1) + '"></textarea>';
        } else {
            const typeCase = q.type === "qcmN" ? "checkbox" : "radio";
            const choix = melanger(q.choix);
            html += '<ul class="choix">';
            for (let j = 0; j < choix.length; j++) {
                html += "<li><label>";
                html += '<input type="' + typeCase + '" name="' + nom + '" data-correct="' + choix[j].correct + '">';
                html += "<span>" + formater(choix[j].texte) + "</span>";
                html += "</label></li>";
            }
            html += "</ul>";
        }

        // Le corrigé est préparé mais reste caché jusqu'à la validation
        html += '<div class="corrige">';
        if (q.type === "qroc") {
            html += '<p class="titre-corrige">Réponse attendue</p>';
            html += '<p class="reponse-attendue">' + formater(q.reponse) + "</p>";
        } else {
            const bonnes = q.choix.filter(function (c) { return c.correct; });
            html += '<p class="titre-corrige">' + (bonnes.length > 1 ? "Réponses attendues" : "Réponse attendue") + "</p>";
            html += '<ul class="bonnes-reponses">';
            for (let j = 0; j < bonnes.length; j++) {
                html += "<li>" + formater(bonnes[j].texte) + "</li>";
            }
            html += "</ul>";
        }
        html += '<p class="explication">' + formater(q.explication) + "</p>";
        html += "</div>";

        html += "</section>";
    }

    zoneQuestions.innerHTML = html;
}


/* ===== 2. Affichage du corrigé ===== */

function afficherCorrige() {
    const sections = document.querySelectorAll(".question");

    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];

        // On bloque les réponses : l'étudiant compare, il ne corrige plus
        const champs = section.querySelectorAll("input, textarea");
        for (let j = 0; j < champs.length; j++) {
            champs[j].disabled = true;
        }

        if (questions[i].type === "qroc") {
            const saisie = section.querySelector(".saisie");
            const texte = saisie.value.trim();
            const bloc = document.createElement("div");
            bloc.className = "votre-reponse";
            bloc.innerHTML = '<p class="titre-corrige">Votre réponse</p>' +
                (texte === "" ? '<p class="sans-reponse">Sans réponse</p>' : "<p>" + echapper(texte) + "</p>");
            saisie.replaceWith(bloc);
        } else {
            const cochees = section.querySelectorAll("input:checked");
            // Une étiquette rend les choix de l'étudiant bien visibles
            for (let j = 0; j < cochees.length; j++) {
                const marque = document.createElement("span");
                marque.className = "marque";
                marque.textContent = "Votre choix";
                cochees[j].parentElement.appendChild(marque);
            }
            if (cochees.length === 0) {
                const message = document.createElement("p");
                message.className = "sans-reponse";
                message.textContent = "Vous n'avez rien coché.";
                section.querySelector(".choix").after(message);
            }
        }
    }

    document.body.classList.add("mode-corrige");
}


/* ===== 3. Le bouton : valider ou recommencer ===== */

boutonPrincipal.addEventListener("click", function () {
    if (modeCorrige) {
        document.body.classList.remove("mode-corrige");
        afficherQuestions();
        boutonPrincipal.textContent = "Valider mes réponses";
        modeCorrige = false;
    } else {
        afficherCorrige();
        boutonPrincipal.textContent = "Recommencer";
        modeCorrige = true;
    }
    window.scrollTo(0, 0);
});

afficherQuestions();
