<?php

namespace AnlautfuchsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Levels
 */
class Levels
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $name;

    /**
     * @var boolean
     */
    private $image;

    /**
     * @var boolean
     */
    private $secondRow;

    /**
     * @var integer
     */
    private $nextLevel;

    /**
     * @var string
     */
    private $explanationSound;

    /**
     * @var integer
     */
    private $sorting;

    /**
     * @var string
     */
    private $cssClass;

    /**
     * @var boolean
     */
    private $wordSound;

    /**
     * @var boolean
     */
    private $imageOptional;

    /**
     * @var \AnlautfuchsBundle\Entity\Levels
     */
    private $parentLevel;

    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $words;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->words = new \Doctrine\Common\Collections\ArrayCollection();
        $this->children = new \Doctrine\Common\Collections\ArrayCollection();
    }

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
     * Set name
     *
     * @param string $name
     * @return Levels
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set image
     *
     * @param boolean $image
     * @return Levels
     */
    public function setImage($image)
    {
        $this->image = $image;

        return $this;
    }

    /**
     * Get image
     *
     * @return boolean 
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Set secondRow
     *
     * @param boolean $secondRow
     * @return Levels
     */
    public function setSecondRow($secondRow)
    {
        $this->secondRow = $secondRow;

        return $this;
    }

    /**
     * Get secondRow
     *
     * @return boolean 
     */
    public function getSecondRow()
    {
        return $this->secondRow;
    }

    /**
     * Set nextLevel
     *
     * @param integer $nextLevel
     * @return Levels
     */
    public function setNextLevel($nextLevel)
    {
        $this->nextLevel = $nextLevel;

        return $this;
    }

    /**
     * Get nextLevel
     *
     * @return integer 
     */
    public function getNextLevel()
    {
        return $this->nextLevel;
    }

    /**
     * Set explanationSound
     *
     * @param string $explanationSound
     * @return Levels
     */
    public function setExplanationSound($explanationSound)
    {
        $this->explanationSound = $explanationSound;

        return $this;
    }

    /**
     * Get explanationSound
     *
     * @return string 
     */
    public function getExplanationSound()
    {
        return $this->explanationSound;
    }

    /**
     * Set sorting
     *
     * @param integer $sorting
     * @return Levels
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
     * Set cssClass
     *
     * @param string $cssClass
     * @return Levels
     */
    public function setCssClass($cssClass)
    {
        $this->cssClass = $cssClass;

        return $this;
    }

    /**
     * Get cssClass
     *
     * @return string 
     */
    public function getCssClass()
    {
        return $this->cssClass;
    }

    /**
     * Set wordSound
     *
     * @param boolean $wordSound
     * @return Levels
     */
    public function setWordSound($wordSound)
    {
        $this->wordSound = $wordSound;

        return $this;
    }

    /**
     * Get wordSound
     *
     * @return boolean 
     */
    public function getWordSound()
    {
        return $this->wordSound;
    }

    /**
     * Set imageOptional
     *
     * @param boolean $imageOptional
     * @return Levels
     */
    public function setImageOptional($imageOptional)
    {
        $this->imageOptional = $imageOptional;

        return $this;
    }

    /**
     * Get imageOptional
     *
     * @return boolean 
     */
    public function getImageOptional()
    {
        return $this->imageOptional;
    }

    /**
     * Set parentLevel
     *
     * @param \AnlautfuchsBundle\Entity\Levels $parentLevel
     * @return Levels
     */
    public function setParentLevel(\AnlautfuchsBundle\Entity\Levels $parentLevel = null)
    {
        $this->parentLevel = $parentLevel;

        return $this;
    }

    /**
     * Get parentLevel
     *
     * @return \AnlautfuchsBundle\Entity\Levels 
     */
    public function getParentLevel()
    {
        return $this->parentLevel;
    }

    /**
     * Add words
     *
     * @param \AnlautfuchsBundle\Entity\Words $words
     * @return Levels
     */
    public function addWord(\AnlautfuchsBundle\Entity\Words $words)
    {
        $this->words[] = $words;

        return $this;
    }

    /**
     * Remove words
     *
     * @param \AnlautfuchsBundle\Entity\Words $words
     */
    public function removeWord(\AnlautfuchsBundle\Entity\Words $words)
    {
        $this->words->removeElement($words);
    }

    /**
     * Get words
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getWords()
    {
        return $this->words;
    }


    private $children;

    public function getChildren(){
        return $this->children;
    }

    public function setChildren($children){
        $this->children = $children;

        return $this;
    }
}
