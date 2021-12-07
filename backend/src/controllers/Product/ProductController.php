<?php

require_once ROOT_DIR . '/src/models/Product/Product.php';
require_once ROOT_DIR . '/src/controllers/Controller.php';


class ProductController extends Controller
{

    public static function index()
    {
        $products = (new Product())->all();
        self::response($products, 200);
    }

    public static function store()
    {
        if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
            self::response(self::$error, 405);
        }

        if (self::validate(['name', 'price', 'is_perishable', 'purchase_time'])) {

            $product = new ProductClass(self::request());

            $status = (new Product)->create($product);

            if ($status) {
                self::response(self::$success, 201);
            }

            self::response(self::$error, 400);
        }

        self::response(self::$error, 400);
    }
}