describe('Events Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display all events when no filter is selected', () => {
    cy.get('[data-cy=filter-type-select]').select('');
    cy.get('[data-cy=event-item]').should('have.length.greaterThan', 0);
  });

  it('should filter events by "PushEvent"', () => {
    cy.get('[data-cy=filter-type-select]').select('type');
    cy.get('[data-cy=filter-value-select]').select('PushEvent');
    cy.wait(500);
    cy.get('[data-cy=event-item]')
      .should('have.length.greaterThan', 0)
      .then(($items) => {
        cy.log('Number of PushEvent items:', $items.length);
        $items.each((index, $el) => {
          cy.wrap($el).should('contain.text', 'PushEvent');
        });
      });
  });

  it('should filter events by "ReleaseEvent"', () => {
    cy.get('[data-cy=filter-type-select]').select('type');
    cy.get('[data-cy=filter-value-select]').select('ReleaseEvent');
    cy.wait(500);
    cy.get('[data-cy=event-item]')
      .should('have.length.greaterThan', 0)
      .then(($items) => {
        cy.log('Number of ReleaseEvent items:', $items.length);
        $items.each((index, $el) => {
          cy.wrap($el).should('contain.text', 'ReleaseEvent');
        });
      });
  });

  it('should filter events by "WatchEvent"', () => {
    cy.get('[data-cy=filter-type-select]').select('type');
    cy.get('[data-cy=filter-value-select]').select('WatchEvent');
    cy.wait(500);
    cy.get('[data-cy=event-item]')
      .should('have.length.greaterThan', 0)
      .then(($items) => {
        cy.log('Number of WatchEvent items:', $items.length);
        $items.each((index, $el) => {
          cy.wrap($el).should('contain.text', 'WatchEvent');
        });
      });
  });

  it('should display all events when filter is cleared', () => {
    cy.get('[data-cy=filter-type-select]').select('type');
    cy.get('[data-cy=filter-value-select]').select('PushEvent');
    cy.wait(500);
    cy.get('[data-cy=event-item]').should('have.length.greaterThan', 0);
    cy.get('[data-cy=filter-type-select]').select('');
    cy.wait(500);
    cy.get('[data-cy=event-item]').should('have.length.greaterThan', 0);
  });
});
