<?php
namespace AppBundle\Controller;

use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

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
}