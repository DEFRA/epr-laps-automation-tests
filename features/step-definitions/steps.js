import { Given, When, Then } from '@wdio/cucumber-framework'
// const { Given, When, Then } = require('@wdio/cucumber-framework');
import { expect, browser } from '@wdio/globals'
// import * as path from 'path'
import SecurePage from '../page-objects/secure.page.js'
import LoginPage from '../page-objects/login.page.js'
import { dataConfig } from '../../dataConfig.js'
import { clickElement, setValue } from './Common.js'
import logger from '../../logger.js'
// import * as fs from 'fs'
import allureReporter from '@wdio/allure-reporter'
import assert from 'assert'
// import { fileURLToPath } from 'url'
// import axios from 'axios'
// import * as qs from 'qs'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

Given(/^I am on the Devhome page$/, async () => {
  await browser.maximizeWindow()
  await browser.url(dataConfig.expectedUrls.dev)
  // browser.pause(10)

  const screenshot = await browser.takeScreenshot()
  allureReporter.addAttachment('Screenshot', screenshot, 'image/png')
})

When(
  /^I click "([^"]*)" against the email address "([^"]*)"$/,
  async (linkText, emailAddress) => {
    const row = await $(
      `//tr[th[contains(normalize-space(), "${emailAddress}")]]`
    )
    await row.waitForExist({ timeout: 5000 })
    const link = await $(
      `//tr[th[contains(normalize-space(), "${emailAddress}")]]/td/a[normalize-space()="${linkText}"]`
    )
    await link.waitForExist({ timeout: 5000 })
    await link.click()
  }
)

Then('I select the organisation', async () => {
  const organisationRadio = await $('//*[@id="relationshipId"]')
  await organisationRadio.click()
})

//  Below are for end to end journey steps //

Given(/^I am on the home page$/, async () => {
  await browser.maximizeWindow()
  await browser.url(dataConfig.expectedUrls.test)
  // browser.pause(10)

  const screenshot = await browser.takeScreenshot()
  allureReporter.addAttachment('Screenshot', screenshot, 'image/png')
})

Then(/^I navigate to the "(.+)" page$/, async (pageName) => {
  await browser.maximizeWindow()

  const pageUrls = {
    ConfirmBankDetails: dataConfig.expectedUrls.confirmBankdetails,
    UpdateBankDetails: dataConfig.expectedUrls.updateBankdetails,
    CheckBankDetails: dataConfig.expectedUrls.checkBankdetails,
    SubmitBankDetails: dataConfig.expectedUrls.submitBankdetails,
    LAPS: dataConfig.expectedUrls.test
  }

  const url = pageUrls[pageName]

  if (!url) {
    throw new Error(`No URL mapped for page: ${pageName}`)
  }

  await browser.url(url)
})

Then(
  /^I click on "(.+)" button(?: in "(.+)" section)?$/,
  { timeout: 30000 },
  async function (buttonText, sectionTitle) {
    try {
      const btn = await SecurePage.getButton(buttonText, sectionTitle)
      await btn.waitForDisplayed({ timeout: 10000 })
      await btn.waitForClickable({ timeout: 10000 })
      await btn.click()
      logger.info(
        `Clicked the button: ${buttonText}${sectionTitle ? ` in section: ${sectionTitle}` : ''}`
      )
    } catch (error) {
      logger.info(
        `Failed to click the button: ${buttonText}${sectionTitle ? ` in section: ${sectionTitle}` : ''}`
      )
      throw error
    }
  }
)

Then(/^I can see "(.+)" link$/, async (linkText) => {
  try {
    const link = await SecurePage.getLink(linkText)
    await expect(link).toBeExisting()
    logger.info(`Able to view the link: ${linkText}`)
  } catch (error) {
    logger.info(`Could not find the link: ${linkText}`)
    throw error
  }
})

Then(/^I cannot see "(.+)" link$/, async (linkText) => {
  try {
    const link = await SecurePage.getLink(linkText)
    await expect(link).not.toBeExisting()
    logger.info(`Able to view the link: ${linkText}`)
  } catch (error) {
    logger.info(`Could not find the link: ${linkText}`)
    throw error
  }
})

When(/^I click "(.+)" link$/, async (linkText) => {
  // const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  // const reportsDir = path.resolve(__dirname, '../../reports')
  // Ensure reports directory exists
  // if (!fs.existsSync(reportsDir)) {
  //  fs.mkdirSync(reportsDir, { recursive: true })
  // }
  // const fileName = `click_${linkText}_${timestamp}.png`
  // const filePath = path.join(reportsDir, fileName)
  try {
    const link = await SecurePage.getLink(linkText)
    await link.click()
    logger.info(`Clicked the link: ${linkText}`)
  } catch (error) {
    logger.info(`Failed to click the link: ${linkText}`)
    // await browser.saveScreenshot(filePath)
    // logger.info(`Screenshot saved (on error) to ${filePath}`)
    throw error
  }

  // Also take screenshot on success
  // await browser.saveScreenshot(filePath)
  // logger.info(`Screenshot saved (on success) to ${filePath}`)
})

When(/^I choose the "(.+)" link$/, async (linkText) => {
  try {
    const link = await SecurePage.manageLink(linkText)
    logger.info(`linkText = [${linkText}]`)
    await link.waitForExist({ timeout: 5000 })

    logger.info('Displayed:', await link.isDisplayed())
    await link.click()
    logger.info(`Clicked the link: ${linkText}`)
  } catch (error) {
    logger.info(`Failed to click the link: ${linkText}`)
    // await browser.saveScreenshot(filePath)
    // logger.info(`Screenshot saved (on error) to ${filePath}`)
    throw error
  }

  // Also take screenshot on success
  // await browser.saveScreenshot(filePath)
  // logger.info(`Screenshot saved (on success) to ${filePath}`)
})

//
// -------------------------------
//  CUCUMBER STEP DEFINITIONS
// -------------------------------
//

// When(/^I enter email as user "(.+)"$/, async (user) => {
//  const email = resolveEmail(user)
//  await $('#email').setValue(email)
// })

// Then(/^I fill in the email address for "(.+)"$/, async (user) => {
//  await enterEmailAddress(user)
// })

// async function enterEmailAddress(user) {
//  const userEmailInput = await SecurePage.getinputbyid('user_name')
//  await userEmailInput.waitForExist({ timeout: 10000 })

//  let email

//  if (user === 'CEO') {
//    email = dataConfig.credentials.ceoemail
//  } else if (user === 'CEO_UnconfirmedBankdetails') {
//    email = dataConfig.credentials.unconfirmedceoemail
//  } else if (user === 'HOF') {
//    email = dataConfig.credentials.hofemail
//  } else if (user === 'HOF_UnconfirmedBankdetails') {
//    email = dataConfig.credentials.unconfirmedhofemail
//  } else if (user === 'HOW') {
//    email = dataConfig.credentials.howemail
//  } else {
//    throw new Error(`No email configured for user: ${user}`)
//  }

//  await userEmailInput.setValue(email)
//  logger.info(`Email entered for ${user}: ${email}`)
// }

Then(/^I am on the "(.+)" page$/, async (pageName) => {
  try {
    const headerElement = SecurePage.getHeader(pageName)
    const isDisplayed = await headerElement.isDisplayed()

    if (!isDisplayed) {
      throw new Error(`Page header '${pageName}' is not displayed`)
    }
    logger.info(`Page is displayed: ${pageName}`)
  } catch (error) {
    logger.info(`Page not displayed: ${pageName}`)
    throw error
  }
})

Then(/^I validate "(.+)" text on the page$/, async (paraName) => {
  try {
    const textElement = await SecurePage.paraText(paraName)
    await expect(textElement).toBeDisplayed()
  } catch (e) {
    throw new Error(`Message not displayed - ${e?.message || e}`)
  }
})

Then(
  /^I validate "(.+)" text is not displayed on the page$/,
  async (paraName) => {
    try {
      const textElement = await SecurePage.paraText(paraName)
      await expect(textElement).not.toBeDisplayed()
    } catch (e) {
      throw new Error(`Message not displayed - ${e?.message || e}`)
    }
  }
)

Then(
  /^I confirm the bank details in the Confirm bank details page$/,
  async () => {
    try {
      await clickElement(await SecurePage.getcheckboxid())
    } catch (e) {
      throw new Error(
        `Confirm bank details checkbox not clicked - ${e?.message || e}`
      )
    }
  }
)

Then(
  /^I "(check|uncheck)" the "([^"]*)" checkbox on the page$/,
  async (action, checkboxName) => {
    try {
      const checkbox = await SecurePage.getCheckbox(checkboxName)

      const isSelected = await checkbox.isSelected()

      if (action === 'check' && !isSelected) {
        await checkbox.click()
      }

      if (action === 'uncheck' && isSelected) {
        await checkbox.click()
      }
    } catch (e) {
      throw new Error(
        `Unable to ${action} the ${checkboxName} checkbox - ${e?.message || e}`
      )
    }
  }
)

