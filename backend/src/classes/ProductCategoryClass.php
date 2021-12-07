<?php


class ProductCategoryClass
{

    /**
     * @var int
     */
    private int $product_id;

    /**
     * @var int
     */
    private int $category_id;


    public function __construct(int $product_id, int $category_id)
    {
       $this->setProductId($product_id);
       $this->setCategoryId($category_id);
    }

    /**
     * @return int
     */
    public function getProductId(): int
    {
        return $this->product_id;
    }

    /**
     * @param int $product_id
     */
    public function setProductId(int $product_id): void
    {
        $this->product_id = $product_id;
    }

    /**
     * @return int
     */
    public function getCategoryId(): int
    {
        return $this->category_id;
    }

    /**
     * @param int $category_id
     */
    public function setCategoryId(int $category_id): void
    {
        $this->category_id = $category_id;
    }

}
