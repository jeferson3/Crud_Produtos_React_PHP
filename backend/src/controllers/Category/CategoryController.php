<?php

require_once ROOT_DIR . '/src/models/Category/Category.php';
require_once ROOT_DIR . '/src/controllers/Controller.php';


class CategoryController extends Controller
{

    public static function index()
    {
        $categories = (new Category)->all();
        self::response($categories);
    }
}