<?php

// CORS shit
$http_origin = $_SERVER['HTTP_ORIGIN'];

$allowed_domains = ['https://www.summercampsitaly.com'];

if (in_array(strtolower($http_origin), $allowed_domains))
{  
    header("Access-Control-Allow-Origin: $http_origin");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

// preflighting
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
  header("Access-Control-Allow-Headers: Authorization, Content-Type,Accept, Origin");
  exit(0);
}

// EDIT THE 2 LINES BELOW AS REQUIRED
$email_sender = "contact_form@summercampsitaly.com";
$email_to = ["fbcampitaly@gmail.com"];
$email_subject = "[summercampsitaly.com] Information request";

function croak($error) {
  // your error code can go here
  $msg = "ERROR: ${error}\r\n";
  echo $msg;
  error_log($msg);
  die();
}

function clean_string($string) {
  $bad = array("content-type","bcc:","to:","cc:","href");
  return str_replace($bad,"",$string);
}

header('Content-Type: text/plain');

$nome = $_POST['name']; // required
$email = $_POST['email']; // required
$citta = $_POST['city']; // required
$messaggio = $_POST['message']; // required
$ip = $_SERVER['REMOTE_ADDR'];

$error_message = "";
$email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
if(!preg_match($email_exp, $email)) {
  $error_message .= "Invalid email address\r\n";
}

$string_exp = "/^[A-Za-z .'-]+$/";
if(!preg_match($string_exp, $nome)) {
  $error_message .= "Invalid name\r\n";
}

if(strlen($error_message) > 0) {
  croak($error_message);
}

$email_message = "";

$email_message .= "Da: ".clean_string($nome)." <" . clean_string($email) . ">\r\n";
$email_message .= "Città: ".clean_string($citta)."\r\n";
$email_message .= "IP: " .clean_string($ip). "\r\n\r\n";
$email_message .= clean_string($messaggio);
  
  
// create email headers
$headers = 'From: '.$email_sender."\r\n".
'Reply-To: '.$email."\r\n" .
'X-Mailer: PHP/' . phpversion();

foreach ($email_to as $to) {
  if (!mail($to, $email_subject, $email_message, $headers)) {
    croak("Failed to send email");
  }
}

echo "OK\r\n";
