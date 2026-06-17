Feature: Accessing LAPs account - Journey5_HoF - Admin user - Non Wales_Confirmed Bank Details

  Scenario: As a valid user, i must be able to login and securely access the LAPs account
#LAPS-216 - IDM Sign In  
    Given I am on the home page
    When I wait for "5" seconds
    Then I validate "What’s your local authority email address?" text on the page
    Then I validate "We will send a one-time passcode to this email address." text on the page
    When I enter the email address for "HOF_ConfirmedBankdetails"
    When I wait for "5" seconds
    Then I click on "Continue" button
    When I wait for "9" seconds
    When I wait for "9" seconds
    When I wait for "9" seconds
    When I wait for "9" seconds
#LAPS-160 
    Then I am on the "Local Authority Payments (LAPs) home" page
## Bank details ##
    When I click "Bank details" link
    When I wait for "5" seconds
    Then I am on the "Bank details" page
    #Beta Banner - LAPS-230
    Then I validate banner with text "Beta This is a new service. Help us improve it and give your feedback (opens in new tab)." on the page
#LAPS-169
    Then I validate warning text "Confirmed" is displayed on the page
    Then I validate warning text "Please confirm your local authority's bank details." is not displayed on the page
    Then I validate "Account name,Sort code,Account number" fields are displayed in the documents page
#LAPS-308
    Then I validate warning text "Please confirm your local authority's bank details." is not displayed on the page
    Then I click "LAPs home" link
    Then I am on the "Local Authority Payments (LAPs) home" page
## Payment documents ##
    When I click "Payment documents" link
    Then I am on the "Payment documents" page
#LAPS-230
    Then I validate banner with text "Beta This is a new service. Help us improve it and give your feedback (opens in new tab)." on the page
    When I click "Cymraeg" link
    Then I validate banner with text "Beta Mae hwn yn wasanaeth newydd. Helpwch ni i’w wella drwy roi eich adborth (yn agor mewn tab newydd)." on the page
#LAPS-227
    Then I validate "Dogfennau talu" text on the page
    Then I can see "Lawrlwytho" link
    And I can see "Gweld (yn agor mewn tab newydd)" link
    When I click "English" link
    Then I wait for "5" seconds
    Then I validate "Payment documents" text on the page
#LAPS-172
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
    Then I click on "View (opens in new tab)" link in the table for "Remittance letter Q3" and validate PDF opens
    When I click "LAPs home" link
    Then I am on the "Local Authority Payments (LAPs) home" page
    When I wait for "5" seconds
#LAPS-162 Signout
    When I click "Sign out" link
    When I wait for "5" seconds
    Then I am on the "You are now signed out of Local Authority Payments account" page
#LAPS-216 - IDM Sign In  
    When I click on "Sign in" button
    When I wait for "5" seconds
    Then I am on the home page
    When I wait for "5" seconds
    Then I validate "What’s your local authority email address?" text on the page
    Then I validate "We will send a one-time passcode to this email address." text on the page
    When I enter the email address for "HOF_ConfirmedBankdetails"
    When I wait for "5" seconds
    Then I click on "Continue" button
    When I wait for "9" seconds
    When I wait for "9" seconds
    When I wait for "9" seconds
    When I wait for "9" seconds
#LAPS-160 
    Then I am on the "Local Authority Payments (LAPs) home" page
#Get Help page LAPS-212 LAPS-211
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
    Then I validate "Cyfrif Taliadau Awdurdodau Lleol ar gyfer Cyfrifoldeb Estynedig Cynhyrchwyr" text on the page
    Then I validate "Cael help a chanllawiau" text on the page
    Then I can see "Gyfrifoldeb Estynedig Cynhyrchwyr ar gyfer pecynwaith i awdurdodau lleol" link
    Then I can see "Codi tocyn gwasanaethau i gwsmeriaid" link
    When I click "English" link
    Then I validate "Get help and guidance" text on the page
    When I click "LAPs home" link
    Then I am on the "Local Authority Payments (LAPs) home" page
    When I wait for "5" seconds
