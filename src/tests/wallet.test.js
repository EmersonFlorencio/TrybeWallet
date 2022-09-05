import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import Header from '../components/Header';
import mockData from './helpers/mockData';

const email = 'alguem@alguem.com';
const password = '12345678';

describe('Testando o componente Header', () => {
  test('Se o email que o usuário ultilizou esta na tela', () => {
    renderWithRouterAndRedux(<Header />);
    const userEmail = screen.getByTestId('email-field');
    expect(userEmail).toBeInTheDocument();
  });
});

describe('Testando o componente Wallet', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(loginBtn);
  });
  test('Se a API é chamada no componente Wallet', async () => {
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
  });
});
