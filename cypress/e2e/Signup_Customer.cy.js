import { SignUpCustomer } from "../Selectors/Customer_signup_CSS";
const SignUp = new SignUpCustomer();

const cred = require('../fixtures/Login_cred_customer.json');

describe('Signup the customer', () => {
    beforeEach(() => {
        SignUp.OpenTheURL('');
    });

    it('Signup the user with correct credentials', () => {
        SignUp.RegisterNow();
        SignUp.CustomerFirstandLastname('Gaurav', 'Pal');
        const email = SignUp.customerrandomemail();
        const password = SignUp.generatePassword();
        SignUp.Submit();
        SignUp.saveGeneratedEmailToFixtureFile(email);
        const emailData = { email: email };
        const passwordData = { password: password };
        cy.writeFile('cypress/fixtures/generated_email.json', emailData);
        cy.writeFile('cypress/fixtures/generated_password.json', passwordData);
        cy.wait(1000);
    });

    it('Import the data from fixture file', () => {
        SignUp.RegisterNow();
        SignUp.CustomerFirstandLastname('Gaurav', 'Pal');

        cy.fixture('generated_email').then((data) => {
            cy.get(SignUp.SignUp_Locators.Customer_Email).type(data.email);
        });

        cy.fixture('generated_password').then((data) => {
            cy.get(SignUp.SignUp_Locators.Customer_Password).type(data.password);
        });

        cy.get(SignUp.SignUp_Locators.SignupSubmit_button).click();

        cy.contains('Email already exists').should('be.visible').and('have.text', 'Email already exists');
    });
});
