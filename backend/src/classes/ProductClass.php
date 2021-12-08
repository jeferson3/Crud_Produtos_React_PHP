<?php


class ProductClass implements JsonSerializable
{

    /**
     * @var int|null
     */
    private ?int $id;
    /**
     * @var string
     */
    private string $name;
    /**
     * @var float
     */
    private float $price;
    /**
     * @var int
     */
    private int $is_perishable;
    /**
     * @var string
     */
    private string $purchase_time;
    /**
     * @var int
     */
    private int $category_id;

    public function __construct(array $data)
    {
       $this->setId($data['id'] ?? null);
       $this->setName($data['name'] ?? null);
       $this->setPrice($data['price'] ?? null);
       $this->setIsPerishable($data['is_perishable'] ?? null);
       $this->setPurchaseTime($data['purchase_time'] ?? null);
       $this->setCategoryId($data['category_id'] ?? null);
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int|null $id
     */
    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return array
     */
    public function getPrice(): array
    {
        return [$this->price, number_format($this->price, 2, ',', '.')];
    }

    /**
     * @param float $price
     */
    public function setPrice(float $price): void
    {
        $this->price = $price;
    }

    /**
     * @return int
     */
    public function getIsPerishable(): int
    {
        return $this->is_perishable;
    }

    /**
     * @param int $is_perishable
     */
    public function setIsPerishable(int $is_perishable): void
    {
        $this->is_perishable = $is_perishable;
    }

    /**
     * @return array
     */
    public function getPurchaseTime(): array
    {
        return [$this->purchase_time, date('d/m/Y H:i', strtotime($this->purchase_time))];
    }

    /**
     * @param string $purchase_time
     */
    public function setPurchaseTime(string $purchase_time): void
    {
        $this->purchase_time = $purchase_time;
    }

    /**
     * @return array
     */
    public function getCategoryId(): array
    {
        return [
            $this->category_id,
            (new Category())->find($this->category_id)->getName()
        ];
    }

    /**
     * @param int $category_id
     */
    public function setCategoryId(int $category_id): void
    {
        $this->category_id = $category_id;
    }

    public function jsonSerialize(): object
    {
        return (object) [
            'id'            => $this->getId(),
            'name'          => $this->getName(),
            'price'         => $this->getPrice(),
            'is_perishable' => $this->getIsPerishable() == 1,
            'purchase_time'  => $this->getPurchaseTime(),
            'category_id'   => $this->getCategoryId()
        ];
    }
}
