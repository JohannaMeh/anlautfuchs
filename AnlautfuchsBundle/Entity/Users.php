<?php

namespace AnlautfuchsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Users
 *
 * @ORM\Table(name="users", indexes={@ORM\Index(name="current_level_id", columns={"current_level_id"}), @ORM\Index(name="user_companion", columns={"user_companion_id"})})
 * @ORM\Entity
 */
class Users
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
     * @ORM\Column(name="name", type="string", length=50, nullable=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="password", type="string", length=100, nullable=false)
     */
    private $password;

    /**
     * @var \AnlautfuchsBundle\Entity\Companion
     *
     * @ORM\ManyToOne(targetEntity="AnlautfuchsBundle\Entity\Companion")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="user_companion_id", referencedColumnName="id")
     * })
     */
    private $userCompanion;

    /**
     * @var \AnlautfuchsBundle\Entity\Levels
     *
     * @ORM\ManyToOne(targetEntity="AnlautfuchsBundle\Entity\Levels")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="current_level_id", referencedColumnName="id")
     * })
     */
    private $currentLevel;



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
     * @var integer
     */
    private $berriesEaten;


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
}
