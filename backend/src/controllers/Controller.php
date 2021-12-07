<?php

class Controller
{

    protected static array $error = [
        'status'    => false,
        'message'   => 'Não foi possível realizar a operação!'
    ];

    protected static array $success = [
        'status'    => true,
        'message'   => 'Operação realizada com sucesso!'
    ];

    protected static function validate(array $data, string $type = 'GET')
    {
        $request = json_decode(file_get_contents('php://input'), true);

        foreach ($data as $value){
            if (!array_key_exists($value, $request) || empty($request[$value])) return false;
        }
        return true;
    }

    public static function response($data, int $status_code = 200)
    {
        http_response_code($status_code);
        echo json_encode($data);
        exit();
    }

    public static function request()
    {
        return json_decode(file_get_contents('php://input'), true);
    }


}