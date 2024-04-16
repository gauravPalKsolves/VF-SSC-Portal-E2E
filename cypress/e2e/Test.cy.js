/// <reference types="cypress" />

import jsPDF from 'jspdf';

const fs = require('fs');
const path = require('path');
// const jsPDF = require('jspdf');



describe('Zoom In/Out on Canvas', () => {
    before(() => {
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
        cy.get('[class="k-icon k-collapse-prev k-i-arrow-60-left"]').eq(0).click().wait(4000);
        cy.get('[class="k-icon k-collapse-next k-i-arrow-60-down"]').click().wait(4000);

        // Retry until the canvas element is found
        cy.get('#CustomLayer_12', { timeout: 10000 }).should('exist');

        const latitude = 12.97654; // Example latitude (New York City)
        const longitude = 80.24978; // Example longitude (New York City)

        // cy.get('[ng-model="gpsInput.lat"]').type(`${latitude}`);
        // cy.get('[ng-model="gpsInput.lon"]').type(`${longitude}`);
        // cy.get('[ng-click="pinPointGo()"]').click().wait(2000);

        // // Zoom out a bit before taking a screenshot
        // cy.get('#CustomLayer_12').trigger('wheel', { deltaY: 2000 }).wait(1000);
        cy.screenshot('CapturedMap', { capture: 'fullPage' });
        cy.wait(1000);
    });

    it('Generate PDF', () => {
        cy.readFile('cypress/screenshots/CapturedMap.png', 'base64', { timeout: 10000 })
            .then((dataUrl) => {
                const img = new Image();
                img.onload = function () {
                    const doc = new jsPDF('p', 'pt', 'a4'); // set page size to A4
                    const pageAspectRatio = doc.internal.pageSize.getWidth() / doc.internal.pageSize.getHeight(); // page aspect ratio
                    const imageAspectRatio = img.width / img.height; // image aspect ratio
                    let targetWidth;
                    let targetHeight;

                    if (pageAspectRatio > imageAspectRatio) {
                        targetWidth = doc.internal.pageSize.getWidth() * 0.8; // image width will be 80% of the page width
                        targetHeight = targetWidth / imageAspectRatio; // image height will be computed based on the aspect ratio
                    } else {
                        targetHeight = doc.internal.pageSize.getHeight() * 0.8; // image height will be 80% of the page height
                        targetWidth = targetHeight * imageAspectRatio; // image width will be computed based on the aspect ratio
                    }
                    const x = (doc.internal.pageSize.getWidth() - targetWidth) / 2; // x coordinate of top left corner of the image
                    const y = (doc.internal.pageSize.getHeight() - targetHeight) / 2; // y coordinate of top left corner of the image

                    doc.addImage(img, 'PNG', x, y, targetWidth, targetHeight, '', 'FAST');
                    doc.save('cypress/screenshots/output.pdf');
                };
                img.src = `data:image/png;base64,${dataUrl}`;
            })
    });
});

