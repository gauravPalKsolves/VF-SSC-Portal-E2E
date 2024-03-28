export class LoginCustomer {


    Login_Locators = {
    
    Customer_Email : '[placeholder="Enter Email Address"]',
    Customer_Password: '[placeholder="Enter Password"]',
    LoginSubmit_button : 'Submit'

    }
    
    
    OpenTheURL(){
        cy.visit('')    // we are getting the value here from config.js file of baseURL
    }
    
    Email_n_Password ( email, password) {
        cy.get(this.Login_Locators.Customer_Email).type(email)
        cy.get(this.Login_Locators.Customer_Password).type(password)
        cy.contains(this.Login_Locators.LoginSubmit_button).click({force: true})
    
    } 
    
    
    
    }