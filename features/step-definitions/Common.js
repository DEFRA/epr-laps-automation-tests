export async function setValue(element, value) {
  await clickElement(element)
  await element.setValue(value)
}

export async function clickElement(element) {
  await element.click()
}

export async function iselementPresent(element) {
  await element.waitForDisplayed({ timeout: 20000 })
}

// export async function setValueforfield(fieldName:any,value:any){
//    await (await SecurePage.getLabel(fieldName)).waitForDisplayed({timeout:20000});
//    await clickElement(await SecurePage.dropdownfieldName(fieldName))
//    const select = await SecurePage.dropdownfieldName(fieldName)
//     select.selectbyvisibletext(value)
// };
// // eg: await setValueforfield('AMLD Outcome',amldoutcomevalue)

// export async function selectfromVisibletext(element:any,value:any){
//    await iselementPresent(await SecurePage.getlabel(element));
//    await (await SecurePage.dropdownfield(element)).selectbyVisibletext(value);
// }

// export async function setFieldValue(element:any,value: any) {
//  await clickElement(element)
// await browser.keys(['Control','a']);
// await browser.keys('Delete');
//      await element.setValue(value);
// };

export async function isElementPresent(element) {
  await element.waitForDisplayed({ timeout: 20000 })
}

// export async function expectToBeTrueFalse(element: any, expectedOutcome: boolean) {
// if (expectedOutcome) {
//    await element.waitForDisplayed({timeout: 20000});
//    expect(await element.isDisplayed()).toBe(true);
//    } else {
//        await element.waitForDisplayed({timeout: 20000, reverse: true});
//        expect(await element.isDisplayed()).toBe(false);
//    }
// };

export async function isElementEnabled(element) {
  await element.waitForDisplayed({ timeout: 20000 })
  return await element.isEnabled()
}
