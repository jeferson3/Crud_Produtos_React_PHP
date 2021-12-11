<?php

class Controller
{

    protected static string $error = 'Não foi possível realizar a operação, consulte o suporte técnico!';
    protected static string $database_error = 'Erro no banco de dados, consulte o suporte técnico!';
    protected static string $success = 'Operação realizada com sucesso!';

    protected static function validate(array $data)
    {

        if (empty($_POST)) return false;

        foreach ($data as $value){
            if (!array_key_exists($value, $_POST) || empty($_POST[$value])) return false;
        }
        return true;
    }

    public static function response($data, $status_code = 200)
    {
        http_response_code($status_code);
        echo json_encode($data);
        exit();
    }
}