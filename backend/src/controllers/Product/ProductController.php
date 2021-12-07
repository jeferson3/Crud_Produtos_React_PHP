<?php

require_once ROOT_DIR . '/src/models/Product/Product.php';
require_once ROOT_DIR . '/src/controllers/Controller.php';


class ProductController extends Controller
{

    public static function index()
    {

        $limit = self::request()['limit'] ?? 10;
        $offset = self::request()['offset'] ?? 0;

        $products = (new Product())->paginate($limit, $offset);
        self::response($products);
    }

    public static function store()
    {
        if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
            self::response(self::$error, 405);
        }

        if (self::validate(['name', 'price', 'is_perishable', 'purchase_time', 'category_id'])) {

            $product = new ProductClass(self::request());

            $status = (new Product)->create($product);

            if ($status) {
                self::response(self::$success, 201);
            }

            self::response(self::$error, 400);
        }

        self::response(self::$error, 400);
    }

    public static function update()
    {
        if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
            self::response(self::$error, 405);
        }

        if (!$id = self::request()['id']) {
            self::response(self::$error, 404);
        }

        if (!$product = (new Product)->find($id)) {
            self::response(self::$error, 404);
        }

        if (self::validate(['id', 'name', 'price', 'is_perishable', 'purchase_time', 'category_id'])) {

            $product->setId(self::request()['id']);
            $product->setName(self::request()['name']);
            $product->setPrice(self::request()['price']);
            $product->setIsPerishable(self::request()['is_perishable']);
            $product->setPurchaseTime(self::request()['purchase_time']);
            $product->setCategoryId(self::request()['category_id']);

            $status = (new Product)->update($product);

            if ($status) {
                self::response(self::$success, 201);
            }

            self::response(self::$error, 400);

        }

        self::response(self::$error, 400);
    }

    public static function delete()
    {
        if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
            self::response(self::$error, 405);
        }

        if (!$id = self::request()['id']) {
            self::response(self::$error, 404);
        }

        if (!$product = (new Product)->find($id)) {
            self::response(self::$error, 404);
        }

        $status = (new Product)->delete($id);

        if ($status){
            self::response(self::$success);
        }
        self::response(self::$error, 400);
    }
}