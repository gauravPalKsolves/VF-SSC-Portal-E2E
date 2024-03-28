/// <reference types="cypress" />


import { LoginCustomer } from "../Selectors/Customer_login_CSS"
const Login = new LoginCustomer()

import cred from '../fixtures/Login_cred_customer.json'


describe('Login the customer', () => {
    beforeEach(() => {
        Login.OpenTheURL()
    })


    it('Login the user with correct credentials', () => {

        Login.Email_n_Password(cred[0].Client.Email, cred[0].Client.Password)
        cy.url().should('include', 'dashboard')
    })

    it('Login the user with wrong credentials', () => {
        Login.Email_n_Password(cred[1].Invalid.Email, cred[1].Invalid.Password)
    })
})
