# Bilan de Sens — Rijal Fit

Un site séparé de la landing page principale. La personne :

1. Laisse ses coordonnées (nom, prénom, email, téléphone) — porte d'entrée obligatoire.
2. Répond à un questionnaire détaillé en 11 sections (objectif, profil,
   santé/posture, sommeil/énergie, nutrition, tentatives passées, métier,
   famille, pratique religieuse, façon de décider, engagement) — reformulé à
   partir de la méthode réelle de qualification utilisée en appel
   (`rijal-fit/Ce que tu dois savoir/8. Bilan Sens/1. Méthode de candidature Appel
   de 10 à 15min.docx`), et enrichi pour viser le même niveau de profondeur que
   le bilan-exemple généré pour "Karim"
   (`rijal-fit/Ce que tu dois savoir/3. Espace membre MSF/2. Clients MSF (OK)/
   0. Prospect/Hommes/IA Karim/Bilan_Karim_Rijal Fit.docx`) : posture, historique
   de poids, journée alimentaire type, déclencheur émotionnel précis, gêne
   physique pendant la prière.
3. Reçoit en retour un **Bilan de Sens personnalisé en PDF** en 14 sections —
   écrit dans la voix et l'expertise de Rijal Fit, généré automatiquement via
   l'API Claude, sans intervention manuelle de Matthieu. Le bilan inclut une
   vraie analyse morpho-métabolique (IMC, masse grasse/maigre, métabolisme de
   base, dépense énergétique, objectif calorique et macros), calculée par
   formules reconnues (**Deurenberg** pour l'estimation de la masse grasse à
   partir de l'IMC + l'âge, **Katch-McArdle** pour le métabolisme de base à
   partir de la masse maigre — les mêmes formules que Matthieu cite dans son
   script vidéo `4. Marketing/6. MSF Youtube/Bilan Sens/Script Bilan.docx`),
   ainsi qu'une explication simple de l'évolution hormonale liée à l'âge, une
   hypothèse globale (physique/environnemental/nutritionnel), "ce que le corps
   raconte", pourquoi agir maintenant, une projection, et 10 solutions
   concrètes. Le tout expliqué simplement, sans jargon technique.

Note : le bilan de Karim était un document **interne** (confidentiel, usage
coach — inclut budget déclaré et stratégie de vente). Ce que ce site génère est
la version **destinée au client** (comme le bilan de Nourdine), avec la même
profondeur d'analyse mais sans les éléments de stratégie commerciale interne
(ceux-ci — métier, façon de décider, temps disponible — sont capturés et
loggés séparément, jamais montrés dans le PDF).

Deux des 10 questions (métier, façon de décider) servent aussi de signal de
qualification — capacité d'engagement et autonomie de décision — sans jamais
parler d'argent, à l'image de la méthode d'appel existante. Ces réponses sont
**loggées côté serveur pour toi** (voir plus bas) mais **jamais affichées dans
le PDF envoyé à la personne**.

C'est la première étape de la Méthode du Réalignement (Bilan de Sens → Programme
Ancré → Autonomie), utilisée ici comme outil de valeur gratuit avant l'appel
découverte.

## Structure

```
index.html            → le formulaire (questions d'intake)
style.css              → design Rijal Fit (kaki/or/beige/noir, Rajdhani/Inter)
script.js              → soumission du formulaire, gestion du téléchargement PDF
api/generate-bilan.js  → fonction serverless Vercel : appelle Claude, génère le PDF
package.json           → dépendances (@anthropic-ai/sdk, pdfkit)
```

## Ce qu'il reste à faire avant que ça marche en vrai

