Feature: Accessing LAPs account - LAPS-160,LAPS-227,LAPS-230

  Scenario: As a valid user, i must be able to login and securely access the LAPs account
    
    ######################################### IDM Sign In #########################################    
    Given I am on the home page
    When I wait for "5" seconds
    When I fill in the email address for "CEO_UnconfirmedBankdetails"
    Then I click on "Continue" button
    When I wait for "9" seconds
    When I wait for "9" seconds
    When I wait for "9" seconds
    When I wait for "9" seconds
    #Then I click on "Continue" button
   
    ######################################### LAPs Dashboard page LAPS-160 #########################################
    Then I am on the "Local Authority Payments (LAPs) home" page
    When I wait for "5" seconds
    Then I can see "Bank details" link

    ######################################## Bank details #############################################################
    When I click "Bank details" link
    When I wait for "5" seconds
    Then I am on the "Bank details" page
    
    #Beta Banner - LAPS-230
    Then I validate banner with text "Beta	This is a new service. Help us improve it and give your feedback(opens in new tab)." on the page
    
    #Bank details - LAPS-167
    Then I validate the Important banner "Your nominated Head of Finance must confirm these details." text on the page
    Then I validate warning text "Unconfirmed" is displayed on the page
    When I wait for "9" seconds
    Then I validate "Account name,Sort code,Account number" fields are displayed in the documents page
    #Then I validate the UI fields match the data config

        #Welsh toggle - LAPS-227
  #  When I click "Cymraeg" link
  #  Then I validate "Cyfrif Taliadau Awdurdodau Lleol ar gyfer EPR" text on the page
   # Then I validate "Manylion banc" text on the page
  #  Then I validate warning text "Cadarnhawyd" is displayed on the page
  #  Then I validate "Enw cyfrif,Cod didoli,Rhif cyfrif" fields are displayed in the documents page
  #  Then I click "Newid manylion banc eich awdurdod lleol" link
  #  When I click "English" link
  #  Then I validate "Local Authority Payments (LAPs) home" text on the page

    Then I click "Change your local authority's bank details" link
    Then I can see "submit a request to update local authority’s bank details." link
    Then I click "submit a request to update local authority’s bank details." link
    When I wait for "9" seconds
    Then I am on the "How it works" page
    Then I click on "Continue" button
    Then I am on the "New bank account details" page

    Then I fill in the invalid inputs in the bank details in the New bank account details page
    Then I click on "Continue" button
    Then I should see a global error message "There is a problem"
    And I should see a field error message "Enter account name"
    When I click "Back" link

    Then I do not enter any bank details in the New bank account details page
    Then I click on "Continue" button

    Then I fill in the invalid length bank details in the New bank account details page
    Then I click on "Continue" button
    
    Then I fill in the new bank details in the New bank account details page
    Then I click on "Continue" button

    Then I am on the "Confirm new bank account details" page
    And I validate "Requested by, Local authority, Account name,Sort code,Account number" fields are displayed in the documents page
    Then I click on "Confirm and submit" button

    Then I am on the "New bank account details submitted" page

      Then I click "Go to Bank details" link
      Then I am on the "Bank details" page


  #  When I click "LAPs home" link
  #  Then I am on the "Local Authority Payments (LAPs) home" page
  #  When I wait for "5" seconds
    