Then(
  /^I validate the Important banner "(.+)" text on the page$/,
  async (paraName) => {
    const textElement = await SecurePage.paraText(paraName)
    const isDisplayed = await textElement.isDisplayed().catch(() => false)

    if (isDisplayed) {
      logger.info(`Banner with text "${paraName}" is displayed.`)
      // Assuming there’s a link element inside the banner
      const linkElement = await textElement.$('a')
      if (await linkElement.isExisting()) {
        await linkElement.click()
        logger.info(`Clicked on link within banner "${paraName}".`)
      } else {
        logger.info(`No link found inside banner "${paraName}".`)
      }
    } else {
      logger.info(
        `Banner with text "${paraName}" is not displayed on the page.`
      )
    }
  }
)

Then(
  /^I validate warning text "(.+)" is displayed on the page$/,
  async (paraName) => {
    try {
      const textElement = SecurePage.warningText(paraName)
      await expect(textElement).toBeDisplayed()
    } catch (e) {
      throw new Error(`Message not displayed"-  ${e?.message || e}`)
    }
  }
)

// Global (form-level) error messages
Then(
  /^I should see a global error message "([^"]*)"$/,
  async (expectedMessage) => {
    const allErrors = await SecurePage.getAllGlobalErrors()
    logger.info(`Global errors:`, allErrors) // should now show an array of strings
    expect(allErrors).toContain(expectedMessage)
  }
)

