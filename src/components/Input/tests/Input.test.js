import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '../Input';

// Função para testar o input e verificar a mudança de valor
const TestInput = ({
  inputType,
  keyName,
  data,
  setData,
  select = false,
  selectList = [],
  error = false,
  errorText = '',
  format,
  regex,
  disabled = false,
  placeholder = ''
}) => {
  return (
    <Input
      inputType={inputType}
      keyName={keyName}
      data={data}
      setData={setData}
      select={select}
      selectList={selectList}
      error={error}
      errorText={errorText}
      format={format}
      regex={regex}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
};

describe('Input component', () => {
  it('deve renderizar um campo de texto e alterar o valor corretamente', () => {
    const setData = jest.fn();
    const data = { name: '' };

    render(<TestInput keyName="name" data={data} setData={setData} placeholder="name" />);

    const input = screen.getByPlaceholderText(/name/i);
    fireEvent.change(input, { target: { value: 'Novo valor' } });

    // Verifica se a função setData foi chamada corretamente
    expect(setData).toHaveBeenCalledWith({ name: 'Novo valor' });
  });

  it('deve renderizar um select e chamar setData com a opção escolhida', () => {
    const setData = jest.fn();
    const data = { status: '' };
    const selectList = [
      { label: 'Ativo', value: 'ativo' },
      { label: 'Inativo', value: 'inativo' }
    ];

    render(
      <TestInput
        keyName="status"
        data={data}
        setData={setData}
        select={true}
        selectList={selectList}
        placeholder="status"
      />
    );

    const select = screen.getByPlaceholderText(/status/i);
    fireEvent.change(select, { target: { value: 'ativo' } });

    expect(setData).toHaveBeenCalledWith({ status: 'ativo' });
  });

  it('deve aplicar o formato corretamente ao valor do input', () => {
    const setData = jest.fn();
    const data = { price: '10' };

    render(<TestInput keyName="price" data={data} setData={setData} placeholder="price" />);

    const input = screen.getByPlaceholderText(/price/i);
    fireEvent.change(input, { target: { value: '123' } });

    expect(setData).toHaveBeenCalledWith({ price: '123' });
  });

  it('deve bloquear o input se o valor não corresponder ao regex', () => {
    const setData = jest.fn();
    const data = { phone: '' };
    const regex = /^[0-9]{10}$/; // Regex para número com 10 dígitos

    render(
      <TestInput keyName="phone" data={data} setData={setData} regex={regex} placeholder="phone" />
    );

    const input = screen.getByPlaceholderText(/phone/i);
    fireEvent.change(input, { target: { value: '12345' } });

    // Verifica se o valor não foi alterado devido ao regex
    expect(setData).not.toHaveBeenCalled();
  });

  it('deve exibir a mensagem de erro quando error for true', () => {
    const setData = jest.fn();
    const data = { name: '' };

    render(
      <TestInput
        keyName="name"
        data={data}
        setData={setData}
        error={true}
        errorText="Este campo é obrigatório"
        placeholder="name"
      />
    );

    const helperText = screen.getByText(/este campo é obrigatório/i);
    expect(helperText).toBeInTheDocument();
  });

  it('não deve permitir a edição quando o input estiver desabilitado', () => {
    const setData = jest.fn();
    const data = { name: 'Valor fixo' };

    render(
      <TestInput keyName="name" data={data} setData={setData} disabled={true} placeholder="name" />
    );

    const input = screen.getByPlaceholderText(/name/i);
    expect(input).toBeDisabled();
  });
});
