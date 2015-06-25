<?php

namespace AnlautfuchsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use AnlautfuchsBundle\Entity;
use Symfony\Component\HttpFoundation\JsonResponse;

class CompanionController extends Controller
{

    /* 
        Returns informations about all the existing companions.
    */
    public function indexAction()
    {

        //$companions = $this->getDoctrine()->getRepository('AnlautfuchsBundle:Companion')->findAll();

        $query = $this->getDoctrine()->getRepository('AnlautfuchsBundle:Companion')
            ->createQueryBuilder('c')
            ->orderBy('c.sorting', 'ASC')
            ->getQuery();

        $companions = $query->getResult();

        $serializer = $this->container->get('serializer');
        $json = $serializer->serialize($companions, 'json');

        $response = new JsonResponse();
        $response->setContent($json);

        return $response;
    }
}
