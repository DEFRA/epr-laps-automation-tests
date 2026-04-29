// import * as path from 'path';
// src/config/dataConfig.ts

// function generateConfig(){
//   const envValue=`${process.env.node_env}`
//   return{
//     home: 'https://www.gov.uk/government/organisations/department-for-environment-food-rural-affairs',
//     devHome: `https://${envValue}-www.gov.uk/government/organisations/department-for-environment-food-rural-affairs`,

//   };}
//   const dataConfig = generateConfig();
//   export {dataConfig};

export const dataConfig = {
  expectedUrls: {
    home: 'https://www.gov.uk/government/organisations/department-for-environment-food-rural-affairs', // key must match pageName exactly
    dashboard: 'https://example.com/dashboard',
    herokuapp: 'https://laps-prototype-v2-c806840ce211.herokuapp.com/',
    EPage: 'https://eprsit.service-now.com/gsp?sysparm_use_polaris=false',
    stripe:
      'https://invoice.stripe.com/i/acct_1RLkuI03qokYrBOZ/test_YWNjdF8xUkxrdUkwM3Fva1lyQk9aLF9Td2NiR1JoMUN6OUdGd2dra2s4NHlFQlRKdlFnMGpPLDE0Njg0MTk1Ng0200V5phMMrF?s=ap',
    test: 'https://epr-laps-frontend.test.cdp-int.defra.cloud/',
    // test: 'https://dcidmtest.b2clogin.com/dcidmtest.onmicrosoft.com/oauth2/authresp',
    dev: 'https://epr-laps-frontend.dev.cdp-int.defra.cloud/',
    confirmBankdetails:
      'https://epr-laps-frontend.test.cdp-int.defra.cloud/confirm?lang=en',
    updateBankdetails:
      'https://epr-laps-frontend.test.cdp-int.defra.cloud/update-bank-details?lang=cy',
    checkBankdetails:
      'https://epr-laps-frontend.test.cdp-int.defra.cloud/check-bank-details?lang=en',
    submitBankdetails:
      'https://epr-laps-frontend.test.cdp-int.defra.cloud/bank-details-submitted?lang=en'
  },

  credentials: {
    // Norfolk //
    confirmedCEO: 'aruna.krishnamurthy+NWAutomation@accenture.com',
    confirmedHOF: 'aruna.krishnamurthy+nwhof@accenture.com',
    confirmedHOW: 'aruna.krishnamurthy+NWCHoW@accenture.com',
    confirmedWO: 'aruna.krishnamurthy+NWCWO@accenture.com',
    confirmedFO: 'aruna.krishnamurthy+NWCFO@accenture.com',

    // Devon //
    unconfirmedCEO: 'juhi.upreti@accenture.com',
    unconfirmedHOF: 'juhi.upreti+hof@accenture.com',
    unconfirmedHOW: 'aruna.krishnamurthy+devonhow@accenture.com',
    unconfirmedWO: 'aruna.krishnamurthy+devonfowo@accenture.com',
    unconfirmedFO: 'aruna.krishnamurthy+devonfowo@accenture.com',
    // Non Wales //
    ChangeHoFuser: 'aruna.krishnamurthy+testhof@accenture.com',
    ChangeFOuser: 'aruna.krishnamurthy+foadmin@accenture.com',
    // Wales //
    ChangeHOFuser_Wales: 'aruna.krishnamurthy+foadmin@accenture.com',
    // Wales //
    confirmedWalesCEO: 'juhi.upreti+wales@accenture.com',
    confirmedWalesHoF: 'tobi.omoyeni+hofpowys@accenture.com',
    confirmedWalesHOW: 'aruna.krishnamurthy+NWCHoW@accenture.com',
    confirmedWalesWO: 'aruna.krishnamurthy+NWCWO@accenture.com',
    confirmedWalesFO: 'aruna.krishnamurthy+NWCFO@accenture.com',
    // Wales //
    unconfirmedWalesCEO: 'aruna.krishnamurthy+e2ewales@accenture.com',
    unconfirmedWalesHoF: 'tobi.omoyeni+hofpo@accenture.com',
    unconfirmedWalesHOW: 'aruna.krishnamurthy+devonhow@accenture.com',
    unconfirmedWalesWO: 'aruna.krishnamurthy+devonfowo@accenture.com',
    unconfirmedWalesFO: 'aruna.krishnamurthy+devonfowo@accenture.com'
  },

  validdata: {
    accountname: 'Local authority council used for testing',
    sortcode: '12 34 56',
    accountnumber: '12345678'
  },

  invaliddatalength: {
    accountname: 'local authority for test',
    sortcode: '12345634378',
    accountnumber: 'abcdefgfrs32423hi'
  },
  invaliddatainput: {
    accountname: 'y  ',
    sortcode: '68',
    accountnumber: '14'
  },
  blankdata: {
    accountname: '',
    sortcode: '',
    accountnumber: ''
  },

  testData: {
    searchKeyword: 'webdriverio',
    expectedTitle: 'Example Domain'
  },

  clientsecrets: {
    CLIENT_ID: '09b1ad42-fd28-4480-9e70-5444ab2ce7a8',
    CLIENT_SECRET: '8474ea0f-237c-4661-b90f-0d2301969d3f',
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIwOWIxYWQ0Mi1mZDI4LTQ0ODAtOWU3MC01NDQ0YWIyY2U3YTgiLCJpYXQiOjE3NzE2MDEyMTd9.3Klm4psmDMqH64pNO0RJ7V7M3J7_OfdyJt8EjH-qbYc'
  }
}
