<?php

require ROOT_DIR . '/src/controllers/Product/ProductController.php';

$page   = $_GET['page'] ?? '';
$method = $_GET['method'] ?? '';
$id     = $_GET['id'] ?? '';

switch ($page){

    case 'products' && $method == 'list':
        call_user_func('ProductController::index');
        break;

    case 'products' && $method == 'create':
        call_user_func('ProductController::store');
        break;

    case 'products' && $method == 'update':
        call_user_func('ProductController::update');
        break;

    case 'products' && $method == 'delete':
        call_user_func('ProductController::delete');
        break;

    default:
        header('Object not found', false, 404);
        exit();
}