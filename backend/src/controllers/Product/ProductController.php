<?php

require_once ROOT_DIR . '/src/models/Product/Product.php';
require_once ROOT_DIR . '/src/controllers/Controller.php';


class ProductController extends Controller
{

    public static function index()
    {

        try {
            $page = isset($_POST['page']) ? intval($_POST['page']) : 1;
            $limit = isset($_POST['limit']) ? intval($_POST['limit']) : 15;
            $products = (new Product())->paginate($limit, $page,($page - 1) * $limit);
    
            self::response($products);

        } catch (\Throwable $th) {

            if ($th->getCode() == 2002) {
                self::response(['message' => self::$database_error], 500);
            }

            self::response(['message' => $th->getMessage()], $th->getCode());
        }
    }

    public static function store()
    {

        try {

            if (self::validate(['name', 'price', 'is_perishable', 'purchase_time', 'category_id'])) {

                $product = new ProductClass($_POST);

                $status = (new Product)->create($product);

                if ($status) {
                    self::response(self::$success, 201);
                }

                throw new Exception(self::$error, 501);
            }

            throw new Exception(self::$error, 400);

        }
        catch (\Exception $th){

            if ($th->getCode() == 2002) {
                self::response(['message' => self::$database_error], 2002);
            }

            self::response(['message' => $th->getMessage()], $th->getCode());
        }
    }

    public static function update()
    {

        try {
            $id = $_POST['id'] ?? null;

            if (is_null($id)) {
                throw new Exception(self::$error, 400);
            }

            if (!$product = (new Product)->find($id)) {
                throw new Exception(self::$error, 404);
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

                throw new Exception(self::$error, 500);

            }
            throw new Exception(self::$error, 400);
        }

        catch (\Exception $th){

            if ($th->getCode() == 2002) {
                self::response(['message' => self::$database_error], 2002);
            }

            self::response(['message' => $th->getMessage()], $th->getCode());
        }
    }

    public static function delete()
    {

        try {

            $id = $_POST['id'] ?? null;

            if (is_null($id)) {
                throw new Exception(self::$error, 400);
            }

            if (!$product = (new Product)->find($id)) {
                throw new Exception(self::$error, 404);
            }

            $status = (new Product)->delete($id);

            if ($status) {
                self::response(self::$success);
            }
            throw new Exception(self::$error, 500);
        }

        catch (\Exception $th){

            if ($th->getCode() == 2002) {
                self::response(['message' => self::$database_error], 2002);
            }

            self::response(['message' => $th->getMessage()], $th->getCode());
        }

    }
}