# /src/AppBundle/Features/login.feature

Feature: Handle user login via the RESTful API

  In order to allow secure access to the system
  As a client software developer
  I need to be able to let users log in and out


  Background:
    Given there are Users with the following details:
      | id | username | email             | password    |
      | 1  | antonio  | banderas@test.com | antoniopass |
      | 2  | john     | travolta@test.net | johnpass    |
    And I set header "Content-Type" with value "application/json"


  Scenario: User can Login with good credentials
    When I send a "POST" request to "/login" with body:
    """
      {
        "username": "antonio",
        "password": "antoniopass"
      }
      """
    Then the response code should be 200
    And the response should contain "token"