  const { defineConfig } = require("cypress");

  module.exports = defineConfig({
    reporter: 'cypress-mochawesome-reporter',
    e2e: {
      baseUrl: 'https://devportal.safetyservicescompany.com/portal/login',
      setupNodeEvents(on, config) {
        require('cypress-mochawesome-reporter/plugin')(on);
        // implement node event listeners here
      },
    },


    // Added one more env for google map testing
    env:{
      Googlemap :'https://www.google.com/maps/@28.6031121,77.3668853,15z?entry=ttu',
      Vuze: 'https://vuze5g.jio.com/xro_rjil_5g/'
    },

    viewportHeight: 1080,
    viewportWidth: 1920,

  });