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
   #Given I am on the home page
    Then I am on the "Local Authority Payments (LAPs) home" page
    When I wait for "5" seconds
    Then I can see "Payment documents" link
    Then I can see "Bank details" link
    Then I can see "Get help and guidance" link
    Then log all grid titles
    Then the grid titles should match the following: Payment documents,Bank details, Get help and guidance
   
    #Beta banner - LAPS-230 
    Then I validate banner with text "Beta This is a new service. Help us improve it and give your feedback (opens in new tab)." on the page
    
    #Welsh toggle - LAPS-227
    Then I can see "Cymraeg" link
    When I click "Cymraeg" link
    Then I validate "Cyfrif Taliadau Awdurdodau Lleol ar gyfer EPR" text on the page
    And I can see "Allgofnodi" link
    Then I can see "Eich Cyfrif Defra" link
    Then log all grid titles
    Then the grid titles should match the following: Dogfennau talu,Manylion banc, Cael help ac arweiniad
    When I click "English" link
    Then I validate "Local Authority Payments (LAPs) home" text on the page

    ####################################### Payment documents #####################################################
    When I click "Payment documents" link
    When I wait for "5" seconds
    Then I am on the "Payment documents" page
    
    #Beta banner - LAPS-230
    Then I validate banner with text "Beta This is a new service. Help us improve it and give your feedback (opens in new tab)." on the page
    
    #Welsh toggle - LAPS-227
    When I click "Cymraeg" link
    Then I wait for "5" seconds
    Then I validate "Dogfennau talu" text on the page

    Then I validate "Dogfennau talu" text on the page
    Then I can see "Lawrlwythwch" link
    And I can see "Gweld (yn agor mewn tab newydd)" link

    When I click "English" link
    Then I wait for "5" seconds
    Then I validate "Payment documents" text on the page    
    
     #Payment documents - LAPS-172
    Then I validate warning text "For the 2025 to 2026 financial year, there will be a single payment covering quarters 1 and 2." is displayed on the page
    Then I validate that Payment documents table is displayed
    When I click sort link in the Payment table
    Then I select the year "2024 to 2025" from the dropdown
    Then I validate warning text "For the 2025 to 2026 financial year, there will be a single payment covering quarters 1 and 2." is not displayed on the page
    And I click sort link in the Payment table
    Then I select the year "2025 to 2026" from the dropdown
    And I validate warning text "For the 2025 to 2026 financial year, there will be a single payment covering quarters 1 and 2." is displayed on the page
    Then I wait for "5" seconds

    #LAPS-371
    Then I click on "Download" link in the table for "Remittance letter Q3"
    Then I click on "View (opens in a new tab)" link in the table for "Remittance letter Q4" and validate PDF opens


    When I click "LAPs home" link
    Then I am on the "Local Authority Payments (LAPs) home" page
    When I wait for "5" seconds   
    
    ########################################### Bank details #############################################################
    When I click "Bank details" link
    When I wait for "5" seconds
    Then I am on the "Bank details" page
    
    #Beta Banner - LAPS-230
    Then I validate banner with text "Beta This is a new service. Help us improve it and give your feedback (opens in new tab)." on the page
    
    #Bank details - LAPS-167
    #Then I validate "The nominated Head of Finance will need to confirm your local authority's bank details." text is not displayed on the page
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

    #Welsh toggle - LAPS-227
    When I click "Cymraeg" link
    Then I validate "Cyfrif Taliadau Awdurdodau Lleol ar gyfer EPR" text on the page
    Then I validate "Manylion banc" text on the page
    Then I validate warning text "Cadarnhawyd" is displayed on the page
    Then I validate "Enw cyfrif,Cod didoli,Rhif cyfrif" fields are displayed in the documents page
    Then I click "Newid manylion banc eich awdurdod lleol" link
    When I click "English" link
    Then I validate "Local Authority Payments (LAPs) home" text on the page

    When I click "LAPs home" link
    Then I am on the "Local Authority Payments (LAPs) home" page
    When I wait for "5" seconds
    
    ######################################## Get Help page #########################################################
    When I click "Get help and guidance" link
    When I wait for "5" seconds
    Then I am on the "Get help and guidance" page
    #Beta banner - LAPS-230
    Then I validate banner with text "Beta This is a new service. Help us improve it and give your feedback (opens in new tab)." on the page
    
    #Get Help page - LAPS-173
    Then I can see "Extended producer responsibility (EPR) for packaging for local authorities" link
    Then I can see "raise a customer service ticket" link
    
    #Welsh toggle - LAPS-227
    When I click "Cymraeg" link
    Then I validate "Cyfrif Taliadau Awdurdodau Lleol ar gyfer EPR" text on the page
    Then I validate "Cael help ac arweiniad" text on the page
    Then I can see "Cyfrifoldeb cynhyrchydd estynedig (EPR) ar gyfer pecynnu ar gyfer awdurdodau lleol " link
    Then I can see "codi tocyn gwasanaeth cwsmeriaid i" link
    When I click "English" link
    Then I validate "Local Authority Payments (LAPs) home" text on the page

    When I click "LAPs home" link
    Then I am on the "Local Authority Payments (LAPs) home" page
    When I wait for "5" seconds
    
    #################################Your Defra Account link #######################################################
    #Your defra account - LAPS-202
    When I click "Your Defra account" link
    When I wait for "5" seconds
    Then I am on the "Your Defra account" page
    And I can see "Manage account" link
    And I can see "Sign out" link
    And I can see "Add" link
    And I can see "Manage" link
    #### how to validate a table
    ####validate the name

    
    ######################################Sign Out link ###########################################################
    When I click "Sign out" link
    When I wait for "5" seconds
    #Then I validate "You are now signed out of Local Authority Payments account" text on the page    
    Then I validate "Your Defra account" text on the page    