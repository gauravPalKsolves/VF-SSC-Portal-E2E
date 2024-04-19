module.exports = {
  //...
  e2e: {
    //...
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      // Add task for taking CSV screenshot
      on('task', {
        takeCsvScreenshot(csvContent) {
          // Implement your logic to take a screenshot of CSV data
          // For example:
          const screenshotPath = 'cypress/screenshots/CSV_Screenshot.png'; // Replace with actual screenshot path
          // Logic to capture screenshot
          return screenshotPath;
        },
      });

      // Add your test case preprocessor here if needed
    },
    //...
  },
  //...
};
