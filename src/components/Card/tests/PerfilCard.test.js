import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MenuItem } from '@mui/material';

import PerfilCard from '../PerfilCard';
import colors from '../../../config/colors';

describe('PerfilCard', () => {
  const entidadeMock = {
    usuario: {
      nome: 'João Silva',
      imagem: 'https://via.placeholder.com/150'
    }
  };

  it('deve renderizar o componente com avatar, título e subtítulo', () => {
    render(<PerfilCard entidade={entidadeMock} hasSubtitle subtitle="Subtítulo exemplo" />);

    // Verifica avatar
    const avatar = screen.getByLabelText('estabelecimento-nome');
    expect(avatar).toBeInTheDocument();

    // Verifica título
    const title = screen.getByText('João Silva');
    expect(title).toBeInTheDocument();

    // Verifica subtítulo
    const subtitle = screen.getByText('Subtítulo exemplo');
    expect(subtitle).toBeInTheDocument();
  });

  it('não deve renderizar subtítulo se hasSubtitle for false', () => {
    render(<PerfilCard entidade={entidadeMock} hasSubtitle={false} />);

    const subtitle = screen.queryByText('Subtítulo exemplo');
    expect(subtitle).not.toBeInTheDocument();
  });

  it('deve renderizar o botão de menu se hasMenu for true', () => {
    render(<PerfilCard entidade={entidadeMock} hasMenu />);

    const menuButton = screen.getByLabelText('settings');
    expect(menuButton).toBeInTheDocument();
  });

  it('deve abrir e fechar o menu ao clicar no botão', () => {
    const menuItems = (
      <div>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
      </div>
    );

    render(<PerfilCard entidade={entidadeMock} hasMenu menu={menuItems} />);

    // Verifica se o botão de menu está presente
    const menuButton = screen.getByLabelText('settings');
    fireEvent.click(menuButton);

    // Verifica se o menu foi aberto
    const menuItem1 = screen.getByText('Item 1');
    expect(menuItem1).toBeInTheDocument();
  });

  it('deve renderizar os filhos corretamente', () => {
    render(
      <PerfilCard entidade={entidadeMock}>
        <p>Conteúdo do card</p>
      </PerfilCard>
    );

    const childContent = screen.getByText('Conteúdo do card');
    expect(childContent).toBeInTheDocument();
  });
});
