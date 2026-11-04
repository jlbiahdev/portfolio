---
ai_project: https://claude.ai/project/01a14c25-291b-7261-a12a-94d3edfa8b04
status: en cours
---

## Attentes
- Site personnel et CV.
- Derniers ajouts : GRIM ; rubrique « Engagement associatif » (NZUANE, président fondateur) dans le CV FR/EN et sur le site.
- NZUANE : programmes FEMMEKMR2035, ENSEMBLE2035, JEPARTICIPE2035 ; aucun mécanisme de projet décrit publiquement.
- Le CV n'est plus contraint à 3 pages (4 pages depuis l'ajout de NZUANE).
- Formulaire de contact rétabli : `envoi.php` (Hostinger, fonction `mail()`) vers contact@jeanlucbiah.com, même mécanisme que nzuane.org.

## Blocages
- Aucun connu

## Prochaines étapes
- Tester un envoi réel du formulaire de contact en production (déployé le 4 novembre 2026).
- Neutraliser le jeton SmtpJS de l'ancien `resources/js/mail.js` (supprimé en octobre 2025, encore visible dans l'historique du dépôt public) : changer le mot de passe SMTP qu'il contient (expéditeur contact.cyranoc@gmail.com).
- Ajouter Claude Monitor au CV une fois la v0 validée.
- À préciser lors de la prochaine session de travail.