Then(
  /^I should see a field error message "([^"]*)"$/,
  async (expectedMessage) => {
    const allFieldErrors = await SecurePage.getAllFieldErrors()
    logger.info(`Field errors:`, allFieldErrors)
    expect(allFieldErrors).toContain(expectedMessage)
  }
)

// The below fillin details probably is throw away code. better to have entering details, validating errors as seperate SD's
Then(
  /^I fill the bank details with "([^"]*)" "([^"]*)" "([^"]*)" and validate errors$/,
  async (sortCode, accountNumber, accountName) => {
    // Clear fields first
    await $('#sortCode').clearValue()
    await $('#accountNumber').clearValue()
    await $('#accountName').clearValue()

    // Enter values
    await $('#sortCode').setValue(sortCode)
    await $('#accountNumber').setValue(accountNumber)
    await $('#accountName').setValue(accountName)

    // Click Continue
    await $('#continue').click()

    // Wait for errors (MAKE SURE ERROR ELEMENTS EXIST)
    await expect($('#sortCode-error')).toBeDisplayed()
    await expect($('#accountNumber-error')).toBeDisplayed()
    await expect($('#accountName-error')).toBeDisplayed()

    // Optional: assert exact message text
    await expect($('#sortCode-error')).toHaveTextContaining(
      'Enter a valid sort code'
    )

    // Global level error messages
    await expect($('#field-error')).toHaveTextContaining('some message')
  }
)

// Fill bank details + click Continue
When(
  /^I fill the bank details with "([^"]*)" "([^"]*)" "([^"]*)" and submit$/,
  async (sortCode, accountNumber, accountName) => {
    await $('#sortCode').clearValue()
    await $('#accountNumber').clearValue()
    await $('#accountName').clearValue()

    await $('#sortCode').setValue(sortCode)
    await $('#accountNumber').setValue(accountNumber)
    await $('#accountName').setValue(accountName)

    await $('#continue').click()
  }
)
// Validate field-level errors
Then(/^I should see field level bank detail errors$/, async () => {
  await expect($('#sortCode-error')).toBeDisplayed()
  await expect($('#accountNumber-error')).toBeDisplayed()
  await expect($('#accountName-error')).toBeDisplayed()

  // Optional: check specific texts
  await expect($('#sortCode-error')).toHaveTextContaining(
    'Enter a valid sort code'
  )
})
// Validate global error banner
Then(/^I should see a global error message$/, async () => {
  const globalError = $('#global-error-banner')

  await expect(globalError).toBeDisplayed()
  await expect(globalError).toHaveTextContaining('There is a problem')
})

Then(
  /^I validate warning text "(.+)" is not displayed on the page$/,
  async (paraName) => {
    try {
      const textElement = SecurePage.warningText(paraName)
      await expect(textElement).not.toBeDisplayed()
    } catch (e) {
      throw new Error(`Message not displayed"-  ${e?.message || e}`)
    }
  }
)

