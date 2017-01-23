Feature: Handle password changing via the RESTful API

  In order to provide a more secure system
  As a client software developer
  I need to be able to let users change their current API password


  Background:
    Given there are Users with the following details:

      | id | username | email             | password   | confirmation_token |
      | 1  | antonio  | banderas@test.com | antonipass |                    |
      | 2  | john     | travolta@test.net | johnpass   | some-token-string  |
    And I set header "Content-Type" with value "application/json"


  Scenario: Cannot hit the change password endpoint if not logged in (missing token)
    When I send a "POST" request to "/password/1/change" with body:
    """
      {
        "current_password": "antoniopass",
        "plainPassword": {
          "first": "new password",
          "second": "new password"
        }
      }
      """
    Then the response code should be 401

  Scenario: Cannot change the password for a different user
    When I am successfully logged in with username: "antonio", and password: "antoniopass"
    And I send a "POST" request to "/password/2/change" with body:
    """
      {
        "current_password": "antoniopass",
        "plainPassword": {
          "first": "new password",
          "second": "new password"
        }
      }
      """
    Then the response code should be 403

  Scenario: Can change password with valid credentials
    When I am successfully logged in with username: "antonio", and password: "antoniopass"
    And I send a "POST" request to "/password/1/change" with body:
    """
      {
        "current_password": "antoniopass",
        "plainPassword": {