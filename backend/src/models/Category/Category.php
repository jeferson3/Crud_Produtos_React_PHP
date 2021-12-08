<?php

require_once ROOT_DIR . '/src/models/Model.php';
require_once ROOT_DIR . '/src/classes/CategoryClass.php';

final class Category extends Model
{

    /**
     * return all categories
     *
     * @return array
     */
    public function all(): array
    {
        try {
            $sql = "SELECT * from categories";
            $query = $this->con->query($sql);
            $data = array();

            if ($query->execute() && $query->rowCount() > 0){
                foreach ($query->fetchAll() as $value){
                    array_push($data, (new CategoryClass($value)));
                }
            }
            return $data;
        }
        catch (PDOException $exception){
            return [];
        }
    }
}
