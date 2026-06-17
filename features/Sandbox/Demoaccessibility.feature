Feature: Democopy

  Scenario: Demo defra page
    Given I am on the home page
    When I wait for "5" seconds
    #Then I validate "What’s your local authority email address?" text on the page
    #Then I validate "We will send a one-time passcode to this email address." text on the page

    #When I fill in the email address for "CEO"
    Then I click on "Continue" button
    When I wait for "15" seconds
    When I wait for "15" seconds
    When I wait for "15" seconds
    When I wait for "15" seconds
    #Then I click on "Continue" button


    Then I am on the "Local Authority Payments (LAPs) home" page
    When I wait for "5" seconds
    #Then I check for accessibility checks on "Local Authority Payments (LAPs) home" page
    #Then I click on "Start HoF Journey" button
    #Then I am on the "Local Authority Payments (LAPs) home" page
    #Then I check for accessibility checks on "Local Authority Payments (LAPs) home" page
    Then I can see "Cymraeg" link
    Then I can see "Payment documents" link
    Then I can see "Bank details" link
    Then I can see "Get help and guidance" link

    When I click "Payment documents" link
    Then I am on the "Payment documents" page
    #Then I check for accessibility checks on "Payment documents" page
    When I click "LAPs home" link
    Then I am on the "Local Authority Payments (LAPs) home" page

    When I click "Bank details" link
    Then I am on the "Bank details" page
    #Then I check for accessibility checks on "Bank details" page
    When I click "LAPs home" link
    Then I am on the "Local Authority Payments (LAPs) home" page

    When I click "Get help and guidance" link
    Then I am on the "Get help and guidance" page
    #Then I check for accessibility checks on "Get help and guidance" page
    When I click "LAPs home" link
    Then I am on the "Local Authority Payments (LAPs) home" page