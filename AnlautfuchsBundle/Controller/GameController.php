<?php

namespace AnlautfuchsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use AnlautfuchsBundle\Entity;

class GameController extends Controller
{
    /* 
        Returns the game html.
    */
    public function indexAction()
    {
        $session = $this->getRequest()->getSession();
        if($session->get('userid')){
            $parentLevels = $this->getDoctrine()->getRepository('AnlautfuchsBundle:Levels')->getParentLevels();

            $firstRow = $this->getDoctrine()->getRepository('AnlautfuchsBundle:Characters')->getFirstRowCharacters();
            $secondRow = $this->getDoctrine()->getRepository('AnlautfuchsBundle:Characters')->getSecondRowCharacters();

            return $this->render('AnlautfuchsBundle:Default:game.html.twig', 
                array('parentLevels'=>$parentLevels, 
                    'firstRow' => $firstRow, 
                    'secondRow' => $secondRow

                ));
        }else{
            return $this->redirect($this->generateUrl('login'));
        }
    }
}
