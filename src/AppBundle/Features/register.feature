Feature: Handle user registration via the RESTful API

  In order to allow a user to sign up
  As a client software developer
  I need to be able to handle registration


  Background:
    Given there are Users with the following details:
      | id | username | email             | password   |
      | 1  | antonio  | banderas@test.com | antonipass |
    And I set header "Content-Type" with value "application/json"


  Scenario: Can register with valid data
    When I send a "POST" request to "/register" with body:
    """
      {
        "email": "mifodii@test.com",
        "username": "fiodor",
        "plainPassword": {
          "first": "campot",
          "second": "campot"
        }
      }
      """
    Then the response code should be 201
    And the response should contain "The user has been created successfully"
    When I am successfully logged in with username: "fiodor", and password: "campot"
    And I send a "GET" request to "/profile/2"
    And the response should contain json:
    """
      {
        "id": "2",
        "username": "fiodor",
        "email": "mifodii@test.com"
      }
      """

  Scenario: Cannot register with existing user name
    When I send a "POST" request to "/register" with body:
    """
      {
        "email": "gary@test.co.uk",
        "username": "antonio",
        "plainPassword": {
          "first": "campot",
          "second": "campot"
        }
      }
      """
    Then the response code should be 400
    And the response should contain "The username is already used"

  Scenario: Cannot register with an existing email address
    When I send a "POST" request to "/register" with body:
    """
      {
        "email": "banderas@test.com",
        "username": "fiodor",
        "plainPassword": {
          "first": "campot",
          "second": "campot"
        }
      }
      """
    Then the response code should be 400
    And the response should contain "The email is already used"

  Scenario: Cannot register with an mismatched password
    When I send a "POST" request to "/register" with body:
    """
      {
        "email": "mifodii@test.com",
        "username": "fiodor",
        "plainPassword": {
          "first": "campot",
          "second": "campot1"
        }
      }
      """
    Then the response code should be 400
    And the response should contain "The entered passwords don't match"