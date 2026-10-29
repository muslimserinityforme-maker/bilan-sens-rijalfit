# Ton Bilan Santé — Rijal Fit

Un bilan court (9 questions, ≈ 2 minutes) qui montre à la personne où elle en
est dans ses **4 santés** : physique, mentale, sociale, spirituelle. Tout est
calculé dans le navigateur : aucune IA, aucun PDF. Le seul appel serveur sert à
enregistrer la personne dans ta Google Sheet et à lui envoyer son résultat par
email.

## Parcours

1. **Intro** — le hadith « Ton corps a un droit sur toi. », une phrase claire.
2. **9 questions** — une par écran, 3 réponses (A/B/C = 0/1/2 points), avec photos.
3. **Prénom, email, âge** (facultatif) et case de consentement, juste avant le
   résultat : la personne a fait le bilan, elle donne naturellement son email
   pour le voir.
4. **Résultat** — le profil (3 zones), les **4 barres en pourcentage** avec un
   commentaire par santé, ton message personnel (vidéo par profil si tu en as
   une, sinon texte), puis un seul appel à l'action : l'appel découverte offert.

Plus de poids, de taille, de téléphone, de mensurations ni de morphologie. Ces
éléments appartiennent au début de l'accompagnement (et à l'outil autonome
`bilan-morpho-anatomique.html`).

## Les 4 santés

| Santé | Questions |
|---|---|
| Physique | énergie au réveil, ventre, sommeil |
| Mentale | motivation, humeur |
| Sociale | frères / amis / communauté, famille |
| Spirituelle | prière, corps pendant les adorations |

Pourcentage = 100 − 80 × (points ÷ points max), arrondi à 5. Le plancher est à
**20 %** : un bilan n'affiche jamais « 0 % ». Le palier du commentaire
(haut / moyen / bas) suit le ratio de points : ≤ 25 % haut, ≤ 50 % moyen, sinon
bas. La santé la plus basse reçoit l'étiquette « À regarder en premier » (sauf
si toutes sont au palier haut).

## Les 3 zones (score total sur 18)

| Zone | Points | Nom | Couleur |
|---|---|---|---|
| 1 | 0-6 | Réalignement stable | kaki |
| 2 | 7-12 | Le cycle yoyo | or |
| 3 | 13-18 | Le moment de se reprendre | rouge |

## À compléter dans `script.js` (en haut du fichier)

- `VIDEOS` : un lien YouTube/Vimeo par profil (`stable`, `yoyo`, `decrochage`).
  Laisse vide : le message écrit s'affiche à la place.
- `WHATSAPP_URL` : ton lien WhatsApp (ex. `https://wa.me/33…`). Vide : le bouton
  est masqué.

## Google Sheet

Le script `google-apps-script/Code.gs` écrit dans l'onglet **« Bilans »** (créé
automatiquement) :

`Date · Prénom · Email · Âge · Statut · Score · Zone · Physique % · Mentale % ·
Sociale % · Spirituelle % · Santé à regarder en premier · Problème n°1 · Date résultat`

- Une ligne par personne qui a terminé le bilan (statut « Terminé »), et son
  email de résultat part automatiquement (compte Gmail qui a déployé le
  script). Les personnes qui s'arrêtent avant l'écran email ne sont pas
  enregistrées.
- L'onglet « Bilan Morpho » reçoit l'outil autonome ; le premier onglet garde
  l'historique de l'ancien quiz.

**Si tu modifies `Code.gs` :** Déployer → Gérer les déploiements → crayon →
Nouvelle version → Déployer (l'URL ne change pas).

## Structure

```
index.html                  → intro, départ, questions, résultat
style.css                   → design Rijal Fit (kaki/or/beige/noir, Rajdhani/Inter)
script.js                   → questions, 4 santés, zones, enregistrement du lead
api/log-lead.js             → fonction serverless : nettoie et transmet au script Google
google-apps-script/Code.gs  → à coller dans la Google Sheet
bilan-morpho-anatomique.html → outil autonome (11 questions → exercices à proscrire)
images/                     → photos des questions, photo du coach
```

## Déploiement

Connecté à GitHub (`muslimserinityforme-maker/bilan-sens-rijalfit`, branche
`main`) et à Vercel : un `git push` redéploie. Variable Vercel :
`GOOGLE_SHEETS_WEBHOOK_URL` = l'URL de déploiement du script Google.

## Test

Ouvre `ton-bilan-sante.vercel.app` et fais le bilan trois fois (tout A,
tout C, un mélange) : tu dois voir les 3 zones, des barres de couleurs
différentes, et une ligne « Terminé » dans l'onglet « Bilans ».
