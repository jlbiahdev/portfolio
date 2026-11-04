<?php
// Réception des formulaires du site : chaque message est envoyé par e-mail à l'adresse du domaine
// hébergée chez Hostinger. Aucun service tiers, rien n'est enregistré sur le serveur.
// Même mécanisme que nzuane.org (sites/local/envoi.php).

declare(strict_types=1);

// ---------------------------------------------------------------- configuration du site
const DESTINATAIRE = 'contact@jeanlucbiah.com';
const EXPEDITEUR = 'Jean Luc Biah – Portfolio <contact@jeanlucbiah.com>';
const PAGE_MERCI = 'merci.html';

$formulaires = [
    'contact' => [
        'introduction' => 'Nouveau message reçu depuis le formulaire de contact de jeanlucbiah.com.',
        'sujet' => fn (array $v): string => '[Portfolio] ' . ($v['sujet'] !== '' ? $v['sujet'] : 'Message de ' . $v['nom']),
        'champs' => [
            'nom' => ['libelle' => 'Nom', 'requis' => true],
            'email' => ['libelle' => 'E-mail', 'type' => 'email', 'requis' => true],
            'telephone' => ['libelle' => 'Téléphone'],
            'sujet' => ['libelle' => 'Sujet'],
            'message' => ['libelle' => 'Message', 'type' => 'long', 'requis' => true],
        ],
    ],
];

const PAGE_ERREUR = <<<'HTML'
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <title>Message non envoyé – Jean Luc Biah</title>
  <link rel="icon" href="favicon.ico" />
  <link rel="stylesheet" href="resources/css/style.css?v=20261104" />
  <script>if (/(?:^|;\s*)THEME=light/.test(document.cookie)) document.documentElement.setAttribute('data-theme', 'light');</script>
</head>
<body>
  <main class="page-retour">
    <h1>Votre message n'a pas pu être envoyé.</h1>
    <p>Vérifiez que votre nom, votre adresse e-mail et votre message sont bien renseignés, puis réessayez.</p>
    <p>Si le problème persiste, écrivez-moi directement à <a href="mailto:contact@jeanlucbiah.com">contact@jeanlucbiah.com</a>.</p>
    <div class="lang-en" lang="en">
      <h1>Your message could not be sent.</h1>
      <p>Please check that your name, e-mail address and message are filled in, then try again.</p>
      <p>If the problem persists, write to me directly at <a href="mailto:contact@jeanlucbiah.com">contact@jeanlucbiah.com</a>.</p>
    </div>
    <p><a class="btn" href="index.html#contact">Retour au formulaire / Back to the form</a></p>
  </main>
</body>
</html>
HTML;
// ---------------------------------------------------------------- fin de la configuration

function valeur(string $nom, int $longueurMax): string
{
    $valeur = $_POST[$nom] ?? '';
    if (!is_string($valeur)) {
        return '';
    }
    return mb_substr(trim($valeur), 0, $longueurMax);
}

// Les retours à la ligne sont retirés des champs d'une ligne, pour empêcher l'injection d'en-têtes.
function surUneLigne(string $valeur): string
{
    return preg_replace('/[\r\n]+/', ' ', $valeur) ?? '';
}

function pageErreur(int $code): never
{
    http_response_code($code);
    header('Content-Type: text/html; charset=UTF-8');
    echo PAGE_ERREUR;
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    pageErreur(405);
}

// Robot : le champ caché est rempli. On fait comme si tout allait bien, sans rien envoyer.
if (valeur('site_web', 200) !== '') {
    header('Location: ' . PAGE_MERCI, true, 303);
    exit;
}

$nomFormulaire = valeur('formulaire', 50);
if (!isset($formulaires[$nomFormulaire])) {
    pageErreur(400);
}
$formulaire = $formulaires[$nomFormulaire];

$valeurs = [];
foreach ($formulaire['champs'] as $nom => $champ) {
    $type = $champ['type'] ?? 'texte';
    $longueurMax = $type === 'long' ? 5000 : 200;
    $v = valeur($nom, $longueurMax);
    if ($type !== 'long') {
        $v = surUneLigne($v);
    }
    if ($v === '' && !empty($champ['requis'])) {
        pageErreur(400);
    }
    if ($v !== '' && $type === 'email' && filter_var($v, FILTER_VALIDATE_EMAIL) === false) {
        pageErreur(400);
    }
    if ($v !== '' && $type === 'choix' && !in_array($v, $champ['choix'], true)) {
        pageErreur(400);
    }
    $valeurs[$nom] = $v;
}

// Au moins un moyen de répondre (e-mail ou téléphone), quand le formulaire l'exige.
if (!empty($formulaire['joignable'])) {
    $joignable = false;
    foreach ($formulaire['joignable'] as $nom) {
        if (($valeurs[$nom] ?? '') !== '') {
            $joignable = true;
        }
    }
    if (!$joignable) {
        pageErreur(400);
    }
}

$sujet = surUneLigne(($formulaire['sujet'])($valeurs));

$lignes = [$formulaire['introduction'], ''];
foreach ($formulaire['champs'] as $nom => $champ) {
    $v = $valeurs[$nom] !== '' ? $valeurs[$nom] : '(non renseigné)';
    if (($champ['type'] ?? 'texte') === 'long') {
        $lignes[] = '';
        $lignes[] = $champ['libelle'] . ' :';
        $lignes[] = $v;
    } else {
        $lignes[] = $champ['libelle'] . ' : ' . $v;
    }
}

$entetes = [
    'From' => EXPEDITEUR,
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => '8bit',
];
$emailVisiteur = $valeurs['email'] ?? '';
if ($emailVisiteur !== '') {
    $entetes['Reply-To'] = $emailVisiteur;
}

$envoye = mail(DESTINATAIRE, mb_encode_mimeheader($sujet, 'UTF-8'), implode("\n", $lignes), $entetes);

if (!$envoye) {
    pageErreur(500);
}

header('Location: ' . PAGE_MERCI, true, 303);
exit;
