<?php
namespace AppBundle\Controller;

use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\View\View;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Form\Type\BlogPostType;

/**
 * Class BlogPostsController
 * @package AppBundle\Controller
 *
 * @RouteResource("post", pluralize=false)
 */
class BlogPostsController extends FOSRestController implements ClassResourceInterface
{
    /**
     * Gets an individual Blog Post
     *
     * @param $id
     * @return array
     * @throws \Doctrine\ORM\NoResultException
     * @throws \Doctrine\ORM\NonUniqueResultException
     *
     * @ApiDoc(
     *  output="AppBundle\Entity\BlogPost",
     *  statusCodes={
     *      200 = "Returned when successful",
     *      404 = "Return when not found"
     *  }
     * )
     */
    public function getAction($id)
    {
        return $this->getBlockPostRepository()->createFindOneByIdQuery($id);
//        return $this->getDoctrine()->getRepository('AppBundle:BlogPost')->find($id);
    }

    /**
     * Gets a collection of BlogPosts
     *
     * @return array
     *
     * @ApiDoc(
     *  output="AppBundle\Entity\BlogPost",
     *  statusCodes={
     *      200 = "Returned when successful",
     *      404 = "Return when not found"
     *  }
     * )
     */
    public function cgetAction()
    {
        return $this->getBlockPostRepository()->createFindAllQuery();
    }

    /**
     * @return object
     */
    private function getBlockPostRepository()
    {
        return $this->get('crv.doctrine_entity_repository.blog_post');
    }

    /**
     * @param Request $request
     * @return \FOS\RestBundle\View\View|\Symfony\Component\Form\Form
     *
     * @ApiDoc(
     *  input="AppBundle\Form\Type\BlogPostType",
     *  output="AppBundle\Entity\BlogPost",
     *  statusCodes={
     *      200 = "Returned when a new BlogPost has been successful created",
     *      404 = "Return when not found"
     *  }
     * )
     */
    public function postAction(Request $request)
    {
        $form = $this->createForm(BlogPostType::class, null, [
                'csrf_protection' => false,
            ]
        );

        $form->submit($request->request->all());

        if(!$form->isValid()) {
            return $form;
        }

        /**
         * @var $blogPost BlogPost
         */
        $blogPost = $form->getData();
        $em = $this->getDoctrine()->getManager();
        $em->persist($blogPost);
        $em->flush();

        $routeOptions = [
            'id' => $blogPost->getId(),
            '_format' => $request->get('_format'),
        ];

        return $this->routeRedirectView('get_post', $routeOptions, Response::HTTP_CREATED);
    }

    /**
     * @param Request $request
     * @param int $id
     * @return \FOS\RestBundle\View\View|\Symfony\Component\Form\Form
     *
     * @ApiDoc(
     *  input="AppBundle\Form\Type\BlogPostType",
     *  output="AppBundle\Entity\BlogPost",
     *  statusCodes={
     *      204 = "Returned when an existing BlogPost has been successful updated",
     *      400 = "Return when errors",
     *      404 = "Return when not found"
     *  }
     * )
     */
    public function putAction(Request $request, $id)
    {
        /**
         * @var $blogPost BlogPost
         */
        $blogPost = $this->getBlockPostRepository()->find($id);

        if ($blogPost === null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $form = $this->createForm(BlogPostType::class, $blogPost, [
                'csrf_protection' => false,
            ]
        );

        $form->submit($request->request->all());

        if(!$form->isValid()) {
            return $form;
        }

        $em = $this->getDoctrine()->getManager();
        $em->flush();

        $routeOptions = [
            'id' => $blogPost->getId(),
            '_format' => $request->get('_format'),
        ];

        return $this->routeRedirectView('get_post', $routeOptions, Response::HTTP_NO_CONTENT);
    }

    /**
     * @param Request $request
     * @param $id
     * @return View|\FOS\RestBundle\View\View|\Symfony\Component\Form\Form
     *
     * @ApiDoc(
     *  input="AppBundle\Form\Type\BlogPostType",
     *  output="AppBundle\Entity\BlogPost",
     *  statusCodes={
     *      204 = "Returned when an existing BlogPost has been successful updated",
     *      400 = "Return when errors",
     *      404 = "Return when not found"
     *  }
     * )
     */
    public function patchAction(Request $request, $id)
    {
        /**
         * @var $blogPost BlogPost
         */
        $blogPost = $this->getBlockPostRepository()->find($id);

        if ($blogPost === null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $form = $this->createForm(BlogPostType::class, $blogPost, [
                'csrf_protection' => false,
            ]
        );

        $form->submit($request->request->all(), false);

        if(!$form->isValid()) {
            return $form;
        }

        $em = $this->getDoctrine()->getManager();
        $em->flush();

        $routeOptions = [
            'id' => $blogPost->getId(),
            '_format' => $request->get('_format'),
        ];

        return $this->routeRedirectView('get_post', $routeOptions, Response::HTTP_NO_CONTENT);
    }

    /**
     * @param $id
     * @return View
     *
     * @ApiDoc(
     *  input="AppBundle\Form\Type\BlogPostType",
     *  output="AppBundle\Entity\BlogPost",
     *  statusCodes={
     *      204 = "Returned when an existing BlogPost has been successful deleted",
     *      400 = "Return when errors",
     *      404 = "Return when not found"
     *  }
     * )
     */
    public function deleteAction($id)
    {
        /**
         * @var $blogPost BlogPost
         */
        $blogPost = $this->getBlockPostRepository()->find($id);

        if($id === null) {
            return new View(null, Response::HTTP_NOT_FOUND);
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($blogPost);
        $em->flush();
    }
}