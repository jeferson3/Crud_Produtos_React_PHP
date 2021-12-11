<?php

require ROOT_DIR . '/src/controllers/Product/ProductController.php';
require ROOT_DIR . '/src/controllers/Category/CategoryController.php';

$page   = $_GET['page'] ?? '';
$method = $_GET['method'] ?? '';

if(strtolower($_SERVER['REQUEST_METHOD']) != 'post') {
    http_response_code(405);
}

if ($page == '' && $method == '') {
    header('Object not found', false, 404);
    exit();
}
else if ($page == 'products' && $method == 'list') {
    call_user_func('ProductController::index');
}
else if ($page == 'products' && $method == 'create'){
    call_user_func('ProductController::store');
}
else if ($page == 'products' && $method == 'update') {
    call_user_func('ProductController::update');
}
else if ($page == 'products' && $method == 'delete') {
    call_user_func('ProductController::delete');
}
else if ($page == 'categories' && $method == 'list') {
    call_user_func('CategoryController::index');
}
else{
    header('Object not found', false, 404);
    exit();
}