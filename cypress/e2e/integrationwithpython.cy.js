describe("Check the integration with the cypress", () => {
    it("Check the integration with the cypress", () => {
      cy.exec('cypress/test.py', { failOnNonZeroExit: false }).then((data) => {
        cy.log(data.stdout)
      })
    })
  })