<?php

require_once ROOT_DIR . '/src/models/Category/Category.php';
require_once ROOT_DIR . '/src/controllers/Controller.php';


class CategoryController extends Controller
{

    public static function index()
    {
        if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
            self::response(self::$error, 404);
        }
        $categories = (new Category)->all();
        self::response($categories);
    }
}