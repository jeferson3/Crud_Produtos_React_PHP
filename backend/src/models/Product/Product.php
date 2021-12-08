<?php

require_once ROOT_DIR . '/src/models/Model.php';
require_once ROOT_DIR . '/src/classes/ProductClass.php';

final class Product extends Model
{

    public function paginate($limit = 10, $page = 1, $offset = 0)
    {
        try {

            $sql = "SELECT * from products limit :limit offset :offset";
            $query = $this->con->prepare($sql);
            $query->bindParam(':limit', $limit, PDO::PARAM_INT);
            $query->bindParam(':offset', $offset, PDO::PARAM_INT);

            $data = array('result' => array(), 'total' => 0);

            if ($query->execute() && $query->rowCount() > 0){
                foreach ($query->fetchAll() as $value){
                    array_push($data['result'], (new ProductClass($value)));
                }
                $total = count($this->all());
                $data['page'] = $page;
                $data['total_pages'] = ceil($total / $limit);
                $data['per_page'] = $limit;
                $data['total'] = $total;
            }
            return $data;
        }
        catch (\Exception $exception){
            return false;
        }
    }

    /**
     * return product by id
     *
     * @param int|null $id product id
     * @return ProductClass|null
     */
    public function find(?int $id): ?ProductClass
    {

        if (is_null($id)) return null;

        try {
            $sql = "SELECT * from products where id = :id limit 1";
            $query = $this->con->prepare($sql);
            $query->bindValue(':id', $id);

            if ($query->execute()){
                if ($query->rowCount() > 0){
                    return (new ProductClass($query->fetch()));
                }
                return null;
            }
            return null;
        }
        catch (PDOException $exception){
            return null;
        }
    }

    /**
     * return all products
     *
     * @return array
     */
    public function all(): array
    {
        try {
            $sql = "SELECT * from products";
            $query = $this->con->query($sql);
            $data = array();

            if ($query->execute() && $query->rowCount() > 0){
                foreach ($query->fetchAll() as $value){
                    array_push($data, (new ProductClass($value)));
                }
            }
            return $data;
        }
        catch (PDOException $exception){
            return [];
        }
    }

    /**
     * create product
     *
     * @param ProductClass|null $product
     * @return bool
     */
    public function create(?ProductClass $product): bool
    {

        if (is_null($product)) return false;

        try {

            $sql = "INSERT into products (name, price, is_perishable, purchase_time, category_id) 
                        values (:name, :price, :is_perishable, :purchase_time, :category_id)";

            $query = $this->con->prepare($sql);
            $query->bindValue(':name', $product->getName());
            $query->bindValue(':price', $product->getPrice()[0]);
            $query->bindValue(':is_perishable', $product->getIsPerishable());
            $query->bindValue(':purchase_time', $product->getPurchaseTime()[0]);
            $query->bindValue(':category_id', $product->getCategoryId()[0]);

            return $query->execute();
        }
        catch (PDOException $exception){
            return false;
        }
    }

    /**
     * delete product
     *
     * @param int|null $id product id
     * @return bool
     */
    public function delete(?int $id): bool
    {
        try {

            $sql = 'DELETE from products where id = :id';
            $query = $this->con->prepare($sql);
            $query->bindValue(':id', $id);

            return $query->execute();
        }
        catch (PDOException $exception){
            return false;
        }
    }

    /**
     * update product
     *
     * @param ProductClass $product
     * @return bool
     */
    public function update(ProductClass $product): bool
    {
        try {

            $sql = 'UPDATE products set name=:name, price=:price, is_perishable=:is_perishable, 
                    purchase_time=:purchase_time, category_id=:category_id where id = :id';
            $query = $this->con->prepare($sql);
            $query->bindValue(':id', $product->getId());
            $query->bindValue(':name', $product->getName());
            $query->bindValue(':price', $product->getPrice()[0]);
            $query->bindValue(':is_perishable', $product->getIsPerishable());
            $query->bindValue(':purchase_time', $product->getPurchaseTime()[0]);
            $query->bindValue(':category_id', $product->getCategoryId()[0]);

            return $query->execute();
        }
        catch (PDOException $exception){
            return false;
        }
    }
}
