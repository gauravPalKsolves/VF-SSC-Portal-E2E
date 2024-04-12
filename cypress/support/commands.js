// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

Cypress.Commands.add('login', (email, password) => {
    cy.visit(''); 
    cy.get('[placeholder="User Id"]').type(email);
    cy.get('[placeholder="Password"]').type(password);
    cy.get('[type="password"]').click()
  });
  


  Cypress.Commands.add('loginVuze', (email, password) => {
    cy.visit(Cypress.env('Vuze')); 
    cy.get('[placeholder="User Id"]').type('Neha3.S');
    cy.get('[placeholder="Password"]').type('Nokia@1234');
    cy.get('[ng-click="enterLogin()"]').click();
  });


// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })