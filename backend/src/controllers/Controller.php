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

    protected static function validate(array $data)
    {

        if (empty($_POST)) return false;

        foreach ($data as $value){
            if (!array_key_exists($value, $_POST) || empty($_POST[$value])) return false;
        }
        return true;
    }

    public static function response($data)
    {
        echo json_encode($data);
        exit();
    }
}