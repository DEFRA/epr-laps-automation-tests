import { Given, When, Then } from '@wdio/cucumber-framework'
// const { Given, When, Then } = require('@wdio/cucumber-framework');
import { expect, browser } from '@wdio/globals'
import * as path from 'path'
import SecurePage from '../page-objects/secure.page.js'

import { clickElement, setValue } from './Common.js'
import LoginPage from '../page-objects/login.page.js'
import { dataConfig } from '../../dataConfig.js'
import logger from '../../logger.js'
import * as fs from 'fs'
import allureReporter from '@wdio/allure-reporter'
import assert from 'assert'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

Given(/^I am on the home page$/, async () => {
  await browser.maximizeWindow()
  await browser.url(dataConfig.expectedUrls.dev)

  const screenshot = await browser.takeScreenshot()
  allureReporter.addAttachment('Screenshot', screenshot, 'image/png')
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

When(/^I click "(.+)" link$/, async (linkText) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const reportsDir = path.resolve(__dirname, '../../reports')

  // Ensure reports directory exists
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true })
  }

  const fileName = `click_${linkText}_${timestamp}.png`
  const filePath = path.join(reportsDir, fileName)

  try {
    const link = await SecurePage.getLink(linkText)
    await link.click()
    logger.info(`Clicked the link: ${linkText}`)
  } catch (error) {
    logger.info(`Failed to click the link: ${linkText}`)
    await browser.saveScreenshot(filePath)
    logger.info(`Screenshot saved (on error) to ${filePath}`)
    throw error
  }

  // Also take screenshot on success
  await browser.saveScreenshot(filePath)
  logger.info(`Screenshot saved (on success) to ${filePath}`)
})

Then(/^I fill in the email address for "(.+)"$/, async (user) => {
  await enterEmailAddress(user)
})

async function enterEmailAddress(user) {
  const userEmailInput = await SecurePage.getinputbyid('user_name')
  await userEmailInput.waitForExist({ timeout: 10000 })

  let email

  if (user === 'CEO') {
    email = dataConfig.credentials.ceoemail
  } else if (user === 'CEO_UnconfirmedBankdetails') {
    email = dataConfig.credentials.unconfirmedceoemail
  } else if (user === 'HOF') {
    email = dataConfig.credentials.hofemail
  } else if (user === 'HOF_UnconfirmedBankdetails') {
    email = dataConfig.credentials.unconfirmedhofemail
  } else if (user === 'HOW') {
    email = dataConfig.credentials.howemail
  } else {
    throw new Error(`No email configured for user: ${user}`)
  }

  await userEmailInput.setValue(email)
  logger.info(`Email entered for ${user}: ${email}`)
}

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
    const textElement = SecurePage.paraText(paraName)
    await expect(textElement).toBeDisplayed()
  } catch (e) {
    throw new Error(`Message not displayed" -  ${e?.message || e}`)
  }
})

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

Then(
  'I do not enter any bank details in the New bank account details page',
  () => {
    // Write code here that turns the phrase above into concrete actions
  }
)

Then('I should see a field error message {string}', (s) => {
  // Write code here that turns the phrase above into concrete actions
})

Then(
  'I do not enter any bank details in the New bank account details page',
  () => {
    // Write code here that turns the phrase above into concrete actions
  }
)

Then(
  'I fill in the invalid bank details in the New bank account details page',
  () => {
    // Write code here that turns the phrase above into concrete actions
  }
)
