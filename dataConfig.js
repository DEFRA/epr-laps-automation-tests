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
    dev: 'https://epr-laps-frontend.test.cdp-int.defra.cloud/',
    ddev: 'https://epr-laps-frontend.dev.cdp-int.defra.cloud/'
  },

  credentials: {
    username: 'testuser',
    password: 'r3cycl3b1n',
    ceoemail: 'aruna.krishnamurthy@accenture.com',
    unconfirmedceoemail: 'dennis.effa.amponsah@accenture.com',
    unconfirmedhofemail: 'aruna.krishnamurthy+adminhof@accenture.com'
  },

  validdata: {
    accountname: 'Local authority council used for testing',
    sortcode: '12 34 56',
    accountnumber: '12345678'
  },

  invaliddatalength: {
    accountname: 'local authority for test',
    sortcode: '12345678',
    accountnumber: 'abcdefghi'
  },
  invaliddatainput: {
    accountname: 'y  ',
    sortcode: '678',
    accountnumber: '1234'
  },
  blankdata: {
    accountname: '',
    sortcode: '',
    accountnumber: ''
  },

  testData: {
    searchKeyword: 'webdriverio',
    expectedTitle: 'Example Domain'
  }
}
