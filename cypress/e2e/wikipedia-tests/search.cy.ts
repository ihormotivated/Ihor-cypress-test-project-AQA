describe('Wikipedia Search Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should perform a search and navigate to the correct article', () => {
    const searchTerm = 'Test';
    cy.get('#searchInput').type(searchTerm);
    cy.get('#searchform button').click();

    cy.url().should('include', `/wiki/${encodeURIComponent(searchTerm)}`);
    cy.contains(searchTerm).should('be.visible');
  });

  it('should handle searches with no results', () => {
    const obscureTerm = 'xyz123';
    cy.get('#searchInput').type(obscureTerm);
    cy.get('#searchform button').click();

    cy.get('.mw-search-results-info p').should('contain', 'does not exist');
  });

  it('should handle invalid search input', () => {
    const invalidTerm = '!@#$%^&*';
    cy.get('#searchInput').type(invalidTerm);
    cy.get('#searchform button').click();

    cy.get('.mw-search-results-info p.mw-search-nonefound').should('be.visible');
  });

  it('should return results for a variety of search terms', () => {
    cy.fixture('testData.json').then((data) => {
      data.searchTerms.forEach((term: string) => {
        cy.get('#searchInput').type(term);
        cy.get('#searchform button').click();
        cy.url().should('include', `/wiki/${encodeURIComponent(term)}`);
        cy.contains(term).should('be.visible');
        cy.go('back');
      });
    });
  });
});