Le formulaire et toute la logique sont prêts. Il manque uniquement **la clé API
Anthropic**, qui active la génération réelle du bilan. Tant qu'elle n'est pas
configurée, le formulaire affichera un message clair ("le moteur n'est pas encore
configuré") plutôt que de planter.

### 1. Créer la clé API Anthropic

1. Va sur [console.anthropic.com](https://console.anthropic.com).
2. Crée un compte (différent de ton abonnement Claude.ai — c'est un produit séparé,
   facturé à l'usage).
3. Ajoute un moyen de paiement (facturation à la consommation — pas d'abonnement
   fixe ; pour ce cas d'usage, quelques centimes par bilan généré).
4. Dans **API Keys**, crée une nouvelle clé et copie-la (elle ne sera plus jamais
   affichée en entier après).
5. **Important avant de partager l'URL publiquement (YouTube, réseaux) :** dans
   la console Anthropic, va dans **Settings → Limits** (ou **Billing**) et règle
   un **plafond de dépense mensuel**. C'est ta vraie protection contre un pic de
   trafic ou un abus — la limite intégrée au site (voir plus bas) aide, mais ce
   plafond est le filet qui empêche une mauvaise surprise sur la facture.

### 2. Créer la feuille Google Sheets pour recevoir les leads

Sans ça, les leads (nom/prénom/email/téléphone) ne sont visibles que dans les
logs techniques de Vercel — pas pratique pour relancer qui que ce soit. Cette
étape les fait atterrir dans une vraie feuille que tu peux consulter et trier.

1. Crée une nouvelle Google Sheet (sheets.new).
2. Menu **Extensions → Apps Script**.
3. Supprime le code par défaut et colle le contenu de
   [`google-apps-script/Code.gs`](google-apps-script/Code.gs) de ce dossier.
4. Clique **Déployer → Nouveau déploiement** → type **Application web**.
   - Exécuter en tant que : **Moi**
   - Qui a accès : **Tout le monde**
5. Autorise l'accès quand Google le demande (c'est ton propre script, sur ta
   propre feuille).
6. Copie l'URL donnée à la fin (elle ressemble à
   `https://script.google.com/macros/s/AKfycb.../exec`) — c'est ta
   `GOOGLE_SHEETS_WEBHOOK_URL` pour l'étape suivante.

### 3. Déployer sur Vercel (nouveau projet séparé)

Puisque cette machine n'a pas Node.js installé, le plus simple est de passer par
GitHub + le tableau de bord Vercel (aucune installation locale nécessaire — Vercel
installe les dépendances dans le cloud) :

```bash
git init
git add .
git commit -m "Bilan de Sens — v1"
```

Puis :
1. Crée un nouveau repo sur GitHub (ex : `bilan-sens-rijalfit`) et pousse ce dossier dedans.
2. Sur [vercel.com](https://vercel.com), **New Project** → importe ce repo.
3. Dans **Settings → Environment Variables**, ajoute :
   - `ANTHROPIC_API_KEY` = la clé copiée à l'étape 1.
   - `GOOGLE_SHEETS_WEBHOOK_URL` = l'URL copiée à l'étape 2 (optionnel, mais
     recommandé avant tout partage public).
4. Déploie. Vercel détecte automatiquement `api/generate-bilan.js` comme fonction
   serverless, et applique le `maxDuration: 60` défini dans `vercel.json` (évite
   qu'une génération un peu longue — appel Claude + PDF — se coupe en plein vol).

Le site sera en ligne à une adresse du type `bilan-sens-rijalfit.vercel.app` —
indépendante de la landing page actuelle.

### 4. Tester

Ouvre le site déployé, remplis le formulaire, vérifie que le PDF généré :
- reprend bien les informations saisies,
- est dans le ton Rijal Fit,
- recommande un suivi médical si une pathologie est mentionnée,
- se termine par le hadith, la phrase de clôture et le lien Calendly.

Vérifie aussi que la ligne apparaît bien dans ta Google Sheet.

## Protection contre les abus (déjà en place dans le code)

- **Limite anti-spam** : max 3 générations par heure par adresse IP
  (`RATE_LIMIT_MAX` / `RATE_LIMIT_WINDOW_MS` en haut de `api/generate-bilan.js`).
  Simple et gratuit, mais approximatif (repart à zéro si Vercel redémarre la
  fonction, pas partagé entre les régions) — largement suffisant tant que le
  trafic reste faible. Si un jour le volume grossit vraiment et que tu veux
  quelque chose de plus solide (partagé entre toutes les requêtes, peu importe
  la région), il faudra passer par un store externe type Upstash Redis — à
  faire à ce moment-là, pas avant.
- **Plafond de dépense Anthropic** : voir étape 1 ci-dessus — c'est le filet de
  sécurité qui compte vraiment en cas de pic imprévu.
- Si jamais tu vois des soumissions bizarres dans ta Google Sheet (faux noms,
  emails à la chaîne), baisse `RATE_LIMIT_MAX` ou resserre `RATE_LIMIT_WINDOW_MS`
  dans `api/generate-bilan.js`.

## Ajustements possibles ensuite

- **Polices** : le PDF utilise Helvetica (police standard, aucune dépendance
  externe). Pour un rendu 100 % fidèle à la charte (Rajdhani/Inter), il faudra
  télécharger les fichiers `.ttf` de ces polices et les enregistrer via
  `doc.registerFont()` dans `api/generate-bilan.js`.
- **Modèle IA** : le modèle utilisé est `claude-sonnet-5` (variable `MODEL` en
  haut de `api/generate-bilan.js`) — à ajuster si besoin.
- **Estimation de la masse grasse** : calculée avec la formule de Deurenberg
  (IMC + âge, sans mesures au ruban) plutôt que la méthode Marine (tour de
  taille/cou) pour rester simple à remplir pour un visiteur seul chez lui.
  Moins précise qu'une vraie mesure (impédancemétrie, plis cutanés, DEXA), mais
  suffisante pour une estimation pédagogique — le PDF le rappelle explicitement.
  Si tu veux plus de précision, on peut ajouter les champs tour de taille/cou et
  basculer sur la formule Marine dans `computeBodyComposition()`
  (`api/generate-bilan.js`).
- **Analyse morpho-anatomique segmentaire** (comme dans le bilan de Nourdine :
  longueur des bras, valgus de coude, etc.) nécessite une observation physique
  ou des photos — non incluse ici. Le morphotype et le type de prise de poids
  sont capturés par auto-évaluation simple à la place.
- **Suivi des leads** : nom, prénom, email, téléphone, métier, façon de décider,
  temps hebdomadaire disponible, horizon et objectif principal sont envoyés vers
  ta Google Sheet (si `GOOGLE_SHEETS_WEBHOOK_URL` est configurée) et loggés dans
  Vercel en secours (`BILAN_SENS_LEAD`). Si tu veux un vrai CRM plus tard (relances
  automatiques, scoring), la Sheet peut rester la source et être branchée dessus.