When(/^I log into heroku app$/, async function () {
  try {
    await browser.url(dataConfig.expectedUrls.herokuapp)
    await browser.maximizeWindow()

    const pwd = dataConfig.credentials.password
    await setValue(await SecurePage.getinputbyid('password'), pwd)
    await clickElement(await SecurePage.getButton('Continue'))

    logger.info('User logged in')
  } catch (e) {
    throw new Error(`Incorrect URL" -   ${e?.message || e}`)
  }
})

When(/^I log into ERP app$/, async function () {
  try {
    const usernameInput = await SecurePage.getinputbyid('user_name')
    await usernameInput.waitForExist({ timeout: 5000 })
    await usernameInput.waitForDisplayed({ timeout: 5000 })
    await usernameInput.setValue(dataConfig.credentials.username)

    const passwordInput = await SecurePage.getinputbyid('user_password')
    await passwordInput.waitForExist({ timeout: 5000 })
    await passwordInput.setValue(dataConfig.credentials.password)

    const loginBtn = await SecurePage.getbuttonlogin()
    await loginBtn.waitForClickable({ timeout: 5000 })
    await loginBtn.click()

    logger.info('User logged in')
  } catch (e) {
    throw new Error(`Login failed -  ${e?.message || e}`)
  }
})

// eslint-disable-next-line wdio/no-pause

When(/^I wait for "(\d+)" seconds$/, async (seconds) => {
  const ms = Number(seconds) * 1000
  const start = Date.now()

  await browser.waitUntil(() => Date.now() - start >= ms, {
    timeout: ms + 50, // small buffer to avoid false timeout
    interval: 100, // how often to check
    timeoutMsg: `Waited for ${ms}ms`
  })
})

When(/^I login with (.+) and (.+)$/, async (username, password) => {
  await LoginPage.login(username, password)
})

Then(/^I should see a flash message saying (.*)$/, async (message) => {
  await expect(SecurePage.flashAlert).toBeExisting()
  await expect(SecurePage.flashAlert).toHaveText(
    expect.stringContaining(message)
  )
})

Given(/^I am in the (.+) page$/, async (pageName) => {
  try {
    const actualUrl = await browser.getUrl()
    const expectedUrl = dataConfig.expectedUrls[pageName]

    logger.info(`Actual URL: ${actualUrl}`)
    logger.info(`Expected URL: ${expectedUrl}`)

    logger.info(`Successfully landed on "${pageName}" page.`)
  } catch (e) {
    throw new Error(
      `Incorrect URL requested for "${pageName}" ${e?.message || e}`
    )
  }
})

Then(
  /^I validate "(.+)" fields are displayed in the documents page$/,
  async function (fieldNames) {
    try {
      const fields = fieldNames.split(',').map((field) => field.trim())

      for (const fieldName of fields) {
        const fieldElement = await SecurePage.getFieldName(fieldName)
        await expect(fieldElement).toBeDisplayed()
        const fieldElementText = await fieldElement.getText()
        logger.info(`Field Element Name: ${fieldElementText}`)

        const fieldValueElement = await SecurePage.getFieldValue(fieldName)
        await expect(fieldValueElement).toBeDisplayed()

        const valueText = await fieldValueElement.getText()
        await expect(valueText.trim()).not.toBe('')
        const fieldValueText = await fieldValueElement.getText()
        logger.info(`Field Element Value: ${fieldValueText}`)
      }
    } catch (e) {
      throw new Error(`Error validating fields: ${e?.message || e}`)
    }
  }
)

Then(
  /^I validate "(.+)" field value contains "(.+)"$/,
  async function (fieldName, expectedText) {
    try {
      const fieldValueElement = await SecurePage.getFieldValue(fieldName)
      await expect(fieldValueElement).toBeDisplayed()

      const actualText = (await fieldValueElement.getText()).trim()
      logger.info(`Field: ${fieldName}, Cell Text: ${actualText}`)

      await expect(actualText).toContain(expectedText)
    } catch (e) {
      throw new Error(
        `Error validating table field contains text: ${e?.message || e}`
      )
    }
  }
)

Then(/^I validate the UI fields match the data config$/, async function () {
  const testData = require('../../../WDIO_Defra/data.js') // or load dynamically

  for (const fieldName in testData) {
    const expectedValue = testData[fieldName]

    const dt = await SecurePage.getFieldName(fieldName)
    await expect(dt).toBeDisplayed()

    const dd = await SecurePage.getFieldValue(fieldName)
    await expect(dd).toBeDisplayed()

    const actualValue = (await dd.getText()).trim()
    logger.info(
      `Validating ${fieldName}: expected = ${expectedValue}, actual = ${actualValue}`
    )
    await expect(actualValue).toBe(expectedValue)
  }
})

