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
        const email = SignUp.customerrandomemail(); // Capture generated email
        const password = SignUp.generatePassword(); // Capture generated password
        SignUp.saveGeneratedEmailandPasswordToFixtureFile(email, password); // Pass email and password to save
        SignUp.Submit();
    });

    it('Import the data from fixture file', () => {
        SignUp.RegisterNow();
        SignUp.CustomerFirstandLastname('Gaurav', 'Pal');

        cy.fixture('generated_email.json').then((data) => {
            cy.get(SignUp.SignUp_Locators.Customer_Email).type(data.email);
        });

        cy.fixture('generated_password.json').then((data) => {
            cy.get(SignUp.SignUp_Locators.Customer_Password).type(data.password);
        });

        cy.get(SignUp.SignUp_Locators.SignupSubmit_button).click();

        cy.contains('Email already exists').should('be.visible').and('have.text', 'Email already exists');
    });
});
