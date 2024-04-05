/// <reference types="cypress" />

// Importing credentials from fixture file for testing
import cred from '../fixtures/Login_cred_customer.json';

describe('Login the customer', () => {

    it('Open the URL and Login with correct credentials', () => {
        cy.login(cred[0].Client.Email, cred[0].Client.Password);  
        cy.url().should('include', 'dashboard');
    });

    it('Login the user with wrong credentials', () => {
        cy.login(cred[1].Invalid.Email, cred[1].Invalid.Password);
        cy.contains('Invalid Credentials..!!').should('be.visible').and('have.text', 'Invalid Credentials..!!');
    });
});