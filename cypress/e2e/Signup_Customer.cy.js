/// <reference types = "cypress" />

// Importing the SignUpCustomer class for interacting with signup elements
import { SignUpCustomer } from "../Selectors/Customer_signup_CSS";
const SignUp = new SignUpCustomer();

import cred from '../fixtures/Signup_customer_data.json';

describe('Signup the customer', () => {
    beforeEach(() => {
        SignUp.OpenTheURL();
    });

    it.skip('Signup the user with correct credentials', () => {
        SignUp.RegisterNow();
        SignUp.CustomerFirstandLastname(cred[0].Client.First, cred[0].Client.Last);
        SignUp.customerrandomemail();
        SignUp.generatePassword();
        SignUp.Submit();
        cy.wait(1000);
    });

    it('Signup the user with wrong credentials', () => {
        SignUp.RegisterNow();
        SignUp.CustomerFirstandLastname(cred[1].Client.First, cred[1].Client.Last);
        SignUp.customerrandomemail();
        SignUp.generatePassword();
        SignUp.Submit();
        cy.wait(1000);
        cy.get('div>p.error-message').should('be.visible').and('have.text', 'Invalid first nameInvalid last name');
    });
});
