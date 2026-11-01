# Auto-évaluations – Projet web Blue Prince

Pages d'auto-évaluation qui accompagnent le projet web du premier semestre du **BUT MMI** (Métiers du Multimédia et de l'Internet). Pendant ce projet, les étudiants réalisent en HTML, CSS et JavaScript un site consacré au jeu vidéo *Blue Prince*.

À la fin de chaque partie du projet, l'étudiant répond à 10 questions, valide, puis compare ses réponses au corrigé. **Rien n'est noté** : l'objectif est de lui permettre de repérer seul ce qu'il a compris et ce qu'il doit revoir.

## Contenu du dépôt

| Fichier | Rôle |
|---|---|
| `01-xx.html` | La structure HTML |
| `02-xx.html` | Le CSS de base |
| `03-xx.html` | La mise en page avec Flexbox et Grid |
| `04-xx.html` | Le responsive |
| `05-xx.html` | JavaScript, premières interactions |
| `06-xx.html` | Le carrousel (partie bonus) |
| `autoeval.js` | Script commun : affichage des questions, du corrigé et remise à zéro |
| `style.css` | Feuille de style commune, reprise de la charte du site Blue Prince |
| `index.html` | Page « Il n'y a rien à voir ici », qui empêche d'afficher la liste des fichiers du dossier |

## Fonctionnement

Chaque page contient 10 questions de trois types :

- **QCM à réponse unique** (boutons radio) ;
- **QCM à réponses multiples** (cases à cocher) ;
- **QROC**, questions à réponse ouverte courte (zone de texte).

L'ordre des propositions des QCM est **mélangé à chaque affichage**, pour que la position d'une proposition ne donne aucun indice sur la bonne réponse.

Au clic sur **« Valider mes réponses »**, la page passe en mode corrigé :

- les réponses sont verrouillées ;
- pour les QCM, les propositions choisies portent l'étiquette « Votre choix », suivies de la ou des bonnes réponses et d'une explication ;
- pour les QROC, la réponse saisie est affichée, suivie de la réponse attendue et d'une explication.

Le bouton devient alors **« Recommencer »** : il vide les réponses et mélange de nouveau les propositions.

## Modifier les questions

Les questions de chaque partie se trouvent **dans la page elle-même**, dans le bloc `<script>` placé en bas du fichier, sous la forme d'une constante `questions` :

```js
const questions = [
    {
        "type": "qcm1",
        "intitule": "Quelle balise utiliser pour regrouper les liens de navigation principaux du site ?",
        "choix": [
            { "texte": "`menu`", "correct": false },
            { "texte": "`nav`", "correct": true },
            { "texte": "`header`", "correct": false }
        ],
        "explication": "`nav` signale un bloc de navigation."
    },
    {
        "type": "qroc",
        "intitule": "Quel attribut de la balise `img` permet de décrire l'image ?",
        "reponse": "`alt`",
        "explication": "Il est lu par les lecteurs d'écran."
    }
];
```

| Propriété | Description |
|---|---|
| `type` | `"qcm1"` (une seule réponse), `"qcmN"` (plusieurs réponses) ou `"qroc"` (réponse courte) |
| `intitule` | Texte de la question |
| `choix` | QCM uniquement : la liste des propositions, avec `"correct": true` pour chaque bonne réponse |
| `reponse` | QROC uniquement : la réponse attendue |
| `explication` | Phrase affichée dans le corrigé |

Dans tous les textes, ce qui est placé entre accents graves (`` `ainsi` ``) s'affiche comme du code. Le reste est affiché tel quel : les balises HTML écrites dans une question s'affichent sous forme de texte, elles ne sont pas interprétées.

L'ordre des propositions dans le fichier n'a pas d'importance, puisqu'elles sont mélangées à l'affichage.

## Mise en ligne

Les pages sont statiques : il suffit de déposer **tout le dossier** sur un serveur web, sur GitHub Pages ou sur Moodle (ressource « Dossier », ou ressource « Fichier » à partir de l'archive décompressée). Chaque page a besoin de `style.css` et de `autoeval.js` à côté d'elle.

Il n'y a aucune dépendance à installer. Les polices (Cinzel et Source Sans 3) sont chargées depuis Google Fonts : sans connexion internet, les pages restent lisibles avec les polices de secours.

## Limites connues

- **Les réponses sont visibles dans le code source** de chaque page. C'est sans conséquence, puisque les auto-évaluations ne sont pas notées.
- **`index.html` cache seulement la liste des fichiers.** Une personne qui connaît le nom d'une page peut toujours l'ouvrir (d'où l'ajout d'un UUID dans chaque nom).
- **Aucune réponse n'est enregistrée.** Recharger la page efface les réponses saisies, et l'enseignant n'a pas accès aux résultats des étudiants.
