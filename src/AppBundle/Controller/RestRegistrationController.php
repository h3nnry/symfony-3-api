<?php

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\Annotations;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\UserBundle\Event\FilterUserResponseEvent;
use FOS\UserBundle\Event\FormEvent;
use FOS\UserBundle\FOSUserEvents;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

/**
 * Class RestRegistrationController
 * @package AppBundle\Controller
 *
 * @RouteResource("registration", pluralize=false)
 */
class RestRegistrationController  extends FOSRestController implements ClassResourceInterface
{
    /**
     * @param Request $request
     * @Annotations\Post("/register")
     */
    public function registerAction(Request $request)
    {
        /** @var  $formFactory \FOS\UserBundle\Form\Factory\FactoryInterface */
        $formFactory = $this->get('fos_user.registration.form.factory');
        /** @var  $userManager \FOS\UserBundle\Model\UserManagerInterface */
        $userManager = $this->get('fos_user.user_manager');
        /** @var  $dispatcher \Symfony\Component\EventDispatcher\EventDispatcherInterface */
        $dispatcher = $this->get('event_dispatcher');

        $user = $userManager->createUser();
        $user->setEnabled(true);

        $event = new GetResponseEvent($user, $request);
        $dispatcher->dispatch(FOSUserEvents::REGISTRATION_INITIALIZE, $event);

        if(null !== $event->getResponse()) {
            return $event->getResponse();
        }

        $form = $formFactory->createForm([
            'csrf_protection' => false
        ]);

        $form->setData($user);
        $form->submit($request->request->add());

        if(!$form->isValid()) {
            $event = new FormEvent($form, $request);

            $dispatcher->dispatch(FOSUserEvents::REGISTRATION_FAILURE, $event);

            if(null !== $response = $event->getResponse()) {
                return $response;
            }

            return $form;
        }

        $event = new FormEvent($form, $request);
        $dispatcher->dispatch(FOSUserEvents::REGISTRATION_SUCCESS, $event);

        if($event->getResponse()) {
            return $event->getResponse();
        }

        $userManager->updateUser($user);

        $response = new JsonResponse(
            [
            'msg'   => $this->get('translator')->trans('registration.flash.user_created', [], 'FOSUserBundle'),
                'token' => $this->get('lexik_jwt_authentication.jwt_manager')->create($user), // creates JWT
            ],
            JsonResponse::HTTP_CREATED,
            [
                'Location' => $this->generateUrl(
                    'get_profile',
                    [ 'user' => $user->getId() ],
                    UrlGeneratorInterface::ABSOLUTE_URL
                )
            ]
        );

        $dispatcher->dispatch(
            FOSUserEvents::REGISTRATION_COMPLETED,
            new FilterUserResponseEvent($user, $request, $response)
        );

        return $response;
    }

}