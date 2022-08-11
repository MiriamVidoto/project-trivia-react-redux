import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App'

describe('Teste da tela Game',  () => {
  test('Se na página existe as informações da pessoa que joga', () => {
    const { history }= renderWithRouterAndRedux(<App />);
    history.push('/Game');

    expect(screen.getByTestId('header-profile-picture')).toBeDefined();
    expect(screen.getByTestId('header-player-name')).toBeDefined();
    expect(screen.getByTestId('header-score')).toBeDefined();
    })
  test('Se na página existe ', () =>{
  })
})
