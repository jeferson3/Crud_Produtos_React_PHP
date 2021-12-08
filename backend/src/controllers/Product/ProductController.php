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

        $page = isset($_POST['page']) ? intval($_POST['page']) : 1;
        $limit = isset($_POST['limit']) ? intval($_POST['limit']) : 15;
        $products = (new Product())->paginate($limit, $page,($page - 1) * $limit);

        self::response($products);
    }

    public static function store()
    {
        if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
            self::response(self::$error);
        }

        if (self::validate(['name', 'price', 'is_perishable', 'purchase_time', 'category_id'])) {

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

        if (is_null($id)) {
            self::response(self::$error);
        }

        if (!$product = (new Product)->find($id)) {
            self::response(self::$error);
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

        if (is_null($id)) {
            self::response(self::$error);
        }

        if (!$product = (new Product)->find($id)) {
            self::response(self::$error);
        }

        $status = (new Product)->delete($id);

        if ($status){
            self::response(self::$success);
        }
        self::response(self::$error);
    }
}