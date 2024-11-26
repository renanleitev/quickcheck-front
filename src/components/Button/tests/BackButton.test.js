import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import BackButton from '../BackButton';
import { RoutesList } from '../../../routes/enums';

// Mock do useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('BackButton', () => {
  it('deve renderizar o botão com o texto "Voltar"', () => {
    render(
      <BrowserRouter>
        <BackButton />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /voltar/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({ width: '15rem', height: '4rem' });
  });

  it('deve navegar para a rota "Home" ao clicar no botão', () => {
    const mockNavigate = jest.fn();
    jest.mocked(require('react-router-dom').useNavigate).mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <BackButton />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /voltar/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(RoutesList.Home); // Substitua "/home" pelo valor correto em `RoutesList.Home`
  });
});
