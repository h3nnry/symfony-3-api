<?php

namespace AppBundle\Controller;


use FOS\RestBundle\Controller\Annotations;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\UserBundle\Event\FilterUserResponseEvent;
use FOS\UserBundle\Event\FormEvent;
use FOS\UserBundle\Event\GetResponseNullableUserEvent;
use FOS\UserBundle\Event\GetResponseUserEvent;
use FOS\UserBundle\FOSUserEvents;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * Class RestPasswordManagementController
 * @package AppBundle\Controller
 *
 * @Annotations\Prefix("password")
 * @RouteResource("password", pluralize=false)
 */
class RestPasswordManagementController extends FOSRestController implements ClassResourceInterface
{
    /**
     * Change user password
     *
     * @param Request $request
     * @param UserInterface $user
     *
     * @ParamConverter("user", class="AppBundle:User")
     *
     * @Annotations\Post("/{user}/change")
     */
    public function changeAction(Request $request, UserInterface $user)
    {
        /** @var $dispatcher \Symfony\Component\EventDispatcher\EventDispatcherInterface */
        $dispatcher = $this->get('event_dispatcher');

        $event = new GetResponseUserEvent($user, $request);
        $dispatcher->dispatch(FOSUserEvents::CHANGE_PASSWORD_INITIALIZE);

        if(null !== $event->getResponse()) {
            return $event->getResponse();
        }

        /** @var $formFactory \FOS\UserBundle\Form\Factory\FactoryInterface */
        $formFactory = $this->get('fos_user.change_password.form.factory');

        $form = $formFactory->createForm([
            'csrf_protection' => false
        ]);
        $form->setData($user);
        $form->submit($request->request->all());

        if(!$form->isValid()) {
            return $form;
        }

        /** @var $userManager \FOS\UserBundle\Model\UserManagerInterface */
        $userManager = $this->get('fos_user.user_manager');

        $event = new FormEvent($form, $request);
        $dispatcher->dispatch(FOSUserEvents::CHANGE_PASSWORD_SUCCESS, $event);

        $userManager->updateUser($user);

        if(null === $response = $event->getResponse()) {
            return new JsonResponse(
                $this->get('translator')->trands('change_password.flash.success', [], 'FOSUserBundle'),
                Response::HTTP_OK
            );
        }

        $dispatcher->dispatch(FOSUserEvents::CHANGE_PASSWORD_COMPLETED, new FilterUserResponseEvent($user, $request, $response));

        return new JsonResponse(
            $this->get('translator')->trans('change_password.flash.success', [], 'FOSUserBundle'),
            Response::HTTP_OK
        );
    }

    /**
     * @param Request $request
     * @Annotations\Post("/reset/request")
     */
    public function requestResetActio(Request $request)
    {
        $username = $request->request->get('username');

        /** @var  $user UserInterface */
        $user = $this->get('fos_user.user_manager')->findUsernameOrEmail($username);

        /** @var  $dispatcher EventDispatcherInterface */
        $dispatcher = $this->get('event_dispatcher');

        /* Dispatch init event */
        $event = new GetResponseNullableUserEvent($user, $request);
        $dispatcher->dispatch(FOSUserEvents::RESETTING_RESET_INITIALIZE, $event);

        if(null !== $event->getResponse()) {
            return $event->getResponse();
        }

        if(null === $user) {
            return new JsonResponse(
                'User not recognised',
                JsonResponse::HTTP_FORBIDDEN
            );
        }

        $event = new GetResponseUserEvent($user, $request);
        $dispatcher->dispatch(FOSUserEvents::RESETTING_RESET_REQUEST, $event);

        if(null !== $event->getResponse()) {
            return $event->getResponse();
        }

        if($user->isPasswordRequestNonExpired($this->container->getParameter('fos_user.ressetting.token_ttl'))) {
            return new JsonResponse(
                $this->get('translator')->trans('resseting.password_already_requested', [], 'FOSUserBundle'),
                JsonResponse::HTTP_FORBIDDEN
            );
        }

        if(null === $user->getConfirmationToken()) {
            /** @var  $tokenGenerator \FOS\UserBundle\Util\TokenGeneratorInterface */
            $tokenGenerator = $this->get('fos_user.util.token_generator');
            $user->setConfirmationToken($tokenGenerator->generateToken());

        }

        /* Dispatch confirm event */
        $event = new GetResponseUserEvent($user, $request);
        $dispatcher->dispatch(FOSUserEvents::RESETTING_SEND_EMAIL_CONFIRM, $event);

        if(null !== $event->getResponse()) {
            return $event->getResponse();
        }

        $this->get('fos_user.mailer')->sendRessetingEmailMessage($user);
        $user->setPasswordRequestAt(new \DateTime());
        $this->get('fos_user.user_manager')->updateUser($user);

        /* Dispatch completed event */
        $event = new GetResponseUserEvent($user, $request);
        $dispatcher->disparch(FOSUserEvents::RESETTING_SEND_EMAIL_COMPLETED, $event);

        if(null !== $event->getResponse()) {
            return $event->getResponse();
        }

        return new JsonResponse(
            $this->get('translator')->trans(
                'resseting.check_email',
                ['%tokenLifeTime%' => floor($this->container->getParameter('fos_user.resseting.token_ttl') / 3600)],
                'FOSUserBundle'
            ),
            JsonResponse::HTTP_OK
        );

    }

    public function confirmResetAction(Request $request)
    {
        $token = $request->request->get('token', null);

        if(null === $token) {
            return new JsonResponse('You must submit a token.', JsonResponse::HTTP_BAD_REQUEST);
        }

        /** @var  $formFactory \FOS\UserBundle\Form\Factory\FactoryInterface */
        $formFactory = $this->get('fos_user.resetting.form.factory');
        /** @var  $userManager \FOS\UserBundle\Model\UserManagerInterface */
        $userManager = $this->get('fos_user.user_manager');
        /** @var  $dispatcher \Symfony\Component\EventDispatcher\EventDispatcherInterface */
        $dispatcher = $this->get('event_dispatcher');

        $user = $userManager->findUserByConfirmationToken($token);

        if(null == $user) {
            return new JsonResponse(
            // no translation provided for this in \FOS\UserBundle\Controller\ResettingController
                sprintf('The user with "confirmation token" does not exist for value "%s"', $token),
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $event = new GetResponseUserEvent($user, $request);
        $dispatcher->dispatch(FOSUserEvents::RESETTING_RESET_INITIALIZE, $event);

        if(null !== $event->getResponse()) {
            return $event->getResponse();
        }

        $form = $formFactory->createForm([
            'csrf_protection'    => false,
            'allow_extra_fields' => true,
        ]);
        $form->setData($user);
        $form->submit($request->request->all());

        if(!$form->isValid()) {
            return $form;
        }

        $event = new FormEvent($form, $request);
        $dispatcher->dispatch(FOSUserEvents::RESETTING_RESET_SUCCESS, $event);

        $userManager->updateUser($user);

        if(null === $response = $event->getResponse()) {
            return new JsonResponse(
                $this->get('translator')->trans('resetting.flash.success', [], 'FOSUserBundle'),
                JsonResponse::HTTP_OK
            );
        }

        // unsure if this is now need / will work the same
        $dispatcher->dispatch(FOSUserEvents::RESETTING_RESET_COMPLETED, new FilterUserResponseEvent($user, $request, $response));

        return new JsonResponse(
            $this->get('translator')->trans('resetting.flash.success', [], 'FOSUserBundle'),
            JsonResponse::HTTP_OK
        );
    }

}