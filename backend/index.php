<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json; charset=utf-8');

define('ROOT', 'http://localhost:8000'); // url api
define('ROOT_DIR', $_SERVER["DOCUMENT_ROOT"]); // diretório raiz

require "src/routes/web.php";