Then(
  /^I validate that Payment documents table is displayed$/,
  async function () {
    try {
      const isPaymentTablePresent = await (
        await SecurePage.getpaymentdocsTable()
      ).isExisting()
      if (!isPaymentTablePresent) {
        logger.info(`Payment document table is displayed`)
      }
    } catch (e) {
      throw new Error(`Error validating table: ${e?.message || e}`)
    }
  }
)

Then(/^I click sort link in the Payment table$/, async function () {
  try {
    await (await SecurePage.getdropdown()).click()
    logger.info('Sort link is clicked.')
  } catch (e) {
    throw new Error(`'Sort' link is not available:  ${e?.message || e}`)
  }
})

Then(/^I select the year "(.+)" from the dropdown$/, async function (year) {
  try {
    const financialYearDropdown = SecurePage.getdropdown()

    await financialYearDropdown.waitForDisplayed()
    await financialYearDropdown.click()

    // For standard <select> element
    if ((await financialYearDropdown.getTagName()) === 'select') {
      await financialYearDropdown.selectByVisibleText(year)
    } else {
      // For custom dropdown (li options)
      const option = await $(
        `//option[normalize-space(.)="${year}"] | //li[normalize-space(.)="${year}"]`
      )
      await option.waitForDisplayed()
      await option.click()
    }

    const selectedValue = await financialYearDropdown.getValue()
    logger.info(`Selected year: ${selectedValue}`)
    logger.info(`Financial year "${year}" selected successfully.`)
  } catch (e) {
    throw new Error(`Failed to select financial year: ${e?.message || e}`)
  }
})

