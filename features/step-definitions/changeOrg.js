import { Then } from '@wdio/cucumber-framework'
import changeorganisation from '../page-objects/changeorganisation.js'
import { expect } from '@wdio/globals'
import logger from '../../logger.js'

Then('I all the available organisation options', async () => {
  await changeorganisation.resultsTable.waitForDisplayed({
    timeout: 10000
  })

  const options = await changeorganisation.radioButtons
  const names = await changeorganisation.getAllRadioNames()

  logger.info(
    `Found ${options.length} radio button options with names ${names}`
  )

  for (let i = 0; i < options.length; i++) {
    await changeorganisation.selectRadioByIndex(i)

    const selectedOption = names[i]

    logger.info(`Selected organisation option-----: ${selectedOption}`)

    await changeorganisation.continueButton.click()

    const heading = await changeorganisation.getSelectedPageHeading()

    await expect(heading).toContain(selectedOption)

    await changeorganisation.clickChange()

    await changeorganisation.resultsTable.waitForDisplayed({ timeout: 20000 })
  }
})

Then(
  'I validate all the available organisation options',
  { timeout: 120000 },
  async () => {
    await changeorganisation.resultsTable.waitForDisplayed({ timeout: 20000 })

    const names = await changeorganisation.getAllRadioNames()
    logger.info(`Found ${names.length} radio button options`)

    for (let i = 0; i < names.length; i++) {
      logger.info(`Processing option ${i + 1} of ${names.length}`)

      // Always re-sync to results page
      await changeorganisation.resultsTable.waitForDisplayed({ timeout: 20000 })

      // IMPORTANT: re-fetch fresh elements each iteration
      const radios = await $$('//input[@type="radio"]')
      const radio = radios[i]

      await radio.scrollIntoView()

      try {
        await radio.waitForClickable({ timeout: 10000 })
        await radio.click()
      } catch (err) {
        logger.warn(`Normal click failed, using JS click for radio index ${i}`)
        await browser.execute((el) => el.click(), radio)
      }

      const selectedOption = names[i]
      logger.info(`Selected org option: ${selectedOption}`)

      // Continue button
      const continueBtn = await changeorganisation.continueButton
      await continueBtn.waitForClickable({ timeout: 10000 })
      await continueBtn.click()

      logger.info('Continue button is clicked')

      // Lightweight debug (safe)
      try {
        logger.info(`Current URL: ${await browser.getUrl()}`)
        // await browser.pause(2000)
        logger.info(`Page title: ${await browser.getTitle()}`)
      } catch (err) {
        logger.warn(`Unable to fetch page details: ${err.message}`)
      }

      // Wait for next page heading
      const headingEl = await $('#main-content h1')

      await headingEl.waitForDisplayed({ timeout: 60000 })

      await browser.waitUntil(
        async () => {
          const text = await headingEl.getText()
          return Boolean(text && text.trim().length)
        },
        {
          timeout: 60000,
          interval: 500,
          timeoutMsg: 'Heading text not loaded'
        }
      )

      const heading = await headingEl.getText()

      logger.info(`Heading displayed: ${heading}`)

      expect(heading).toContain(selectedOption)

      logger.info(`Verified heading contains: ${selectedOption}`)

      //  if you need to navigate to bank details, payment, get help  you have to add the step here

      // Only go back if NOT last iteration
      if (i < names.length - 1) {
        logger.info(
          `Returning to results table for next iteration (${i + 2}/${names.length})`
        )

        await changeorganisation.clickChange()

        await changeorganisation.resultsTable.waitForDisplayed({
          timeout: 60000,
          interval: 500,
          timeoutMsg: 'Results table did not reappear'
        })
      } else {
        logger.info('Last option processed - exiting loop cleanly')
      }
    }

    logger.info(`Finished validating all ${names.length} options`)
  }
)
