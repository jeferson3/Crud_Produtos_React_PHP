<?php

require_once ROOT_DIR . '/src/models/Product/Product.php';
require_once ROOT_DIR . '/src/controllers/Controller.php';


class ProductController extends Controller
{

    public static function index()
    {

        if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
            self::response(self::$error);
        }

        $limit = $_POST['limit'] ?? 30;
        $offset = $_POST['offset'] ?? 0;

        $products = (new Product())->paginate($limit, $offset);
        self::response($products);
    }

    public static function store()
    {
        if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
            self::response(self::$error);
        }

        if (self::validate(['name1', 'price', 'is_perishable', 'purchase_time', 'category_id'])) {

            $product = new ProductClass($_POST);

            $status = (new Product)->create($product);

            if ($status) {
                self::response(self::$success);
            }

            self::response(self::$error);
        }

        self::response(self::$error);
    }

    public static function update()
    {
        if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
            self::response(self::$error);
        }

        $id = $_POST['id'] ?? null;

        if (!is_null($id)) {
            self::response(self::$error, 404);
        }

        if (!$product = (new Product)->find($id)) {
            self::response(self::$error, 404);
        }

        if (self::validate(['id', 'name', 'price', 'is_perishable', 'purchase_time', 'category_id'])) {

            $product->setId($_POST['id']);
            $product->setName($_POST['name']);
            $product->setPrice($_POST['price']);
            $product->setIsPerishable($_POST['is_perishable']);
            $product->setPurchaseTime($_POST['purchase_time']);
            $product->setCategoryId($_POST['category_id']);

            $status = (new Product)->update($product);

            if ($status) {
                self::response(self::$success);
            }

            self::response(self::$error);

        }

        self::response(self::$error);
    }

    public static function delete()
    {
        if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
            self::response(self::$error);
        }

        $id = $_POST['id'] ?? null;

        if (!is_null($id)) {
            self::response(self::$error, 404);
        }

        if (!(new Product)->find($id)) {
            self::response(self::$error, 404);
        }

        $status = (new Product)->delete($id);

        if ($status){
            self::response(self::$success);
        }
        self::response(self::$error);
    }
}