import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchButton from '../SearchButton';

describe('SearchButton', () => {
  it('deve renderizar o botão com o ícone de busca', () => {
    const setOpenMock = jest.fn();

    render(<SearchButton setOpen={setOpenMock} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    const icon = screen.getByTestId('SearchIcon'); // Material UI adiciona `data-testid` nos ícones automaticamente
    expect(icon).toBeInTheDocument();
  });

  it('deve chamar setOpen com true ao clicar no botão', () => {
    const setOpenMock = jest.fn();

    render(<SearchButton setOpen={setOpenMock} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(setOpenMock).toHaveBeenCalledTimes(1);
    expect(setOpenMock).toHaveBeenCalledWith(true);
  });
});
