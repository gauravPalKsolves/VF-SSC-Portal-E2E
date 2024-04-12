// /// <reference types="cypress" />

// describe("Test the Zoom in/ Zoom Out functionality in Google Maps", () => {
//     beforeEach(() => {
//         cy.visit(Cypress.env('Googlemap'));
//     });

//     it("Zoom in/ Zoom Out functionality in Google Maps", () => {
//         cy.get('input[name="q"]').type('Noida');
//         cy.get('span>span[jsinstance="*1"]').eq(0).click(); // Click on the map to focus
//         cy.wait(9000);

//         // Zoom in
//         cy.get('.canvas-container > canvas').trigger('wheel', { deltaY: -500 }).wait(5000).then(() => {
//             // Hover over the area to get the text
//             cy.get('.canvas-container').trigger('mouseover', { force: true });

//             // Check if the text "Mosaic Hotel Noida" is visible
//             cy.contains('Mosaic Hotel Noida').should('be.visible');
//         }).then(() => {
//             // Zoom out
//             cy.get('.canvas-container > canvas').trigger('wheel', { deltaY: 500 });
//         });
//     });
// });

describe('Google Maps Search by Latitude and Longitude', () => {
    it('Searches for a location using latitude and longitude', () => {
        const latitude = 40.7128; // Example latitude (New York City)
        const longitude = -74.0060; // Example longitude (New York City)

        cy.visit(Cypress.env('Googlemap'));
        cy.get('input[name="q"]').type(`${latitude}, ${longitude}{enter}`);

        // Wait for the map to load
        cy.get('.widget-scene').should('be.visible');

        // Capture a screenshot of the map view
        cy.screenshot('GoogleMaps_View');
    });
});
