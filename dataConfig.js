export const dataConfig = {
  expectedUrls: {
    test: 'https://epr-laps-frontend.test.cdp-int.defra.cloud/',
    // test: 'https://epr-laps-frontend.ext-test.cdp.defra.gov.uk/',
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
    confirmedHOF: 'aruna.krishnamurthy+nwchof@accenture.com',
    confirmedHOW: 'aruna.krishnamurthy+nwHOW@accenture.com',
    confirmedWO: 'aruna.krishnamurthy+NWWO@accenture.com',
    confirmedFO: 'aruna.krishnamurthy+NWFO@accenture.com',

    // Manchester //
    unconfirmedCEO: 'ManchesterCEO@defradev.onmicrosoft.com',
    unconfirmedHOF: 'ManchesterHOF@defradev.onmicrosoft.com',
    unconfirmedHOW: 'ManchesterHOW@defradev.onmicrosoft.com',
    unconfirmedWO: 'ManchesterWO@defradev.onmicrosoft.com',
    unconfirmedFO: 'ManchesterFO@defradev.onmicrosoft.com',

    // Non Wales - Surrey County Council //
    ChangeHoFuser: 'fifeHOF@defradev.onmicrosoft.com',
    ChangeFOuser: 'FalkirkFO@defradev.onmicrosoft.com',

    // Wales - Conwy County Borough Council //
    ChangeHOFuser_Wales: 'aruna.krishnamurthy+testing@accenture.com',

    // Wales - Powys County Council//
    unconfirmedWalesCEO: 'juhi.upreti+wales@accenture.com',
    unconfirmedWalesHoF: 'arnab.a.dhar@accenture.com',
    unconfirmedWalesHOW: 'tobi.omoyeni+howpowys@accenture.com',
    unconfirmedWalesWO: 'tobi.omoyeni+wopowys@accenture.com',
    unconfirmedWalesFO: 'tobi.omoyeni+testfopowys@accenture.com',

    // Wales - Torfaen Council //
    confirmedWalesCEO: 'TorfaenCEO@defradev.onmicrosoft.com',
    confirmedWalesHoF: 'TorfaenHOF@defradev.onmicrosoft.com',
    confirmedWalesHOW: 'TorfaenHOW@defradev.onmicrosoft.com',
    confirmedWalesWO: 'TorfaenWO@defradev.onmicrosoft.com',
    confirmedWalesFO: 'TorfaenFO@defradev.onmicrosoft.com',

    // changeorganisation
    changeorguser: 'hampshireCEO@defradev.onmicrosoft.com'
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
    // POSTMAN_IDM_CLIENT_ID: process.env.POSTMAN_IDM_CLIENT_ID,
    // POSTMAN_IDM_CLIENT_SECRET: process.env.POSTMAN_IDM_CLIENT_SECRET,
    // POSTMAN_IDM_ACCESS_TOKEN: process.env.POSTMAN_IDM_ACCESS_TOKEN
  }
}