Then(
  /^I click on "([^"]+)" link in the table for "([^"]+)"$/,
  async (linkText, rowText) => {
    // XPath to locate the table
    const tableXPath = `//*[@id="main-content"]/table`

    // Find all rows in the table body
    const rows = await $$(`${tableXPath}/tbody/tr`)

    let clicked = false

    for (let i = 1; i <= rows.length; i++) {
      // Locate the cell text for each row
      const cellXPath = `${tableXPath}/tbody/tr[${i}]`
      const rowElement = await $(cellXPath)

      // Check if this row contains the specified rowText (e.g. "letter Q1")
      const rowContent = await rowElement.getText()

      if (rowContent.includes(rowText)) {
        // Within that row, find the link with the given linkText (e.g. "View")
        const linkXPath = `${cellXPath}//a[normalize-space(text())='${linkText}']`
        const link = await $(linkXPath)

        await link.waitForDisplayed({ timeout: 5000 })
        await link.click()

        clicked = true
        break
      }
    }

    if (!clicked) {
      throw new Error(
        `Could not find link "${linkText}" for row containing "${rowText}"`
      )
    }
  }
)

Then(
  /^I click on "([^"]+)" link in the table for "([^"]+)" and validate PDF opens$/,
  async (linkText, rowText) => {
    // XPath to locate the table
    const tableXPath = `//*[@id="main-content"]/table`

    // Find all rows in the table body
    const rows = await $$(`${tableXPath}/tbody/tr`)

    let clicked = false
    const originalWindow = await browser.getWindowHandle()

    for (let i = 1; i <= rows.length; i++) {
      const cellXPath = `${tableXPath}/tbody/tr[${i}]`
      const rowElement = await $(cellXPath)
      const rowContent = await rowElement.getText()

      if (rowContent.includes(rowText)) {
        const linkXPath = `${cellXPath}//a[normalize-space(text())='${linkText}']`
        const link = await $(linkXPath)

        await link.waitForDisplayed({ timeout: 5000 })
        await link.click()

        // Wait for the new tab to appear
        await browser.waitUntil(
          async () => (await browser.getWindowHandles()).length > 1,
          {
            timeout: 5000,
            timeoutMsg: 'Expected a new tab to open'
          }
        )

        // Switch to the new tab
        const windowHandles = await browser.getWindowHandles()
        const newTabHandle = windowHandles.find(
          (handle) => handle !== originalWindow
        )
        await browser.switchToWindow(newTabHandle)

        // Validate PDF opened by checking URL
        const currentUrl = await browser.getUrl()
        logger.info('PDF Tab URL:', currentUrl)
        if (!currentUrl.includes('.pdf')) {
          throw new Error(`Expected PDF to open, but URL is: ${currentUrl}`)
        }

        // Close the PDF tab
        await browser.closeWindow()

        // Switch back to the main/original window
        await browser.switchToWindow(originalWindow)

        clicked = true
        break
      }
    }

    if (!clicked) {
      throw new Error(
        `Could not find link "${linkText}" for row containing "${rowText}"`
      )
    }
  }
)

Then(
  /^I validate banner with text "(.+)" on the page$/,
  async (expectedText) => {
    try {
      const bannerElement = SecurePage.getBanner() // use a fixed selector for the banner
      await expect(bannerElement).toBeDisplayed()

      const actualText = await bannerElement.getText()
      const normalizedActualText = actualText.replace(/\s+/g, ' ').trim()
      const normalizedExpectedText = expectedText.replace(/\s+/g, ' ').trim()

      expect(normalizedActualText).toContain(normalizedExpectedText)
      logger.info(`Beta banner is displayed: ${expectedText}`)
    } catch (e) {
      throw new Error(`Banner text validation failed - ${e?.message || e}`)
    }
  }
)

Then(/^log all grid titles$/, async () => {
  const gridTitles = await SecurePage.getGridItemTexts()

  logger.info('\n🔹 Grid Titles Found:')
  gridTitles.forEach((title, index) => {
    logger.info(`  ${index + 1}: ${title}`)
  })
})

Then(
  /^the grid titles should match the following: (.*)$/,
  async (expectedCSV) => {
    const expected = expectedCSV.split(',').map((e) => e.trim())

    const actual = await SecurePage.getGridItemTexts()

    logger.info('Grid Titles Found:', actual)
    logger.info('Expected:', expected)
    logger.info('Actual:', actual)

    assert.strictEqual(actual.length, expected.length, 'Grid count mismatch')

    for (let i = 0; i < expected.length; i++) {
      assert.strictEqual(
        actual[i],
        expected[i],
        `Mismatch at index ${i}: expected "${expected[i]}", got "${actual[i]}"`
      )
    }
  }
)

Then(
  /^I fill in the new bank details in the New bank account details page$/,
  async () => {
    try {
      const AccountNameInput = await SecurePage.getinputbyid('accountName')
      await AccountNameInput.waitForExist({ timeout: 10000 })
      await AccountNameInput.setValue(dataConfig.validdata.accountname)

      const SortcodeInput = await SecurePage.getinputbyid('sortCode')
      await SortcodeInput.waitForExist({ timeout: 10000 })
      await SortcodeInput.setValue(dataConfig.validdata.sortcode)

      const AccountnumberInput = await SecurePage.getinputbyid('accountNumber')
      await AccountnumberInput.waitForExist({ timeout: 10000 })
      await AccountnumberInput.setValue(dataConfig.validdata.accountnumber)

      logger.info('User entered new bank details@')
    } catch (e) {
      throw new Error(`Entry failed -  ${e?.message || e}`)
    }
  }
)

Then(
  /^I fill in the invalid inputs in the bank details in the New bank account details page$/,
  async () => {
    try {
      const AccountNameInput = await SecurePage.getinputbyid('accountName')
      await AccountNameInput.waitForExist({ timeout: 10000 })
      await AccountNameInput.setValue(dataConfig.invaliddatainput.accountname)

      const SortcodeInput = await SecurePage.getinputbyid('sortCode')
      await SortcodeInput.waitForExist({ timeout: 10000 })
      await SortcodeInput.setValue(dataConfig.invaliddatainput.sortcode)

      const AccountnumberInput = await SecurePage.getinputbyid('accountNumber')
      await AccountnumberInput.waitForExist({ timeout: 10000 })
      await AccountnumberInput.setValue(
        dataConfig.invaliddatainput.accountnumber
      )

      logger.info('User entered new bank details@')
    } catch (e) {
      throw new Error(`Entry failed -  ${e?.message || e}`)
    }
  }
)

Then(
  /^I fill in the invalid length bank details in the New bank account details page$/,
  async () => {
    try {
      const AccountNameInput = await SecurePage.getinputbyid('accountName')
      await AccountNameInput.waitForExist({ timeout: 10000 })
      await AccountNameInput.setValue(dataConfig.invaliddatalength.accountname)

      const SortcodeInput = await SecurePage.getinputbyid('sortCode')
      await SortcodeInput.waitForExist({ timeout: 10000 })
      await SortcodeInput.setValue(dataConfig.invaliddatalength.sortcode)

      const AccountnumberInput = await SecurePage.getinputbyid('accountNumber')
      await AccountnumberInput.waitForExist({ timeout: 10000 })
      await AccountnumberInput.setValue(
        dataConfig.invaliddatalength.accountnumber
      )

      logger.info('User entered new bank details@')
    } catch (e) {
      throw new Error(`Entry failed -  ${e?.message || e}`)
    }
  }
)

Then(
  /^I do not enter any bank details in the New bank account details page$/,
  async () => {
    try {
      const AccountNameInput = await SecurePage.getinputbyid('accountName')
      await AccountNameInput.waitForExist({ timeout: 10000 })
      await AccountNameInput.setValue(dataConfig.blankdata.accountname)

      const SortcodeInput = await SecurePage.getinputbyid('sortCode')
      await SortcodeInput.waitForExist({ timeout: 10000 })
      await SortcodeInput.setValue(dataConfig.blankdata.sortcode)

      const AccountnumberInput = await SecurePage.getinputbyid('accountNumber')
      await AccountnumberInput.waitForExist({ timeout: 10000 })
      await AccountnumberInput.setValue(dataConfig.blankdata.accountnumber)

      logger.info('User entered new bank details@')
    } catch (e) {
      throw new Error(`Entry failed -  ${e?.message || e}`)
    }
  }
)

Then('I should see a field error message {string}', (s) => {
  // Write code here that turns the phrase above into concrete actions
})

// When(/^I enter "([^"]*)" as account name$/, async (accountName) => {
//  await SecurePage.accountNameInput.addValue(accountName)
// })

// When(/^I enter "([^"]*)" as sort code$/, async (sortCode) => {
//  await SecurePage.sortCodeInput.addValue(sortCode)
// })

// When(/^I enter "([^"]*)" as account number$/, async (accountNumber) => {
//  await SecurePage.accountNumberInput.addValue(accountNumber)
// })

Then(/^I should see inline errors for the fields$/, async () => {
  const expectedInlineErrors = {
    Name: 'Enter your name',
    Code: 'Enter a valid code',
    Number: 'Enter a valid number'
  }

  const fieldToElementMap = {
    Name: SecurePage.NameInlineError,
    Code: SecurePage.CodeInlineError,
    Number: SecurePage.NumberInlineError
  }

  for (const [field, expectedText] of Object.entries(expectedInlineErrors)) {
    const errorElement = fieldToElementMap[field]

    await expect(errorElement).toBeDisplayed()
    await expect(errorElement).toHaveText(expectedText)
  }
})

Then(/^I should see an error summary at the top of the page$/, async () => {
  // Validate summary heading
  await expect(SecurePage.errorSummaryHeading).toBeDisplayed()

  await expect(SecurePage.errorSummaryHeading).toHaveText('There is a problem')

  // Expected errors
  const expectedErrors = [
    'Enter your first name',
    'Enter your last name',
    'Enter a valid email address'
  ]

  // Get actual errors
  const actualErrors = await Promise.all(
    (await SecurePage.errorMessages).map((el) => el.getText())
  )

  // Exact match (order matters)
  await expect(actualErrors).toEqual(expectedErrors)
})

Then(
  /^I should see "([^"]*)" inline for "([^"]*)"$/,
  async (expectedError, field) => {
    let errorElement

    switch (field) {
      case 'accountName':
        errorElement = SecurePage.accountNameInlineError
        break
      case 'sortCode':
        errorElement = SecurePage.sortCodeInlineError
        break
      case 'accountNumber':
        errorElement = SecurePage.accountNumberInlineError
        break
      default:
        throw new Error(`Unknown field: ${field}`)
    }

    await expect(errorElement).toBeDisplayed()
    await expect(errorElement).toHaveText(expectedError)
  }
)

Then(
  /^I should {2}"([^"]*)" at the top of the page$/,
  async (expectedError) => {
    await expect(SecurePage.errorSummary).toBeDisplayed()
    await expect(SecurePage.errorSummary).toHaveTextContaining(expectedError)
  }
)

