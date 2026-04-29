Feature: Accessing LAPs account - LAPS-160,LAPS-227,LAPS-230

  Scenario: As a valid user, i must be able to login and securely access the LAPs account
    
    ######################################### IDM Sign In #########################################    
    Given I am on the home page
    When I wait for "5" seconds
      #Then I validate "What’s your local authority email address?" text on the page
      #Then I validate "We will send a one-time passcode to this email address." text on the page

    When I enter the email address for "CEO"
    Then I click on "Continue" button
    When I wait for "9" seconds
    When I wait for "9" seconds
    When I wait for "9" seconds
    When I wait for "9" seconds
    #Then I click on "Continue" button
   
    ######################################### LAPs Dashboard page LAPS-160 #########################################
    Then I am on the "Local Authority Payments (LAPs) home" page
    When I wait for "5" seconds
    Then I can see "Payment documents" link
    Then I can see "Bank details" link
    Then I can see "Get help and guidance" link
    Then log all grid titles
    Then the grid titles should match the following: Payment documents,Bank details, Get help and guidance
   
    #Beta banner - LAPS-230 
    Then I validate banner with text "Beta This is a new service. Help us improve it and give your feedback (opens in new tab)." on the page
    
     
    ########################################### Bank details #############################################################
    When I click "Bank details" link
    When I wait for "5" seconds
    Then I am on the "Bank details" page
    
    #Beta Banner - LAPS-230
    Then I validate banner with text "Beta This is a new service. Help us improve it and give your feedback (opens in new tab)." on the page
    
    #Bank details - LAPS-167
    Then I validate warning text "Confirmed" is displayed on the page
    Then I validate "Account name,Sort code,Account number" fields are displayed in the documents page
    Then I click "Change your local authority's bank details" link

    Then I click "Change your local authority's bank details" link
    Then I can see "submit a request to update local authority’s bank details." link
    Then I click "submit a request to update local authority’s bank details." link
    When I wait for "9" seconds
    Then I am on the "How it works" page
    Then I click on "Continue" button
    Then I am on the "New bank account details" page
    Then I fill in the new bank details in the New bank account details page
    Then I click on "Continue" button

    Then I am on the "Confirm new bank account details" page
    And I validate "Requested by, Local authority, Account name,Sort code,Account number" fields are displayed in the documents page
    Then I click on "Confirm and submit" button

    Then I am on the "New bank account details submitted" page