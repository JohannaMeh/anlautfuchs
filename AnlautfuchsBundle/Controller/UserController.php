<?php

namespace AnlautfuchsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use AnlautfuchsBundle\Entity;
use Symfony\Component\HttpFoundation\JsonResponse;

class UserController extends Controller
{
    /* 
        Returns informations about the active user.
    */
    public function indexAction()
    {
        $session = $this->getRequest()->getSession();

        $userId = $session->get('userid');
        if($userId){
            $user = $this->getDoctrine()->getRepository('AnlautfuchsBundle:Users')->findOneById($userId);

            $serializer = $this->container->get('serializer');
            $json = $serializer->serialize($user, 'json');

            $response = new JsonResponse();
            $response->setContent($json);

            return $response;
        }else{
            throw new \Exception('User not authenticated!');
        }
    }

    /* 
        Returns the disabled levels for the active user.
    */
    public function disabledLevelsAction(){
        $session = $this->getRequest()->getSession();

        $userId = $session->get('userid');
        if($userId){
            $user = $this->getDoctrine()->getRepository('AnlautfuchsBundle:Users')->findOneById($userId);

            $levelId = $user->getCurrentLevel()->getId();

            $levels = array();

            if($levelId){
                $levels = $this->loadDisabledLevels($levelId);
            }

            $serializer = $this->container->get('serializer');
            $json = $serializer->serialize($levels, 'json');

            $response = new JsonResponse();
            $response->setContent($json);

            return $response;
        }else{
            throw new \Exception('User not authenticated!');
        }
    }

    /* 
        Loads the data about the disabled levels.
    */
    public function loadDisabledLevels($nextLevelId){
        // generate disabled levels list

        return $this->getDoctrine()->getRepository('AnlautfuchsBundle:Levels')->getFollowingLevelIds($nextLevelId);
    }   

    /* 
        Saves that the user won the level.
    */
    public function saveLevelAction($levelId){
        $session = $this->getRequest()->getSession();

        $userId = $session->get('userid');
        if($userId){
            $em = $this->getDoctrine()->getManager();
            $user = $this->getDoctrine()->getRepository('AnlautfuchsBundle:Users')->findOneById($userId);

            //check for higher level already set?
            $nextLevelId = $user->getCurrentLevel()->getNextLevel();

            if($levelId == $nextLevelId){

                $level = $this->getDoctrine()->getRepository('AnlautfuchsBundle:Levels')->findOneById($levelId);

                // check if the level really is later in the game (should only prevent switchting from E6 to E1)
                if($user->getCurrentLevel()->getSorting()  < $level->getSorting()){

                    //save level
                    $user->setCurrentLevel($level);

                    $em->flush();
                }
            }else{
                $nextLevelId = $user->getCurrentLevel()->getId();
            }

            $levels = array();

            if($nextLevelId){
                $levels = $this->loadDisabledLevels($nextLevelId);
            }

            $serializer = $this->container->get('serializer');
            $json = $serializer->serialize($levels, 'json');

            $response = new JsonResponse();
            $response->setContent($json);

            return $response;

        }else{
            throw new \Exception('User not authenticated!');
        }
    }

    /* 
        Saves the current user companion.
    */
    public function saveCompanionAction($companionType){
        $session = $this->getRequest()->getSession();

        $userId = $session->get('userid');
        if($userId){
            $em = $this->getDoctrine()->getManager();
            $user = $this->getDoctrine()->getRepository('AnlautfuchsBundle:Users')->findOneById($userId);

            //save companion
            $companion = $this->getDoctrine()->getRepository('AnlautfuchsBundle:Companion')->findOneByType($companionType);

            $user->setUserCompanion($companion);

            $em->flush();

            $serializer = $this->container->get('serializer');
            $json = $serializer->serialize($user, 'json');

            $response = new JsonResponse();
            $response->setContent($json);

            return $response;
        }else{
            throw new \Exception('User not authenticated!');
        }
    }

    /* 
        Saves the amount of berries eaten for the user.
    */
    public function saveBerriesEatenAction($berries){
        $session = $this->getRequest()->getSession();

        $userId = $session->get('userid');
        if($userId){
            $em = $this->getDoctrine()->getManager();
            $user = $this->getDoctrine()->getRepository('AnlautfuchsBundle:Users')->findOneById($userId);

            //save berries
            $user->setBerriesEaten($berries);

            $em->flush();

            $serializer = $this->container->get('serializer');
            $json = $serializer->serialize($user, 'json');

            $response = new JsonResponse();
            $response->setContent($json);

            return $response;
        }else{
            throw new \Exception('User not authenticated!');
        }
    }
}
