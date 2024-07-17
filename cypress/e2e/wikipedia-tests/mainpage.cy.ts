describe('Wikipedia Main Page Link Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should handle invalid search input', () => {
    const invalidTerm = '!@#$%^&*';
    cy.get('#searchInput').type(invalidTerm);
    cy.get('#searchform button').click();
  
    cy.get('.mw-search-results-info p.mw-search-nonefound').should('be.visible');
  });

  it('should navigate to "From today\'s featured article"', () => {
    cy.fixture('testData.json').then((data) => {
      cy.contains(data.articleLinks.featuredArticle).click();
      cy.url().should('include', '/wiki/');
    });
  });

  it('should navigate to "In the news"', () => {
    cy.fixture('testData.json').then((data) => {
      cy.contains(data.articleLinks.inTheNews).click();
      cy.url().should('include', '/wiki/');
    });
  });

  it('should navigate to "Did you know ..."', () => {
    cy.fixture('testData.json').then((data) => {
      cy.contains(data.articleLinks.didYouKnow).click();
      cy.url().should('include', '/wiki/');
    });
  });
});
