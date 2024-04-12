
describe('Zoom In/Out on Canvas', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('Vuze'));
        cy.loginVuze();
    });

    it('Test the testing data', () => {
        cy.contains('CLOT').should('be.visible').click({ force: true }).wait(2000);
        cy.get('#inputCluster').type('TN-CHNN-0013');
        cy.contains('Search').click({ force: true }).wait(20000);
        cy.get('tbody>tr').eq(1).click({ force: true }).wait(2000);
        cy.get('[id="mapControlShowButton"]').click();
        cy.get('[ng-checked="mapCondition.isCluster"]').check({ force: true }).wait(2000);
        cy.get('[id="mapControlHideButton"]').click().wait(2000);
        cy.get('[class="k-icon k-collapse-prev k-i-arrow-60-left"]').eq(0).click().wait(3000);
        cy.get('[class="k-icon k-collapse-next k-i-arrow-60-down"]').click().wait(3000);

        // Retry until the canvas element is found
        cy.get('#CustomLayer_12', { timeout: 10000 }).should('exist')     //.then(($canvas) => {
        

        const latitude = 40.7128; // Example latitude (New York City)
        const longitude = -74.0060; // Example longitude (New York City)

       
        cy.get('[ng-model="gpsInput.lat"]').type(`${latitude}`);
        cy.get('[ng-model="gpsInput.lon"]').type(`${longitude}`);
        cy.get('[ng-click="pinPointGo()"]').click().wait(2000);

        //     const canvas = $canvas[0];
        //     const ctx = canvas.getContext('2d');
        //     if (!ctx) {
        //         throw new Error('Canvas context not available');
        //     }

        //     // Get the center of the canvas
        //     const centerX = canvas.width / 2;
        //     const centerY = canvas.height / 2;

        //     // Translate to the center
        //     ctx.translate(centerX, centerY);

        //     // Zoom In
        //     const scaleFactor = 1.1; // Increase scale by 10%
        //     ctx.scale(scaleFactor, scaleFactor);

        //     // Translate back
            // ctx.translate(-centerX, -centerY);

            cy.screenshot('ZoomIn', { capture: 'fullPage' });

            // // screenshot will be clipped 20px from the top and left to the dimensions 400px x 300px
            // cy.screenshot({ clip: { x: 20, y: 20, width: 400, height: 300 } })
            
        });
    });
