export class SignUpCustomer {
    SignUp_Locators = {
        RegiterNow_button: 'Register Now',
        Customer_First_Name: '[placeholder="Enter First Name"]',
        Customer_Last_Name: '[placeholder="Enter Last Name"]',
        Customer_Email: '[placeholder="Enter Email Address"]',
        Customer_Password: '[placeholder="Enter Password"]',
        SignupSubmit_button: '.ssc-primary-green-btn'
    }

    RegisterNow() {
        cy.contains(this.SignUp_Locators.RegiterNow_button).click({force: true})
    }

    OpenTheURL() {
        cy.visit('') // Replace '' with your actual URL
    }

    CustomerFirstandLastname(first, last) {
        cy.get(this.SignUp_Locators.Customer_First_Name).type(first);
        cy.get(this.SignUp_Locators.Customer_Last_Name).type(last);
    }

    customerrandomemail() {
        // Function to generate a random string of given length
        function generateRandomString(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        const randomUsername = generateRandomString(8);
        const email = randomUsername + '@yopmail.com';

        cy.get(this.SignUp_Locators.Customer_Email).type(email);

        return email; // Return the generated email
    }

    generatePassword() {
        const minPasswordLength = 10;
        const maxPasswordLength = 16;
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const specialChars = '!@#$%^&*()-_+=';
        const digits = '0123456789';

        let password = '';

        password += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
        password += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
        password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
        password += digits.charAt(Math.floor(Math.random() * digits.length));

        const remainingLength = Math.max(minPasswordLength - password.length, 0);

        for (let i = 0; i < remainingLength; i++) {
            const allChars = uppercaseChars + lowercaseChars + specialChars + digits;
            password += allChars.charAt(Math.floor(Math.random() * allChars.length));
        }

        password = password.split('').sort(() => Math.random() - 0.5).join('');
        password = password.slice(0, maxPasswordLength);

        cy.get(this.SignUp_Locators.Customer_Password).type(password);

        return password;
    }

    saveGeneratedEmailandPasswordToFixtureFile(email, password) {
        const emailData = { email: email };
        const passwordData = { password: password };
        cy.writeFile('cypress/fixtures/generated_email.json', emailData);
        cy.writeFile('cypress/fixtures/generated_password.json', passwordData);
        cy.wait(1000);
    }


    Submit() {
        cy.get(this.SignUp_Locators.SignupSubmit_button).click({force: true})
    }
}
