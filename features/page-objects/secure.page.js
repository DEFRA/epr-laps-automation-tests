import { $ } from '@wdio/globals'
import Page from './page.js'
/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends Page {
  get flashAlert() {
    return $('#flash')
  }

  // getLink(linkText) {
  //  return $(`//a[contains(.,'${linkText}')] | //a[contains(text(),'${linkText}')]`
  //  )
  // }

  getLink(linkText) {
    // If the text contains a single quote, use concat() to safely build the XPath literal
    const safeText = linkText.includes("'")
      ? `concat('${linkText.replace(/'/g, `', "'", '`)}')`
      : `'${linkText}'`

    return $(
      `//a[contains(., ${safeText})] | //a[contains(text(), ${safeText})] | //span[contains(., ${safeText})] | //span[contains(text(), ${safeText})]`
    )
  }

  getButton(buttonText, sectionTitle) {
    if (sectionTitle) {
      return $(
        `//*[@id="main-content"]//h2[contains(text(), "${sectionTitle}")]/following::button[contains(text(), "${buttonText}")][1] | //*[@id="main-content"]//button[contains(text(), "${buttonText}")]`
      )
    } else {
      return $(
        `//*[@id="main-content"]//button[contains(text(), "${buttonText}")] | //*[@id="continueReplacement"] | //*[@id="main-content"]//a[contains(normalize-space(text()),"${buttonText}")]`
      )
    }
  }

  getbuttonlogin() {
    return $(`//*[@id="sysverb_login"]`)
  }

  getTextbox() {
    return $(`//*[@id="replacementEmail"]`)
  }

  getHeader(pageName) {
    return $(
      `//*[@id="main-content"]//h1[normalize-space(.)='${pageName}'] | //*[@id="main-content"]//h1['${pageName}'] |//*[@id="main-content"]//span[contains(text(),'${pageName}')]| //*[contains(@class,'govuk-heading-m')] | //*[@id="main-content"]/span[normalize-space(.)='${pageName}']|//*[@id="main-content"]/h1 |//*[contains(@class,'govuk-heading-m') and contains(.,'${pageName}')]|//*[@id="main-content"]//span[contains(text(),'${pageName}')]`
    )
  }

  paraText(paraName) {
    return $(
      `//*[@id="main-content"]//p[contains(normalize-space(.),"${paraName}")]|//*[@id="main-content"]//span[contains(normalize-space(.),"${paraName}")] | //*[@id="main-content"]//h1[normalize-space(.)='${paraName}']`
    )
  }

  warningText(paraName) {
    return $(
      `//*[@id="main-content"]//strong[contains(normalize-space(text()),"${paraName}")] | //*[@id="main-content"]//strong[contains(normalize-space(.),"${paraName}")]`
    )
  }

  getErrormessagelist() {
    return $$('//ul/li/a')
  }

  get globalErrorMessages() {
    return $$('//ul/li/a')
  }

  get fieldErrorMessages() {
    return $$('//form//fieldset//div/p')
  }

  // Methods to get their text content

  async getAllGlobalErrors() {
    const elements = this.globalErrorMessages
    return Promise.all(elements.map((el) => el.getText()))
  }

  async getAllFieldErrors() {
    const elements = this.fieldErrorMessages
    return Promise.all(elements.map((el) => el.getText()))
  }

  getinputbyid(id) {
    return $(`//input[@id='${id}'] | //*[@id="replacementEmail"]`)
  }

  getdropdownLink(option) {
    const linkWithAnchor = $(
      `//div[@class='dropdown-menu small show']//button[contains(text(),'${option}')]`
    )
    return linkWithAnchor
  }

  getdropdown() {
    return $('#sort')
  }

  getFieldName(fieldName) {
    return $(
      `//*[@id="main-content"]//dl//div[dt[contains(@class, "summary-list__key") and normalize-space(.)='${fieldName}']]//dt | //table//tr[th[normalize-space(.)='${fieldName}']]/th`
    )
  }

  // Returns the matching <dd> value that is a sibling of the above <dt>
  getFieldValue(fieldName) {
    return $(
      `//*[@id="main-content"]//dl//div[dt[contains(@class, "summary-list__key") and normalize-space(.)='${fieldName}']]//dd[contains(@class, "summary-list__value")] | //table//tr[th[normalize-space(.)='${fieldName}']]/td`
    )
  }

  getpaymentdocsTable() {
    return $(`//*[@id="main-content"]/table`)
  }

  getBanner() {
    return $('/html/body/div/div[1]/p')
  }

  getCard() {
    return $("//div[@id='root']//div[@class='p-AccordionButtonContent']")
  }

  getGridItemTexts() {
    return $$(`//*[@id="main-content"]//h2/a`).map((el) => el.getText())
  }

  async getGridItems() {
    const items = await $$(`//*[@id="main-content"]//h2/a`)

    // Log number of items found

    if (!items || typeof items.map !== 'function') {
      throw new Error(
        'Expected items to be an array-like object with map(), but got: ' +
          typeof items
      )
    }

    return await Promise.all(items.map((el) => el.getText()))
  }
}

export default new SecurePage()
