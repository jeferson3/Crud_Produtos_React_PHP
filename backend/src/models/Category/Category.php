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

    /**
     * return category by id
     *
     * @param int|null $id category id
     * @return CategoryClass|null
     */
    public function find(?int $id): ?CategoryClass
    {

        if (is_null($id)) return null;

        try {
            $sql = "SELECT * from categories where id = :id limit 1";
            $query = $this->con->prepare($sql);
            $query->bindValue(':id', $id);

            if ($query->execute()){
                if ($query->rowCount() > 0){
                    return (new CategoryClass($query->fetch()));
                }
                return null;
            }
            return null;
        }
        catch (PDOException $exception){
            return null;
        }
    }
}
