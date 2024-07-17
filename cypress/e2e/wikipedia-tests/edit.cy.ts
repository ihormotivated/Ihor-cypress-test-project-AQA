describe('Wikipedia Edit Capability Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('user should be logged in', () => {
    const testUsername = 'Ihormotivated';
    const testPassword = 'test123#';
    cy.get('#pt-login-2').click();
    cy.url().should('include', 'Special:UserLogin');
    cy.get('#wpName1').type(testUsername);
    cy.get('#wpPassword1').type(testPassword);
    cy.get('#wpLoginAttempt').click()
    cy.get('.vector-user-menu-logged-in').should('be.visible')
  });

  it('should navigate to the edit page for an article (if logged in)', () => {
    cy.visit('/wiki/Automation_testing');
    cy.get('#ca-edit').click();

    cy.url().should('include', 'action=edit');
    cy.get('textarea#wpTextbox1').should('be.visible');
  });
});
