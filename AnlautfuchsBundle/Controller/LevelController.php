<?php

namespace AnlautfuchsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;


class LevelController extends Controller
{
    /* 
        Returns the informations about the requested level.
    */
    public function indexAction($levelId)
    {

        $level = $this->getDoctrine()->getRepository('AnlautfuchsBundle:Levels')->getLevelForGame($levelId);

        $serializer = $this->container->get('serializer');
        $json = $serializer->serialize($level, 'json');

        $response = new JsonResponse();
        $response->setContent($json);

        return $response;
    }
}
