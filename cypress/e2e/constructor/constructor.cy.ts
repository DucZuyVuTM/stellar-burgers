/// <reference types="cypress" />

import { deleteCookie, setCookie } from '../../../src/utils/cookie';

const URL = 'https://norma.nomoreparties.space/api'

describe('Тест конструктора бургеров', () => {
  beforeEach(() => {
    cy.fixture('tokens').then(({ accessToken, refreshToken }) => {
      setCookie('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    });

    cy.intercept('GET', `${URL}/auth/user`, { fixture: 'user.json' }).as('getUser');
    cy.intercept('GET', `${URL}/ingredients`, { fixture: 'ingredients.json' }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getUser');
  });

  afterEach(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });
  it('Тест получения списка ингредиентов с сервера', () => {
    cy.get('[data-cy="constructor"]').as('constructor');

    cy.get('@constructor').should('not.contain', 'Краторная булка N-200i');
    cy.get('@constructor').should('not.contain', 'Биокотлета из марсианской Магнолии');

    cy.get('[data-cy="Булки"]').children().first().find('button').click();
    cy.get('[data-cy="Начинки"]').children().first().find('button').click();

    cy.get('@constructor').should('contain', 'Краторная булка N-200i');
    cy.get('@constructor').should('contain', 'Биокотлета из марсианской Магнолии');
  });

  it('Тест открытия и закрытия модального окна ингредиента', () => {
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('[data-cy="ingredient-item"]').first().click();
    cy.get('[data-cy="modal"]')
      .as('modal')
      .should('exist')
      .and('contain', 'Краторная булка N-200i');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('@modal').should('not.exist');

    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('[data-cy="ingredient-item"]').first().click();
    cy.get('@modal').should('exist');

    cy.get('[data-cy="modal-overlay"]').click('left', { force: true });
    cy.get('@modal').should('not.exist');
  });

  it('Тест создания заказа', () => {
    cy.intercept('POST', `${URL}/orders`, { fixture: 'order.json' }).as('orderBurgerApi');

    cy.get('[data-cy="constructor"]').as('constructor');

    cy.get('@constructor')
      .should('not.contain', 'Краторная булка N-200i')
      .and('not.contain', 'Биокотлета из марсианской Магнолии');

    cy.get('[data-cy="Булки"]').children().first().find('button').click();
    cy.get('[data-cy="Начинки"]').children().first().find('button').click();

    cy.get('@constructor')
      .should('contain', 'Краторная булка N-200i')
      .and('contain', 'Биокотлета из марсианской Магнолии');
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('@constructor').children('div').find('button').click();

    cy.get('[data-cy="modal"]')
      .as('modal')
      .should('exist')
      .and('contain', '66666');

    cy.get('[data-cy="modal-close"]').click();

    cy.get('@modal').should('not.exist');

    cy.get('@constructor')
      .should('not.contain', 'Краторная булка N-200i')
      .and('not.contain', 'Биокотлета из марсианской Магнолии');

    cy.wait('@orderBurgerApi');
  });

});
