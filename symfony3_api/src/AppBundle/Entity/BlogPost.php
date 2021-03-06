<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
/**
 * @ORM\Entity(repositoryClass="AppBundle\Entity\Repository\BlogPostRepository")
 * @ORM\Table(name="blog_post")
 */
class BlogPost implements \JsonSerializable
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", name="title")
     */
    protected $title;

    /**
     * @ORM\Column(type="string", name="body")
     */
    protected $body;

    /**
     * @ORM\Column(name="decimal_1", type="decimal", scale=2, precision=8)
     */
    protected $decimal1;

    /**
     * @ORM\Column(name="decimal_2", type="decimal", scale=3, precision=8)
     */
    protected $decimal2;

    /**
     * @ORM\Column(name="decimal_3", type="decimal",  precision=10, scale=4)
     */
    protected $decimal3;

    /**
     * @return mixed
     */
    public function getDecimal1()
    {
        return $this->decimal1;
    }

    /**
     * @return mixed
     */
    public function getDecimal2()
    {
        return $this->decimal2;
    }

    /**
     * @return mixed
     */
    public function getDecimal3()
    {
        return $this->decimal3;
    }

    /**
     * @param mixed $decimal1
     */
    public function setDecimal1($decimal1)
    {
        $this->decimal1 = $decimal1;
    }

    /**
     * @param mixed $decimal2
     */
    public function setDecimal2($decimal2)
    {
        $this->decimal2 = $decimal2;
    }

    /**
     * @param mixed $decimal3
     */
    public function setDecimal3($decimal3)
    {
        $this->decimal3 = $decimal3;
    }

    public function getId()
    {
        // this has the word private in it
        // and a semi colon ; for some reason
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     * @return BlogPost
     */
    public function setTitle($title)
    {
        $this->title = $title;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getBody()
    {
        return $this->body;
    }

    /**
     * @param mixed $body
     * @return BlogPost
     */
    public function setBody($body)
    {
        $this->body = $body;
        return $this;
    }

    /**
     * @return mixed
     */
    function jsonSerialize()
    {
        return [
            'id'    => $this->id,
            'title' => $this->title,
            'body'  => $this->body,
        ];
    }
}