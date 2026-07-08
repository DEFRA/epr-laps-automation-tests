class Changeorganisation {
  // Page Heading
  get pageHeading() {
    return $('//*[@id="resultsTable"]/ancestor::fieldset/legend//h1')
  }

  // Table containing radio buttonsss
  get resultsTable() {
    return $('//*[@id="resultsTable"]/div')
  }

  // All radio buttons
  get radioButtons() {
    return $$('//input[@type="radio"]')
  }

  // All labels associated with radio buttons
  get radioLabels() {
    return $$('//*[@id="resultsTable"]//label')
  }

  // Continue button
  get continueButton() {
    return $('//*[@id="continueReplacement"]')
  }

  // Heading on second page
  get homePageHeading() {
    return $('#main-content h1')
  }

  async getSelectedPageHeading() {
    return await this.homePageHeading.getText()
  }

  // Change link
  getNavigationLink(linkText) {
    return $(`//*[@id="navigation"]//a[normalize-space()='${linkText}']`)
  }

  async clickChange() {
    await this.getNavigationLink('Change organisation').click()
  }

  async getAllRadioNames() {
    const labels = await this.radioLabels

    const names = []

    for (const label of labels) {
      names.push((await label.getText()).trim())
    }

    return names
  }

  async selectRadioByIndex(index) {
    const radios = await this.radioButtons
    await radios[index].click()
  }

  async waitForPageToLoad() {
    await this.resultsTable.waitForDisplayed({ timeout: 10000 })
  }
}

export default new Changeorganisation()
