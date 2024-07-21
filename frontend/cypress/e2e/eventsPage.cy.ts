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

  it('should filter events by User ID', () => {
    cy.intercept('GET', '**/users/*/events/').as('getUserEvents');
    cy.get('[data-cy=filter-type-select]').select('user');
    cy.get('[data-cy=filter-value-input]').type('1');
    cy.wait('@getUserEvents').then((interception) => {
      cy.log('Request:', interception.request);
      cy.log('Response:', interception.response);
    });
    cy.get('[data-cy=event-item]')
      .should('have.length.greaterThan', 0)
      .then(($items) => {
        cy.log('Number of events for User ID 1:', $items.length);
        $items.each((index, $el) => {
          cy.wrap($el).should('contain.text', 'Actor ID: 1');
        });
      });
  });

  it('should filter events by Repo ID', () => {
    cy.intercept('GET', '**/repos/*/events/').as('getRepoEvents');
    cy.get('[data-cy=filter-type-select]').select('repo');
    cy.get('[data-cy=filter-value-input]').type('1');
    cy.wait('@getRepoEvents').then((interception) => {
      cy.log('Request:', interception.request);
      cy.log('Response:', interception.response);
    });
    cy.get('[data-cy=event-item]')
      .should('have.length.greaterThan', 0)
      .then(($items) => {
        cy.log('Number of events for Repo ID 1:', $items.length);
        $items.each((index, $el) => {
          cy.wrap($el).should('contain.text', 'Repo ID: 1');
        });
      });
  });

  it('should display no events if none match the selected filter', () => {
    cy.intercept('GET', '**/repos/*/events/').as('getNoMatchingEvents');
    cy.get('[data-cy=filter-type-select]').select('repo');
    cy.get('[data-cy=filter-value-input]').type('0009999');
    cy.wait('@getNoMatchingEvents').then((interception) => {
      cy.log('Request:', interception.request);
      cy.log('Response:', interception.response);
    });
    cy.get('[data-cy=event-item]').should('have.length', 0);
    cy.contains('No events found for the selected filter.').should(
      'be.visible',
    );
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
