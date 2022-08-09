import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Teste da tela de Login',  () => {
  test('Se na página existe o campo de nome e email', () =>{
    renderWithRouterAndRedux(<App />);
    expect(screen.getByTestId('input-gravatar-email')).toBeDefined();
    expect(screen.getByTestId('input-player-name')).toBeDefined();
  })
  test('Se na página existe o botão Play', () =>{
  renderWithRouterAndRedux(<App />);
  expect(screen.getByRole('button', { name: /Play/i })).toBeDefined();
  })
  test('Se na página existe o botão Settings', () =>{
  renderWithRouterAndRedux(<App />);
  expect(screen.getByRole('button', { name: /Configurações/i })).toBeDefined();
  })
  test('Se o botão inicia desabilitado e é habilitado com os dados corretos, ao clicar é redirecionada para a tela do jogo', async () =>{
  const { history } = renderWithRouterAndRedux(<App />);
  const inputName = screen.getByTestId('input-player-name');
  const inputEmail = screen.getByTestId('input-gravatar-email');
  const buttonPlay = screen.getByRole('button', {name: /Play/i});

  expect(buttonPlay).toBeDisabled();

  userEvent.type(inputName, 'Alguém');
  userEvent.type(inputEmail, 'alguem@alguem.com')

  expect(buttonPlay).toBeEnabled();

  userEvent.click(buttonPlay)

  await waitFor(() => {
      const {location: {pathname}} = history;
      expect(pathname).toBe('/game');
    })
  })
  test('Se ao clicar no botão, a Api é chamada e as informaçãoes são adicionadas ao localStorage', async () =>{
    renderWithRouterAndRedux(<App />);
   
    const tokenApi = '5b022db67876c1b5a84b1e1ce468c233d46c8fa0178f60eb7fe6933d1a793c5e';

    global.fetch = jest.fn(async () => ({
      json: async () =>  ({token: tokenApi})
    }));

    const endpoint = 'https://opentdb.com/api_token.php?command=request';
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByRole('button', { name: /Play/i });

    userEvent.type(inputName, 'Alguém');
    userEvent.type(inputEmail, 'alguem@alguem.com')
    userEvent.click(buttonPlay);
  
    const storedUserToken = localStorage.getItem('token')
    expect(storedUserToken).toBe(tokenApi);

    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(endpoint);

      
    })
test('Se ao clicar no botão Settings deve ser redirecionada para a tela de configurações ', () =>{
  const { history } = renderWithRouterAndRedux(<App />);
  const buttonSettings = screen.getByRole('button', {name: /Configurações/i});
  userEvent.click(buttonSettings);

  expect(history.location.pathname).toBe('/settings')
  })
})
