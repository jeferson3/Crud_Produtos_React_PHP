<?php

require_once ROOT_DIR .'/src/config/Connection.php';

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
