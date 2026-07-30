# Diagnostic de Réalignement — Rijal Fit

Un quiz de 9 questions, question par question avec barre de progression — dans
l'esprit d'un quiz de diagnostic à la "Testo Workout" (score instantané, profil
en 3 zones de couleur, courbe de trajectoire), mais entièrement dans la voix et
la marque Rijal Fit.

**Aucune IA, aucun PDF.** Le score est calculé instantanément côté navigateur
(0 à 18 points, 3 zones), ce qui règle du même coup tous les problèmes de
timeout/coût qu'on avait avec l'ancienne version (qui appelait Claude pour
générer un PDF). Le seul appel serveur restant sert juste à enregistrer le lead
avant d'afficher le résultat.

## Parcours

1. **Intro** — présentation du diagnostic, bouton "Lancer le diagnostic".
2. **9 questions** — une par écran, 3 réponses (A/B/C) valant 0/1/2 points.
   Thèmes : énergie au réveil, force/discipline, ventre, motivation, sommeil,
   présence en famille, humeur, régularité dans la prière, miroir.
3. **Porte d'entrée** — un teaser du profil (zone + tagline) puis nom, prénom,
   email, téléphone obligatoires pour débloquer le résultat complet.
4. **Résultat complet** — zone (voir plus bas), les 3 profils en comparaison,
   une courbe de trajectoire (4 marqueurs, basée sur les vraies réponses),
   un message personnel du coach adapté à la zone, puis le CTA vers l'appel
   découverte Calendly.

## Les 3 zones

| Zone | Points | Nom | Couleur |
|---|---|---|---|
| 1 | 0-6 | Réalignement Stable | kaki |
| 2 | 7-12 | Le Cycle Yoyo | or |
| 3 | 13-18 | Décrochage Installé | rouge |

Chaque zone a sa propre tagline et son propre message de coach (voir `ZONES`
dans `script.js`) — écrit dans la voix Rijal Fit (tutoiement, amānah,
réalignement, hadith d'ouverture repris dans le closing du site).

## Structure

```
index.html            → les 4 écrans du quiz (intro / question / porte / résultat)
style.css              → design Rijal Fit (kaki/or/beige/noir, Rajdhani/Inter)
script.js              → questions, scoring, zones, graphique SVG, soumission du lead
api/log-lead.js        → fonction serverless : enregistre le lead (pas d'IA, pas de PDF)
google-apps-script/Code.gs → script à coller dans une Google Sheet pour recevoir les leads
```

## Mise en route

Plus besoin de clé API Anthropic — l'étape "créer une clé Claude" de l'ancienne
version n'existe plus. Il ne reste que :

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

`ANTHROPIC_API_KEY` peut être supprimée si elle est encore présente depuis
l'ancienne version — elle n'est plus utilisée par le code.

### 3. Tester

Ouvre `bilan-sens-rijalfit.vercel.app`, fais le quiz en entier, vérifie que :
- chaque question avance bien et que la barre de progression se met à jour,
- le teaser de zone puis le résultat complet s'affichent correctement,
- la ligne apparaît dans la Google Sheet (si configurée),
- le lien Calendly final fonctionne.

## Ajustements possibles ensuite

- **Questions/scoring** : tout est dans le tableau `QUESTIONS` et l'objet
  `ZONES` en haut de `script.js` — facile à ajuster (texte, seuils de zone,
  messages du coach) sans toucher au reste.
- **Graphique** : `renderChart()` dans `script.js` génère un SVG maison à partir
  des réponses réelles (énergie = Q1, discipline = Q2, prière = Q8, poids = Q3).
  Pas de dépendance externe (pas de Chart.js), donc rapide et fiable.
- **Suivi des leads** : loggés dans Vercel (`DIAGNOSTIC_LEAD`) et envoyés vers
  la Google Sheet si configurée. Champs : date, prénom, nom, email, téléphone,
  score, zone.
- **Photo du coach** : réutilise `landing/images/matt.jpg` (déjà utilisée sur
  la landing page principale) dans la section "message personnel".
