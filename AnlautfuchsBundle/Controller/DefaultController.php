<?php

namespace AnlautfuchsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    /* 
        Returns the index.html
    */
    public function indexAction($name)
    {
        return $this->render('AnlautfuchsBundle:Default:index.html.twig', array('name' => $name));
    }
}
