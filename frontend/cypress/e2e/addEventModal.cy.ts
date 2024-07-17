describe('AddEventModal', () => {
  beforeEach(() => {
    cy.visit('/events');
    cy.get('[data-cy=add-event-button]').click();
    cy.get('[data-cy=add-event-modal]', { timeout: 10000 }).should(
      'be.visible',
    );
  });

  it('should display validation errors when required fields are missing', () => {
    cy.get('[data-cy=submit-button]').click();
    cy.get('[data-cy=error-message]', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Please select an event type.');
  });

  it('should display an error for invalid repository ID', () => {
    cy.get('[data-cy=type-select]').select('PushEvent');
    cy.get('[data-cy=repo-id-input]').type('999');
    cy.get('[data-cy=actor-id-input]').type('1');
    cy.get('[data-cy=submit-button]').click();
    cy.get('[data-cy=error-message]', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Invalid repository ID.');
  });

  it('should display an error for invalid actor ID', () => {
    cy.get('[data-cy=type-select]').select('PushEvent');
    cy.get('[data-cy=repo-id-input]').type('1');
    cy.get('[data-cy=actor-id-input]').type('999');
    cy.get('[data-cy=submit-button]').click();
    cy.get('[data-cy=error-message]', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Invalid actor ID.');
  });

  it('should add a new event successfully', () => {
    cy.get('[data-cy=type-select]').select('PushEvent');
    cy.get('[data-cy=public-checkbox]').check();
    cy.get('[data-cy=repo-id-input]').type('1');
    cy.get('[data-cy=actor-id-input]').type('1');
    cy.get('[data-cy=submit-button]').click();

    cy.get('[data-cy=add-event-modal]', { timeout: 10000 }).should('not.exist');
    cy.contains('PushEvent').should('be.visible');
  });
});
