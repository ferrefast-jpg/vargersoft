<?php
// Formulario de contacto de vargersoft.com. Envía a sales@vargersoft.com y regresa a /contact/?sent=1
declare(strict_types=1);
$to = 'sales@vargersoft.com';
$lang = (($_POST['lang'] ?? 'en') === 'es') ? 'es' : 'en';
$back = ($lang === 'es' ? '/es' : '') . '/contact/';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location: ' . $back, true, 303); exit; }
function clean(string $k, int $max): string {
    $v = trim((string)($_POST[$k] ?? ''));
    $v = str_replace(["\r", "\0"], '', $v);
    return mb_substr($v, 0, $max);
}
$name = str_replace("\n", ' ', clean('name', 120));
$email = str_replace("\n", '', clean('email', 160));
$company = str_replace("\n", ' ', clean('company', 160));
$phone = str_replace("\n", ' ', clean('phone', 40));
$topic = str_replace("\n", ' ', clean('topic', 120));
$message = clean('message', 5000);
// trampa para bots: el campo oculto "website" debe venir vacío
if (clean('website', 200) !== '') { header('Location: ' . $back . '?sent=1', true, 303); exit; }
if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) { header('Location: ' . $back . '?error=1', true, 303); exit; }
$subject = 'VARGERSOFT web: ' . ($topic !== '' ? $topic : 'contact') . ' — ' . $name;
$body = "Name: $name\nEmail: $email\nCompany: $company\nPhone: $phone\nTopic: $topic\nLanguage: $lang\n\n$message\n";
$headers = [
    'From: VARGERSOFT Web <sales@vargersoft.com>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: vargersoft-contact',
];
$ok = @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers), '-f sales@vargersoft.com');
header('Location: ' . $back . ($ok ? '?sent=1' : '?error=1'), true, 303);
