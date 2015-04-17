<?php

namespace AnlautfuchsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use AnlautfuchsBundle\Entity;
use Symfony\Component\HttpFoundation\JsonResponse;

class UserController extends Controller
{
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

    public function loadDisabledLevels($nextLevelId){
        // generate disabled levels list

        return $this->getDoctrine()->getRepository('AnlautfuchsBundle:Levels')->getFollowingLevelIds($nextLevelId);
    }   

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

                //save level
                $user->setCurrentLevel($level);

                $em->flush();
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
