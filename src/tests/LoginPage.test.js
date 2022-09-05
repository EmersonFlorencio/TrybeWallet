import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

const email = 'alguem@alguem.com';
const password = '12345678';
const emailInput = screen.getByTestId('email-input');

describe('Testando o componente Login', () => {
  test('Se há um input email na tela inicial', () => {
    renderWithRouterAndRedux(<App />);
    expect(emailInput).toBeInTheDocument();
  });

  test('Se há um input senha na tela inicial', () => {
    renderWithRouterAndRedux(<App />);
    const passwordInput = screen.getByPlaceholderText('Senha');
    expect(passwordInput).toBeInTheDocument();
  });

  test('Se há um botão de entrar na tela', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /Entrar/i });
    expect(button).toBeInTheDocument();
  });

  test('Se o botão habilita quando o Email e Senha são validos', () => {
    const passwordInput = screen.getByPlaceholderText('Senha');
    const loginBtn = screen.getByRole('button', { name: /Entrar/i });

    const wrongEmail = 'emerson';
    const wrongPassword = 't23b';

    userEvent.type(emailInput, wrongEmail);
    userEvent.type(passwordInput, wrongPassword);

    expect(loginBtn).toBeDisabled();

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);

    expect(loginBtn).toBeEnabled();
  });

  test('Se com o Email e Senha validados, ao clicar, muda para rota "carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const passwordInput = screen.getByPlaceholderText(/Senha/i);
    const loginBtn = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(loginBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
