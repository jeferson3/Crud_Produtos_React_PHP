<?php


class CategoryClass implements JsonSerializable
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

    public function __construct(array $data)
    {
       $this->setId($data['id'] ?? null);
       $this->setName($data['name'] ?? null);
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
    public function jsonSerialize(): object
    {
        return (object) [
            'id'            => $this->getId(),
            'name'          => $this->getName(),
        ];
    }
}
