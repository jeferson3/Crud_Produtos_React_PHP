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
     * @var bool
     */
    private bool $is_perishable;
    /**
     * @var string
     */
    private string $purchase_time;

    public function __construct(array $data)
    {
       $this->setId($data['id'] ?? null);
       $this->setName($data['name'] ?? null);
       $this->setPrice($data['price'] ?? null);
       $this->setIsPerishable($data['is_perishable'] ?? null);
       $this->setPurchaseTime($data['purchase_time'] ?? null);
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
     * @return string
     */
    public function getPrice(): string
    {
        return number_format($this->price, 2, ',', '.');
    }

    /**
     * @param float $price
     */
    public function setPrice(float $price): void
    {
        $this->price = $price;
    }

    /**
     * @return bool
     */
    public function getIsPerishable(): bool
    {
        return $this->is_perishable;
    }

    /**
     * @param bool $is_perishable
     */
    public function setIsPerishable(bool $is_perishable): void
    {
        $this->is_perishable = $is_perishable;
    }

    /**
     * @return string
     */
    public function getPurchaseTime(): string
    {
        return $this->purchase_time;
    }

    /**
     * @param string $purchase_time
     */
    public function setPurchaseTime(string $purchase_time): void
    {
        $this->purchase_time = $purchase_time;
    }


    public function jsonSerialize()
    {
        return (object) [
            'id'            => $this->getId(),
            'name'          => $this->getName(),
            'price'         => $this->getPrice(),
            'is_perishable' => $this->getIsPerishable() == 1,
            'purchaseTime'  => $this->getPurchaseTime()
        ];
    }
}
