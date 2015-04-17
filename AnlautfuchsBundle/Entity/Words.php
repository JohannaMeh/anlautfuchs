<?php

namespace AnlautfuchsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Words
 *
 * @ORM\Table(name="words")
 * @ORM\Entity
 */
class Words
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
     * @ORM\Column(name="word", type="string", length=50, nullable=false)
     */
    private $word;

    /**
     * @var string
     *
     * @ORM\Column(name="image", type="string", length=100, nullable=false)
     */
    private $image;

    /**
     * @var string
     *
     * @ORM\Column(name="sound", type="string", length=100, nullable=false)
     */
    private $sound;



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
     * Set word
     *
     * @param string $word
     * @return Words
     */
    public function setWord($word)
    {
        $this->word = $word;

        return $this;
    }

    /**
     * Get word
     *
     * @return string 
     */
    public function getWord()
    {
        return $this->word;
    }

    /**
     * Set image
     *
     * @param string $image
     * @return Words
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
     * Set sound
     *
     * @param string $sound
     * @return Words
     */
    public function setSound($sound)
    {
        $this->sound = $sound;

        return $this;
    }

    /**
     * Get sound
     *
     * @return string 
     */
    public function getSound()
    {
        return $this->sound;
    }
    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $level;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->level = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add level
     *
     * @param \AnlautfuchsBundle\Entity\Levels $level
     * @return Words
     */
    public function addLevel(\AnlautfuchsBundle\Entity\Levels $level)
    {
        $this->level[] = $level;

        return $this;
    }

    /**
     * Remove level
     *
     * @param \AnlautfuchsBundle\Entity\Levels $level
     */
    public function removeLevel(\AnlautfuchsBundle\Entity\Levels $level)
    {
        $this->level->removeElement($level);
    }

    /**
     * Get level
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getLevel()
    {
        return $this->level;
    }
    /**
     * @var string
     */
    private $solution;


    /**
     * Set solution
     *
     * @param string $solution
     * @return Words
     */
    public function setSolution($solution)
    {
        $this->solution = $solution;

        return $this;
    }

    /**
     * Get solution
     *
     * @return string 
     */
    public function getSolution()
    {
        return $this->solution;
    }
}
