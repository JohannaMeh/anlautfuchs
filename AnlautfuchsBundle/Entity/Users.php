<?php

namespace AnlautfuchsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Users
 */
class Users
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
     * @var string
     */
    private $password;

    /**
     * @var integer
     */
    private $berriesEaten;

    /**
     * @var \AnlautfuchsBundle\Entity\Levels
     */
    private $currentLevel;

    /**
     * @var \AnlautfuchsBundle\Entity\Companion
     */
    private $userCompanion;


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
     * @return Users
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
     * Set password
     *
     * @param string $password
     * @return Users
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password
     *
     * @return string 
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set berriesEaten
     *
     * @param integer $berriesEaten
     * @return Users
     */
    public function setBerriesEaten($berriesEaten)
    {
        $this->berriesEaten = $berriesEaten;

        return $this;
    }

    /**
     * Get berriesEaten
     *
     * @return integer 
     */
    public function getBerriesEaten()
    {
        return $this->berriesEaten;
    }

    /**
     * Set currentLevel
     *
     * @param \AnlautfuchsBundle\Entity\Levels $currentLevel
     * @return Users
     */
    public function setCurrentLevel(\AnlautfuchsBundle\Entity\Levels $currentLevel = null)
    {
        $this->currentLevel = $currentLevel;

        return $this;
    }

    /**
     * Get currentLevel
     *
     * @return \AnlautfuchsBundle\Entity\Levels 
     */
    public function getCurrentLevel()
    {
        return $this->currentLevel;
    }

    /**
     * Set userCompanion
     *
     * @param \AnlautfuchsBundle\Entity\Companion $userCompanion
     * @return Users
     */
    public function setUserCompanion(\AnlautfuchsBundle\Entity\Companion $userCompanion = null)
    {
        $this->userCompanion = $userCompanion;

        return $this;
    }

    /**
     * Get userCompanion
     *
     * @return \AnlautfuchsBundle\Entity\Companion 
     */
    public function getUserCompanion()
    {
        return $this->userCompanion;
    }
    /**
     * @var boolean
     */
    private $gameWon;


    /**
     * Set gameWon
     *
     * @param boolean $gameWon
     * @return Users
     */
    public function setGameWon($gameWon)
    {
        $this->gameWon = $gameWon;

        return $this;
    }

    /**
     * Get gameWon
     *
     * @return boolean 
     */
    public function getGameWon()
    {
        return $this->gameWon;
    }
}
