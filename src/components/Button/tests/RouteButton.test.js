import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import RouteButton from '../RouteButton';
import { toast } from 'react-toastify';

// Mock do toast
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn()
  }
}));

describe('RouteButton', () => {
  it('deve renderizar o botão com o texto e o ícone', () => {
    render(<RouteButton onClick={jest.fn()} />);

    const button = screen.getByRole('button', { name: /rotas/i });
    expect(button).toBeInTheDocument();

    const icon = screen.getByTestId('NearMeIcon'); // O Material UI adiciona automaticamente o `data-testid` para ícones.
    expect(icon).toBeInTheDocument();
  });

  it('deve chamar a função onClick e exibir o toast ao clicar no botão', () => {
    const onClickMock = jest.fn();
    render(<RouteButton onClick={onClickMock} />);

    const button = screen.getByRole('button', { name: /rotas/i });
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(toast.success).toHaveBeenCalledWith('Rota calculada com sucesso!');
  });
});
