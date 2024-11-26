import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActionModal from '../ActionModal';

const mockOnClose = jest.fn();
const mockOnConfirm = jest.fn();

const TestActionModal = ({ open }) => {
  return (
    <ActionModal
      data={{ someData: 'test' }}
      setData={jest.fn()}
      open={open}
      onClose={mockOnClose}
      onConfirm={mockOnConfirm}
      keyName="someData"
      title="Test Modal"
    />
  );
};

describe('ActionModal component', () => {
  it('deve renderizar corretamente quando o modal estiver aberto', () => {
    render(<TestActionModal open={true} />);

    // Verifica se o título do modal está sendo exibido
    expect(screen.getByText('Test Modal')).toBeInTheDocument();

    // Verifica se o botão de "Voltar" está presente
    expect(screen.getByText('Voltar')).toBeInTheDocument();

    // Verifica se o botão de "Confirmar" está presente por padrão
    expect(screen.getByText('Confirmar')).toBeInTheDocument();
  });

  it('deve chamar a função onClose quando o botão Voltar for clicado', async () => {
    render(<TestActionModal open={true} />);

    const voltarButton = screen.getByText('Voltar');
    fireEvent.click(voltarButton);

    // Verifica se a função onClose foi chamada
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('deve chamar a função onConfirm quando o botão Confirmar for clicado', async () => {
    render(<TestActionModal open={true} />);

    const confirmButton = screen.getByText('Confirmar');
    fireEvent.click(confirmButton);

    // Verifica se a função onConfirm foi chamada
    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it('deve chamar a função onClose quando o modal for fechado', async () => {
    render(<TestActionModal open={true} />);

    // Simula o fechamento do modal clicando no botão Voltar
    const voltarButton = screen.getByText('Voltar');
    fireEvent.click(voltarButton);

    // Verifica se onClose foi chamado
    await waitFor(() => expect(mockOnClose).toHaveBeenCalled());
  });
});
