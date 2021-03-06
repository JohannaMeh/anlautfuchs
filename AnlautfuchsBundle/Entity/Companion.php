<?php

namespace AnlautfuchsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Companion
 *
 * @ORM\Table(name="companion")
 * @ORM\Entity
 */
class Companion
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="image", type="string", length=100, nullable=false)
     */
    private $image;



    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set image
     *
     * @param string $image
     * @return Companion
     */
    public function setImage($image)
    {
        $this->image = $image;

        return $this;
    }

    /**
     * Get image
     *
     * @return string 
     */
    public function getImage()
    {
        return $this->image;
    }
    /**
     * @var string
     */
    private $type;


    /**
     * Set type
     *
     * @param string $type
     * @return Companion
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string 
     */
    public function getType()
    {
        return $this->type;
    }
    /**
     * @var integer
     */
    private $sorting;


    /**
     * Set sorting
     *
     * @param integer $sorting
     * @return Companion
     */
    public function setSorting($sorting)
    {
        $this->sorting = $sorting;

        return $this;
    }

    /**
     * Get sorting
     *
     * @return integer 
     */
    public function getSorting()
    {
        return $this->sorting;
    }
    /**
     * @var \AnlautfuchsBundle\Entity\Levels
     */
    private $neededLevelId;


    /**
     * Set neededLevelId
     *
     * @param \AnlautfuchsBundle\Entity\Levels $neededLevelId
     * @return Companion
     */
    public function setNeededLevelId(\AnlautfuchsBundle\Entity\Levels $neededLevelId = null)
    {
        $this->neededLevelId = $neededLevelId;

        return $this;
    }

    /**
     * Get neededLevelId
     *
     * @return \AnlautfuchsBundle\Entity\Levels 
     */
    public function getNeededLevelId()
    {
        return $this->neededLevelId;
    }
    /**
     * @var boolean
     */
    private $unlockedOnGameWon;


    /**
     * Set unlockedOnGameWon
     *
     * @param boolean $unlockedOnGameWon
     * @return Companion
     */
    public function setUnlockedOnGameWon($unlockedOnGameWon)
    {
        $this->unlockedOnGameWon = $unlockedOnGameWon;

        return $this;
    }

    /**
     * Get unlockedOnGameWon
     *
     * @return boolean 
     */
    public function getUnlockedOnGameWon()
    {
        return $this->unlockedOnGameWon;
    }
}
