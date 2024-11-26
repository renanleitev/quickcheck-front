import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditModal from '../EditModal';

const mockOnClose = jest.fn();

const TestEditModal = ({ open, children }) => {
  return (
    <EditModal open={open} onClose={mockOnClose}>
      {children}
    </EditModal>
  );
};

describe('EditModal component', () => {
  it('deve renderizar o modal quando open for true', () => {
    render(<TestEditModal open={true} children={<div>Conteúdo do Modal</div>} />);

    // Verifica se o conteúdo do modal está sendo exibido
    expect(screen.getByText('Conteúdo do Modal')).toBeInTheDocument();
  });

  it('não deve renderizar o modal quando open for false', () => {
    render(<TestEditModal open={false} children={<div>Conteúdo do Modal</div>} />);

    // Verifica se o conteúdo do modal não está presente
    expect(screen.queryByText('Conteúdo do Modal')).not.toBeInTheDocument();
  });

  it('deve renderizar corretamente o conteúdo passado como children', () => {
    const childContent = <div>Texto do Children</div>;

    render(<TestEditModal open={true} children={childContent} />);

    // Verifica se o conteúdo passado como children está presente no modal
    expect(screen.getByText('Texto do Children')).toBeInTheDocument();
  });
});
