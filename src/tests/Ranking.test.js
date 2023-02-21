import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';

describe('Teste da tela de Ranking',  () => {
  test('Se na página existe um botão para voltar ao início', () =>{
    const { history } = renderWithRouterAndRedux(<Ranking />);
    const btnVoltar = screen.getByTestId('btn-go-home');
    userEvent.click(btnVoltar);
    expect(history.location.pathname).toBe('/');
  })
  test('Se na página existe uma lista com a imagem, nome e pontuação das pessoas que jogaram', () =>{
    renderWithRouterAndRedux(<Ranking />);
    expect(screen.getByTestrole('img', {name: /img-gravatar/i})).toBeDefined();
    expect(screen.getByTestId(/player-name-/i)).toBeDefined();
    expect(screen.getByTestId(/player-score-/i)).toBeDefined();
  })
  test('Se o ranking está armazenado no localStorage', () =>{
  })
})

