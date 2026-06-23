Feature: Accessing LAPs account - LAPS-ChangeOrganisationJourney

  Scenario: As a valid user, i must be able to login and select the required organisation and access the LAPs account and change the organisation without sign out.
#LAPS-216 - IDM Sign In  
    Given I am on the home page
    When I wait for "5" seconds
    Then I validate "What’s your local authority email address?" text on the page
    Then I validate "We will send a one-time passcode to this email address." text on the page
    When I enter the email address for "changeorguser"
    When I wait for "5" seconds
    Then I click on "Continue" button
    When I wait for "5" seconds
    When I Trigger the OP API using valid cred
    Then I extract the OTP from API response and enter it in UI
    And I wait for "9" seconds
    Then I click on "Continue" button
    And I wait for "9" seconds

    Then I validate "Who do you want to represent?" text on the page
    And I validate all the available organisation options
    
    #######LAPS-367 IDM Signout, LAPS-364- FSS Signout LAPS-162 LAPS Signout##########
    When I click "Sign out" link
    When I wait for "5" seconds   
