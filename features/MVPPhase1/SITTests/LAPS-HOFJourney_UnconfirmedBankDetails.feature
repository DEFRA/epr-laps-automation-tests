@regression

Feature: HOF Accessing LAPs account

  Scenario: As a valid user, i must be able to login and securely access the LAPs account

#Mock Sign in 
    Given I am on the Devhome page
    When I wait for "9" seconds
    Then I validate "Registered users" text on the page
    When I click "Log in" against the email address "harriet.klim@accenture.com"
    Then I select the organisation
    Then I click on "Continue" button
    When I wait for "9" seconds
#LAPS-160 
    Then I am on the "Local Authority Payments (LAPs) home" page
#LAPS-293 
   # Then I click on "Hide cookie message" button in "Cookies on Local Authority Payments" section
    Then I can see "Payment documents" link
    Then I can see "Bank details" link
    Then I can see "Get help and guidance" link
    Then log all grid titles
    Then the grid titles should match the following: Payment documents,Bank details, Get help and guidance

#LAPS-227 LAPS-320 LAPS-225
    Then I can see "Cymraeg" link
    When I click "Cymraeg" link
    Then I validate "Cyfrif Taliadau Awdurdodau Lleol ar gyfer Cyfrifoldeb Estynedig Cynhyrchwyr" text on the page
    And I can see "Allgofnodi" link
    Then I can see "Eich Cyfrif Defra" link
    Then log all grid titles
    Then the grid titles should match the following: Dogfennau talu,Manylion banc, Cael help a chanllawiau
    When I click "English" link
    Then I validate "Local Authority Payments (LAPs) home" text on the page
## Payment documents ##
    When I click "Payment documents" link
    Then I am on the "Payment documents" page
    And I wait for "9" seconds

    #LAPS-230
    Then I validate banner with text "Beta This is a new service. Help us improve it and give your feedback (opens in new tab)." on the page
    When I click "Cymraeg" link
    Then I validate banner with text "Beta Mae hwn yn wasanaeth newydd. Helpwch ni i’w wella drwy roi eich adborth (yn agor mewn tab newydd)." on the page

#LAPS-227
    Then I validate "Dogfennau talu" text on the page
    Then I can see "Lawrlwytho" link
    And I can see "Gweld (yn agor mewn tab newydd)" link
    When I click "English" link
    Then I wait for "9" seconds
    Then I validate "Payment documents" text on the page
#LAPS-172
    Then I validate warning text "For the 2025 to 2026 financial year, there will be a single payment covering quarters 1 and 2." is displayed on the page
    Then I validate that Payment documents table is displayed
    When I click sort link in the Payment table
    Then I select the year "2025 to 2026" from the dropdown
    And I validate warning text "For the 2025 to 2026 financial year, there will be a single payment covering quarters 1 and 2." is displayed on the page
    Then I wait for "9" seconds

    Then I validate that table is displayed
    #Then I capture all document names and download each document
   #Then I download and view each document sequentially

    When I click "LAPs home" link
    Then I am on the "Local Authority Payments (LAPs) home" page
    When I wait for "9" seconds

#Bank details ##
    When I click "Bank details" link
    When I wait for "9" seconds
    Then I am on the "Bank details" page
    #Beta Banner - LAPS-230
    Then I validate banner with text "Beta This is a new service. Help us improve it and give your feedback (opens in new tab)." on the page
#LAPS-169
    Then I validate warning text "Unconfirmed" is displayed on the page
    Then I validate "Account name,Sort code,Account number" fields are displayed in the documents page
#LAPS-308
    Then I validate warning text "Please confirm your local authority's bank details." is displayed on the page
    Then I click "Confirm bank details" link
    Then I am on the "Confirm your local authority" page
    #Then I confirm the bank details in the Confirm bank details page #Then I click on "Continue" button
    Then I click "Back" link
    Then I am on the "Local Authority Payments (LAPs) home" page
    When I click "Bank details" link
    When I wait for "9" seconds
    Then I am on the "Bank details" page
    Then I click "Change your local authority" link
    #Then I validate warning text "Confirmed" is displayed on the page #Then I validate warning text "Please confirm your local authority's bank details." is not displayed on the page
#LAPS-308 LAPS-302 LAPS-300 LAPS-299 LAPS-298 LAPS-297 LAPS-296
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
When I wait for "9" seconds
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
    When I wait for "9" seconds
#LAPS-367 IDM Signout, LAPS-364- FSS Signout LAPS-162 LAPS Signout
    When I click "Sign out" link
    When I wait for "9" seconds
    Then I am on the "You are now signed out of Local Authority Payments account" page