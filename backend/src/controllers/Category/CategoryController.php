<?php

require_once ROOT_DIR . '/src/models/Category/Category.php';
require_once ROOT_DIR . '/src/controllers/Controller.php';


class CategoryController extends Controller
{

    public static function index()
    {
        if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
            self::response(self::$error, 405);
        }
        try {

            $categories = (new Category)->all();
            self::response($categories);
        }

        catch (\Exception $th){

            if ($th->getCode() == 2002) {
                self::response(['message' => self::$database_error], 2002);
            }

            self::response(['message' => $th->getMessage()], $th->getCode());
        }
    }
}