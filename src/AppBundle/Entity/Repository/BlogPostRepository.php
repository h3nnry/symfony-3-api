<?php

namespace AppBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;

class BlogPostRepository extends EntityRepository
{
    public function createFindOneByIdQuery($id)
    {
//        $query = $this->_em->createQuery(
//            "
//            SELECT bp
//            FROM AppBundle:BlogPost bp
//            WHERE bp.id = :id
//            "
//        );
//        $query->setParameter('id', $id);
//        return $query->getSingleResult();

        $query = $this->createQueryBuilder("bp")
            ->where("bp.id = :id")
            ->setParameter("id", $id);

        return $query->getQuery()->getResult();
    }

    public function createFindAllQuery()
    {
        $query = $this->createQueryBuilder("bp");

        return $query->getQuery()->getResult();
    }

}