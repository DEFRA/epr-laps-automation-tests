Feature: Accessing LAPs account - LAPS-1133 Journey12_Change the user role from Admin HoF to Admin WO- Non Wales

  Scenario: As a valid user, i must be able to login and securely access the LAPs account
#LAPS-216 - IDM Sign In  
    Given I am on the home page
    When I wait for "9" seconds
    Then I validate "What’s your local authority email address?" text on the page
    Then I validate "We will send a one-time passcode to this email address." text on the page
    When I enter the email address for "ChangeHoFuser"
    When I wait for "5" seconds
    Then I click on "Continue" button
    When I wait for "5" seconds
    When I Trigger the OP API using valid cred
    Then I extract the OTP from API response and enter it in UI
    And I wait for "9" seconds
    Then I click on "Continue" button
    And I wait for "9" seconds
#LAPS-160 
    Then I am on the "Local Authority Payments (LAPs) home" page
#LAPS-293 
   # Then I click on "Hide cookie message" button in "Cookies on Local Authority Payments" section
    Then I can see "Payment documents" link
    Then I can see "Bank details" link
    Then I can see "Get help and guidance" link
    Then log all grid titles
    Then the grid titles should match the following: Payment documents,Bank details, Get help and guidance

## Bank details ##
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

    Then I navigate to the "ConfirmBankDetails" page
    Then I am on the "Confirm your local authority" page
    Then I confirm the bank details in the Confirm bank details page
    Then I click on "Continue" button
    Then I am on the "Bank details confirmed" page

#################################Your Defra Account link #######################################################
    # Your defra account - LAPS-202
    When I click "Your Defra account" link
    When I wait for "5" seconds
    Then I am on the "Your Defra account" page
    And I can see "Sign out" link

#################################Change User Role in Your Defra Account Page ##################################    

 When I choose the "Manage" link
 And I click "Manage team access" link
 When I wait for "9" seconds
 Then I am on the "Manage team access" page
 And I choose the "Manage" link
 Then I can see "Change service role" link 
 And I choose the "Change service role" link
 Then I am on the "What role will they have on this service?" page
Then I "uncheck" the "Head of Finance" checkbox on the page
And I "check" the "Waste Officer" checkbox on the page
Then I click on "Continue" button
When I wait for "9" seconds
When I wait for "9" seconds

## Navigate to LAPS page ##
Then I click "Manage service Local Authority Payments" link
Then I am on the "Local Authority Payments (LAPs) home" page
#LAPS-162 Signout
When I click "Sign out" link
When I wait for "9" seconds
Then I am on the "You are now signed out of Local Authority Payments account" page
#LAPS-216 IDM Sign In  
When I click on "Sign in" button
When I wait for "5" seconds
Then I am on the home page
When I wait for "5" seconds
Then I validate "What’s your local authority email address?" text on the page
Then I validate "We will send a one-time passcode to this email address." text on the page
When I enter the email address for "ChangeHoFuser"
When I wait for "5" seconds
Then I click on "Continue" button
When I wait for "5" seconds
When I Trigger the OP API using valid cred
Then I extract the OTP from API response and enter it in UI
And I wait for "9" seconds
Then I click on "Continue" button
And I wait for "9" seconds
And I wait for "9" seconds
#LAPS-160 
Then I am on the "Local Authority Payments (LAPs) home" page
## Bank details ##
When I click "Bank details" link
When I wait for "5" seconds
Then I am on the "Bank details" page
#Beta Banner - LAPS-230
Then I validate "Account name,Sort code,Account number" fields are displayed in the documents page
    Then I validate "Sort code" field value contains "ending with"
    Then I validate "Account number" field value contains "ending with"
    Then I navigate to the "ConfirmBankDetails" page
    Then I am on the "Page not found" page
    Then I click "Cymraeg" link
    And I am on the "Heb ddod o hyd i" page
    Then I navigate to the "UpdateBankDetails" page
    Then I am on the "Heb ddod o hyd i" page
    Then I click "English" link
    Then I navigate to the "CheckBankDetails" page
    Then I am on the "Page not found" page
    Then I navigate to the "SubmitBankDetails" page
    Then I am on the "Page not found" page
    Then I navigate to the "LAPS" page
    Then I am on the "Local Authority Payments (LAPs) home" page
    When I wait for "5" seconds

## Change user back to HOF##

When I click "Your Defra account" link
    When I wait for "5" seconds
    Then I am on the "Your Defra account" page
    And I can see "Sign out" link

#################################Change User Role in Your Defra Account Page ##################################    

 When I choose the "Manage" link
 And I click "Manage team access" link
 When I wait for "9" seconds
 Then I am on the "Manage team access" page
 And I choose the "Manage" link
  Then I can see "Change service role" link
 And I choose the "Change service role" link
 Then I am on the "What role will they have on this service?" page
Then I "uncheck" the "Waste Officer" checkbox on the page
And I "check" the "Head of Finance" checkbox on the page
Then I click on "Continue" button
When I wait for "9" seconds
When I wait for "9" seconds
## Navigate to LAPS page ##
Then I click "Manage service Local Authority Payments" link
Then I am on the "Local Authority Payments (LAPs) home" page
#LAPS-162 Signout
When I click "Sign out" link
When I wait for "9" seconds
Then I am on the "You are now signed out of Local Authority Payments account" page