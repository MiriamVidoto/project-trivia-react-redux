import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Teste da tela de Feedback',  () => {
  test('Se na página existe as informações da pessoa que joga', () => {
  const { history }= renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    expect(screen.getByTestId('header-profile-picture')).toBeDefined();
    expect(screen.getByTestId('header-player-name')).toBeDefined();
    expect(screen.getByTestId('header-score')).toBeDefined();
  })
  test('Se a página exibi uma mensagem relacionada ao desempenho da pessoa que jogou', () => {
    const { history }= renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    // const msg1 = /Could be better.../i;
    // const msg2 = /Well Done!/i;

    expect(screen.getByTestId('feedback-text')).toBeDefined();
  })
  test('Se a página exibi as informações relacionadas aos resultados obtidos para a pessoa usuária', () => {
    const { history }= renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    expect(screen.getByTestId('feedback-total-score')).toBeDefined();
    expect(screen.getByTestId('feedback-total-question')).toBeDefined();
  })
  test('Se na página existe aum botão para a pessoa jogadora poder jogar novamente', () => {
    const { history }= renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const btnPlayAgain = screen.getByRole('button', { name: /Play Again/i });     
    userEvent.click(btnPlayAgain);
    expect(history.location.pathname).toBe('/game')
  })
  test('Se na página existe aum botão para a pessoa jogadora poder visualizar a tela de ranking', () => {
    const { history }= renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const btnRanking = screen.getByRole('button', { name: /ranking/i });     
    userEvent.click(btnRanking);
    expect(history.location.pathname).toBe('/ranking')

  })
})