/// //////////DOC STEPOS FOR TESTING//////////////////

Then(/^I validate that table is displayed$/, async function () {
  try {
    const table = await SecurePage.getdocsTable()
    const isTablePresent = await table.isExisting()

    if (isTablePresent) {
      logger.info('Table is displayed')

      // Get all document rows from the table
      const rows = await $$('//table//tbody//tr')

      logger.info(`Total documents found: ${rows.length}`)

      for (let i = 0; i < rows.length; i++) {
        const docName = await rows[i].getText()
        logger.info(`Document ${i + 1}: ${docName}`)
      }
    } else {
      logger.info('Table not present, validating empty state message')

      const noTableMsg = await SecurePage.getNoTableMessage()
      const messageText = await noTableMsg.getText()

      const expectedMessage = 'text no table present.'

      if (messageText !== expectedMessage) {
        throw new Error(
          `Expected message "${expectedMessage}" but found "${messageText}"`
        )
      }

      logger.info(`Validated message: ${messageText}`)
    }
  } catch (e) {
    throw new Error(`Error validating table: ${e?.message || e}`)
  }
})

Then(
  /^I capture all document names and download each document$/,
  { timeout: 60000 },
  async function () {
    const rows = await $$('//*[@id="main-content"]/table/tbody/tr')
    this.documentsList = []

    for (const row of rows) {
      // Capture document name (td[2])
      const docNameElement = await row.$('.//td[2]')
      const docName = await docNameElement.getText()

      this.documentsList.push(docName)
      logger.info(`Captured document:------ ${docName}`)

      // Download link (td[3])
      const downloadLink = await row.$('.//td[3]//a')

      await downloadLink.scrollIntoView({ block: 'center' })
      await downloadLink.waitForClickable({ timeout: 10000 })
      await downloadLink.click()

      logger.info(`Clicked Download for document: ${docName}`)

      // await browser.pause(500)
    }

    logger.info(`Total documents processed:------ ${this.documentsList.length}`)
  }
)

