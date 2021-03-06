<?php

namespace AnlautfuchsBundle\Entity;

use Doctrine\ORM\EntityRepository;

/**
 * UserRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class UserRepository extends EntityRepository
{

    /* 
        Checks if the username exists and if the password is correct.
    */
    public function checkUser($username, $password){
        $user = $this->getUser($username);

        if(!$user){
            return -1;
        }

        if(!$this->checkPassword($username, $password)){
            return -2;
        }

        return $user;
    }

    /* 
        Returns the user if it exists.
    */
    public function getUser($username){
        return $this->findOneByName($username);
    }

    /* 
        Checks if the password is correct.
    */
    public function checkPassword($username, $password){

        $query = $this->createQueryBuilder('u')
            ->where('u.name = :username')
            ->setParameter('username', $username)
            ->getQuery();

        $user = $query->getOneOrNullResult();

        return password_verify($password, $user->getPassword());
    }
}
