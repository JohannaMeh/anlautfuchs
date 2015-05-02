<?php

namespace AnlautfuchsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Words
 */
class Words
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $word;

    /**
     * @var string
     */
    private $image;

    /**
     * @var string
     */
    private $sound;

    /**
     * @var string
     */
    private $solution;


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