#LAPS-162 Signout
    When I click "Sign out" link
    When I wait for "9" seconds
    Then I am on the "You are now signed out of Local Authority Payments account" page
#LAPS-216 - IDM Sign In  
    When I click on "Sign in" button
    When I wait for "5" seconds
    Then I am on the home page
    When I wait for "5" seconds
    Then I validate "What’s your local authority email address?" text on the page
    Then I validate "We will send a one-time passcode to this email address." text on the page
    When I enter the email address for "HOF_ConfirmedBankdetails"
    When I wait for "5" seconds
    Then I click on "Continue" button
    When I wait for "9" seconds
    When I wait for "9" seconds
    When I wait for "9" seconds
    When I wait for "9" seconds
#LAPS-160 
    Then I am on the "Local Authority Payments (LAPs) home" page
    When I click "Bank details" link
    When I wait for "5" seconds
    Then I am on the "Bank details" page
    #Beta Banner - LAPS-230
    Then I validate banner with text "Beta This is a new service. Help us improve it and give your feedback (opens in new tab)." on the page
#LAPS-167
    Then I validate warning text "Confirmed" is displayed on the page
    Then I validate "Account name,Sort code,Account number" fields are displayed in the documents page
    Then I click "Change your local authority" link
#LAPS-308 LAPS-302 LAPS-300 LAPS-299 LAPS-298 LAPS-297 LAPS-296
    Then I can see "submit a request to update local authority’s bank details." link
    Then I click "submit a request to update local authority’s bank details." link
    When I wait for "9" seconds
    Then I am on the "How it works" page
    Then I click on "Continue" button
    Then I am on the "New bank account details" page
    #When I enter "<accountName>" as account name
    #And I enter "<sortCode>" as sort code
    #And I enter "<accountNumber>" as account number
    #    Then I click on "Continue" button
    #Then I should see "<errorMessage>" inline for "<field>"
    #Then I should see inline errors for the fields
    #And I should see "<errorMessage>" at the top of the page
    Then I fill in the invalid inputs in the bank details in the New bank account details page
    Then I click on "Continue" button
    #need to enter validating error message
    Then I fill in the invalid length bank details in the New bank account details page
    Then I click on "Continue" button
    #need to enter validating error message
    Then I do not enter any bank details in the New bank account details page
    Then I click on "Continue" button
    #need to enter validating error message
    Then I fill in the new bank details in the New bank account details page
    Then I click on "Continue" button
    Then I am on the "Confirm new bank account details" page
    And I validate "Requested by, Local authority, Account name,Sort code,Account number" fields are displayed in the documents page
    Then I click on "Confirm and submit" button
#LAPS-171
    Then I am on the "New bank account details submitted" page
#LAPS-227
    When I click "Cymraeg" link
    Then I validate "Cyfrif Taliadau Awdurdodau Lleol ar gyfer Cyfrifoldeb Estynedig Cynhyrchwyr" text on the page
    Then I click "manylion banc" link
    Then I am on the "manylion banc" page
    When I click "English" link
    Then I validate "Bank details" text on the page
    When I click "LAPs home" link
    Then I am on the "Local Authority Payments (LAPs) home" page
    When I wait for "5" seconds
    #########Get Help page LAPS-212 LAPS-211 ##################
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
    Then I validate "Cyfrif Taliadau Awdurdodau Lleol ar gyfer Cyfrifoldeb Estynedig Cynhyrchwyr" text on the page
    Then I validate "Cael help a chanllawiau" text on the page
    Then I can see "Gyfrifoldeb Estynedig Cynhyrchwyr ar gyfer pecynwaith i awdurdodau lleol" link
    Then I can see "Codi tocyn gwasanaethau i gwsmeriaid" link
    When I click "English" link
    Then I validate "Get help and guidance" text on the page
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
    #######LAPS-367 IDM Signout, LAPS-364- FSS Signout LAPS-162 LAPS Signout##########
    When I click "Sign out" link
    When I wait for "5" seconds
    #Then I validate "You are now signed out of Local Authority Payments account" text on the page    
    Then I validate "Your Defra account" text on the page
