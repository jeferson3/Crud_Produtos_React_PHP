<?php

require_once dirname(__DIR__) .'/config/Connection.php';

class Model
{
    /**
     * @var PDO
     */
    protected PDO $con;

    public function __construct()
    {
        $this->con = Connection::getInstance();
    }
}
