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
        cy.visit('')    // we are getting the value here from config.js file of baseURL
    }
    
    CustomerFirstandLastname (First, Last) {
        cy.get(this.SignUp_Locators.Customer_First_Name).type(First)
        cy.get(this.SignUp_Locators.Customer_Last_Name).type(Last)
    }

    customerrandomemail () {
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
        
        // Generate a random username
        const randomUsername = generateRandomString(8); // Change the length as needed
        
        // Concatenate the random username with the domain
        const email = randomUsername + '@yopmail.com';
        
        cy.get(this.SignUp_Locators.Customer_Email).type(email);
    }

    generatePassword() {
        const minPasswordLength = 10;
        const maxPasswordLength = 16;
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const specialChars = '!@#$%^&*()-_+=';
        const digits = '0123456789';
    
        let password = '';
    
        // Ensure at least one character from each category
        password += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
        password += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
        password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
        password += digits.charAt(Math.floor(Math.random() * digits.length));
    
        const remainingLength = Math.max(minPasswordLength - password.length, 0);
    
        // Fill up remaining characters with random characters
        for (let i = 0; i < remainingLength; i++) {
            const allChars = uppercaseChars + lowercaseChars + specialChars + digits;
            password += allChars.charAt(Math.floor(Math.random() * allChars.length));
        }
    
        // Shuffle the password
        password = password.split('').sort(() => Math.random() - 0.5).join('');
    
        // Trim to maximum length
        password = password.slice(0, maxPasswordLength);
    
        // Type the generated password into the password field
        cy.get(this.SignUp_Locators.Customer_Password).type(password);
    
        // Return the generated password
        return password;
    }
    
    Submit() {
        cy.get(this.SignUp_Locators.SignupSubmit_button).click({force: true})
    }
}
