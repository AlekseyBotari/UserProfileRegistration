Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
})

// Access fixture data
before(function () {
  cy.fixture('TestDataPositive').then(function (regdata) {
    this.regdata = regdata
  })
})

// Launch main web page before each test case
beforeEach("Main web page", function () {
  cy.visit(this.regdata.URL)
})

describe('User registration form - positive test cases', function () {
  it('Fill in all fields with valid data and "Submit" form', function () {
    cy.get('[id="firstName"]').type(this.regdata.firstName) // Fill in the first name field
    cy.get('[id="lastName"]').type(this.regdata.lastName) // Fill in the last name field
    cy.get('[id="userEmail"]').type(this.regdata.userEmail) // Fill in the  email field
    cy.get('label[for="gender-radio-1"]').click() // Select gender
    cy.get('[id="userNumber"]').type(this.regdata.userNumber) // Fill in the mobile field
    // Select date of birth by clearing the field first, then typing the value
    cy.get('[id="dateOfBirthInput"]').type('{selectAll}').type(this.regdata.dateOfBith).type('{enter}')
    cy.get('[id="subjectsInput"]').type(this.regdata.subjects) // Fill in the subjects field        
    cy.get('label[for="hobbies-checkbox-1"]').click() // Select hobby
    cy.get('[id="currentAddress"]').type(this.regdata.currentAddress) // Fill in the current address field
    // Type and select the state (Haryana) from the dropdown list
    cy.get('#state > div > div.css-1hwfws3 > div.css-1wa3eu0-placeholder').type('Haryana{enter}')
    // Type and select the city (Karnal) from the dropdown list
    cy.get('#city > div > div.css-1hwfws3 > div.css-1wa3eu0-placeholder').type('Karnal{enter}')
    cy.get('[id="submit"]').click() // Click the submit button to submit the form
    cy.get('.modal-content').should('be.visible')  // Modal should appear after successful submission
    cy.get('.modal-header').should('contain', 'Thanks for submitting the form') // Check modal header
  })
})
