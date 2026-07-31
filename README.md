# Diagnostic de Réalignement — Rijal Fit

Un quiz question par question avec barre de progression — dans l'esprit d'un
quiz de diagnostic à la "Testo Workout" (score instantané, profil en 3 zones
de couleur, courbe de trajectoire, fiches de composition corporelle), mais
entièrement dans la voix, la marque et les valeurs Rijal Fit — pas de photos
de torses musclés (contraire à la charte "anti-esthétique/anti-ego"), tout est
recréé en silhouettes SVG simples et blocs de couleur.

**Aucune IA, aucun PDF.** Tout est calculé instantanément côté navigateur
(scoring du quiz + formules de composition corporelle), ce qui règle du même
coup tous les problèmes de timeout/coût qu'on avait avec l'ancienne version
(qui appelait Claude pour générer un PDF). Le seul appel serveur restant sert
juste à enregistrer le lead avant d'afficher le résultat.

## Parcours

1. **Intro** — le hadith "Ton corps a un droit sur toi.", bouton "Lancer le diagnostic".
2. **Profil de base** — âge, taille, poids, niveau d'activité, objectif corporel
   (confidentiel, nécessaire pour les calculs de composition corporelle).
3. **10 questions** — une par écran, 3 réponses (A/B/C) valant 0/1/2 points.
   Thèmes : énergie au réveil, force/discipline, ventre, motivation, sommeil,
   présence en famille, humeur, ressenti pendant la prière, miroir — plus une
   10ᵉ question **silencieuse** ("ta situation professionnelle") qui sert de
   signal de contexte indirect, jamais affichée comme telle, n'entrant jamais
   dans le score de zone visible.
4. **Porte d'entrée** — un teaser du profil (zone + tagline) puis nom, prénom,
   email, téléphone obligatoires pour débloquer le résultat complet.
5. **Résultat complet** :
   - les 3 zones en comparaison,
   - fiche IMC (taille/poids/âge/IMC/activité + jauge à 5 bandes),
   - courbe de trajectoire (4 marqueurs, basée sur les vraies réponses),
   - taux de graisse estimé en fourchette (ex: "entre 25% et 30%") + jauge à 3 bandes,
   - fiche composition & besoins (masse grasse/maigre, métabolisme, TDEE, macros),
   - type de ventre le plus probable (déduit des réponses, pas un diagnostic),
   - **Bilan de Sens personnalisé** — le message du coach (par zone) + le
     "problème n°1" identifié à partir de la question la plus élevée,
   - CTA final vers l'appel découverte Calendly.

## Les 3 zones

| Zone | Points | Nom | Couleur |
|---|---|---|---|
| 1 | 0-6 | Réalignement Stable | kaki |
| 2 | 7-12 | Le Cycle Yoyo | or |
| 3 | 13-18 | Décrochage Installé | rouge |

Chaque zone a sa tagline et son message de coach (objet `ZONES` dans
`script.js`) — voix Rijal Fit (tutoiement, amānah, réalignement).

## Calculs de composition corporelle

Formules reconnues en sciences du sport (les mêmes que dans le script vidéo
`rijal-fit/Ce que tu dois savoir/4. Marketing/6. MSF Youtube/Bilan Sens/Script
Bilan.docx`) :
- **Deurenberg** (IMC + âge) → estimation du taux de graisse corporelle, sans
  mesure au ruban.
- **Katch-McArdle** (masse maigre) → métabolisme de base.
- TDEE = métabolisme de base × multiplicateur d'activité.
- Objectif calorique = TDEE ajusté selon l'objectif corporel (±15%/+10%).
- Macros : 2g/kg de protéines, 0.9g/kg de lipides, le reste en glucides.

Tout est présenté comme des **estimations**, jamais une mesure clinique (DEXA,
impédancemétrie, plis cutanés) — rappelé explicitement à l'écran.

## Structure

```
index.html                 → les 5 écrans (intro / bio / question / porte / résultat)
style.css                   → design Rijal Fit (kaki/or/beige/noir, Rajdhani/Inter)
script.js                   → questions, scoring, zones, calculs, jauges SVG, graphique, lead
api/log-lead.js             → fonction serverless : enregistre le lead (pas d'IA, pas de PDF)
google-apps-script/Code.gs  → script à coller dans une Google Sheet pour recevoir les leads
images/matt.jpg              → photo du coach, réutilisée dans le Bilan de Sens
```

## Mise en route

Plus besoin de clé API Anthropic. Il ne reste que :

### 1. Créer la feuille Google Sheets (recommandé avant tout partage public)

1. Crée une nouvelle Google Sheet (sheets.new).
2. Menu **Extensions → Apps Script**.
3. Supprime le code par défaut et colle le contenu de
   [`google-apps-script/Code.gs`](google-apps-script/Code.gs).
4. **Déployer → Nouveau déploiement** → type **Application web** — Exécuter en
   tant que **Moi**, Qui a accès : **Tout le monde**.
5. Autorise l'accès (c'est ton propre script).
6. Copie l'URL donnée à la fin (`https://script.google.com/macros/s/.../exec`).

### 2. Déployer sur Vercel

Ce projet est déjà connecté à GitHub (`muslimserinityforme-maker/bilan-sens-rijalfit`,
branche `main`) et au projet Vercel `bilan-sens-rijalfit` — un simple `git push`
suffit à redéployer.

Dans **Vercel → Settings → Environment Variables**, ajoute (ou laisse tel quel
si déjà fait) :
- `GOOGLE_SHEETS_WEBHOOK_URL` = l'URL copiée à l'étape 1 (optionnel mais recommandé).

`ANTHROPIC_API_KEY` peut être supprimée si elle est encore présente — elle
n'est plus utilisée par le code depuis l'abandon de la génération PDF par IA.

### 3. Tester

Ouvre `bilan-sens-rijalfit.vercel.app`, fais le quiz en entier, vérifie que :
- la page bio (âge/taille/poids/activité/objectif) s'affiche avant les questions,
- chaque question avance bien et que la barre de progression se met à jour,
- le teaser de zone puis le résultat complet s'affichent correctement,
- les fiches (IMC, taux de graisse, composition, type de ventre) affichent des
  chiffres cohérents avec ce que tu as saisi,
- la ligne apparaît dans la Google Sheet (si configurée),
- le lien Calendly final fonctionne.

## Ajustements possibles ensuite

- **Questions/scoring/zones** : tout est dans `QUESTIONS` et `ZONES` en haut
  de `script.js` — texte, seuils, messages du coach, "problème n°1" par question.
- **Type de ventre** : heuristique simple dans `determineBellyType()` (à partir
  des réponses ventre/humeur + âge) — à affiner si besoin de plus de nuance.
- **Graphique** : `renderChart()` génère un SVG maison à partir des réponses
  réelles (énergie = Q1, discipline = Q2, prière = Q8, poids = Q3). Pas de
  dépendance externe.
- **Suivi des leads** : loggés dans Vercel (`DIAGNOSTIC_LEAD`) et envoyés vers
  la Google Sheet si configurée. Champs : date, prénom, nom, email, téléphone,
  âge, taille, poids, activité, objectif, IMC, score, zone, signal contexte pro.