Then(/^I validate and handle the warning state$/, async () => {
  try {
    const warningEl = await SecurePage.warningText()
    const warningText = (await warningEl.getText()).trim().toLowerCase()

    // console.log(`Warning text: ${warningText}`)

    if (warningText === 'confirmed') {
      // ✅ CONFIRMED FLOW
      // console.log('Status is CONFIRMED')

      const banner = await SecurePage.topBanner()
      await expect(banner).not.toBeDisplayed()
    } else if (warningText === 'unconfirmed') {
      // ⚠️ UNCONFIRMED FLOW
      // console.log('Status is UNCONFIRMED')

      const banner = await SecurePage.topBanner()
      await expect(banner).toBeDisplayed()

      // Click Confirm link
      await (await SecurePage.confirmLink()).click()

      // Validate navigation to confirm page
      await expect(browser).toHaveUrlContaining('confirm')

      // Select checkbox
      await (await SecurePage.getcheckboxid()).click()

      // Click Continue
      await (await SecurePage.continueButton()).click()

      // Navigate back (Details page)
      await (await SecurePage.detailsLink()).click()

      // Validate updated warning text
      const updatedText = (await (await SecurePage.warningText()).getText())
        .trim()
        .toLowerCase()

      await expect(updatedText).toBe('confirmed')
      // console.log('Status updated to CONFIRMED')
    } else {
      throw new Error(`Unexpected warning text: ${warningText}`)
    }
  } catch (e) {
    throw new Error(`Step failed: ${e?.message || e}`)
  }
})

Then(/^I download and view each document sequentially$/, async function () {
  if (!this.documentsList || this.documentsList.length === 0) {
    throw new Error('No documents captured from the table')
  }

  const originalWindow = await browser.getWindowHandle()
  const rows = await $$('//*[@id="main-content"]/table/tbody/tr')

  for (const docName of this.documentsList) {
    logger.info(`Processing document:----- ${docName}`)

    for (const row of rows) {
      const name = await row.$('./td[1]').getText()

      if (name === docName) {
        // ----- Download -----
        const downloadLink = await row.$('./td[2]//a')
        await downloadLink.waitForClickable({ timeout: 5000 })
        await downloadLink.click()
        logger.info(`Download triggered for:----- ${docName}`)

        // Optional: wait for file to be downloaded (if needed)
        // await browser.pause(2000)

        // ----- View (PDF) -----
        const viewLink = await row.$('./td[3]//a')
        await viewLink.waitForClickable({ timeout: 5000 })
        await viewLink.click()

        // Wait for the new tab
        await browser.waitUntil(
          async () => (await browser.getWindowHandles()).length > 1,
          { timeout: 5000, timeoutMsg: 'Expected a new tab to open for PDF' }
        )

        const handles = await browser.getWindowHandles()
        const newTab = handles.find((h) => h !== originalWindow)
        await browser.switchToWindow(newTab)

        const url = await browser.getUrl()
        logger.info(`Opened PDF URL: ${url}`)

        if (!url.includes('.pdf')) {
          throw new Error(`Expected PDF but opened: ${url}`)
        }

        // Close PDF tab and return to main
        await browser.closeWindow()
        await browser.switchToWindow(originalWindow)

        // Break inner loop to go to next document
        break
      }
    }
  }

  logger.info(`All documents processed: ${this.documentsList.join(', ')}`)
})
