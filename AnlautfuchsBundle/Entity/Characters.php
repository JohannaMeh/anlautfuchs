<?php

namespace AnlautfuchsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Characters
 *
 * @ORM\Table(name="characters")
 * @ORM\Entity
 */
class Characters
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
     * @ORM\Column(name="character", type="string", length=5, nullable=false)
     */
    private $character;

    /**
     * @var string
     *
     * @ORM\Column(name="image", type="string", length=100, nullable=false)
     */
    private $image;

    /**
     * @var integer
     *
     * @ORM\Column(name="row", type="integer", nullable=false)
     */
    private $row;

    /**
     * @var boolean
     *
     * @ORM\Column(name="vowel", type="boolean", nullable=false)
     */
    private $vowel;

    /**
     * @var integer
     *
     * @ORM\Column(name="display", type="integer", nullable=false)
     */
    private $display;



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
     * Set character
     *
     * @param string $character
     * @return Characters
     */
    public function setCharacter($character)
    {
        $this->character = $character;

        return $this;
    }

    /**
     * Get character
     *
     * @return string 
     */
    public function getCharacter()
    {
        return $this->character;
    }

    /**
     * Set image
     *
     * @param string $image
     * @return Characters
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
     * Set row
     *
     * @param integer $row
     * @return Characters
     */
    public function setRow($row)
    {
        $this->row = $row;

        return $this;
    }

    /**
     * Get row
     *
     * @return integer 
     */
    public function getRow()
    {
        return $this->row;
    }

    /**
     * Set vowel
     *
     * @param boolean $vowel
     * @return Characters
     */
    public function setVowel($vowel)
    {
        $this->vowel = $vowel;

        return $this;
    }

    /**
     * Get vowel
     *
     * @return boolean 
     */
    public function getVowel()
    {
        return $this->vowel;
    }

    /**
     * Set display
     *
     * @param integer $display
     * @return Characters
     */
    public function setDisplay($display)
    {
        $this->display = $display;

        return $this;
    }

    /**
     * Get display
     *
     * @return integer 
     */
    public function getDisplay()
    {
        return $this->display;
    }
}
