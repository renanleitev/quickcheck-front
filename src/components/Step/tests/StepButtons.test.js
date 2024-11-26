import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import StepButtons from '../StepButtons';

const mockSetActiveStep = jest.fn();
const mockOnReset = jest.fn();
const mockOnValidateForm = jest.fn();
const mockOnCallApi = jest.fn();
const mockOnCustomReturnStep = jest.fn();

describe('StepButtons component', () => {
  it('deve renderizar os botões corretamente', () => {
    render(
      <StepButtons
        activeStep={0}
        setActiveStep={mockSetActiveStep}
        onReset={mockOnReset}
        stepsNumber={3}
        nextStepLabel="Avançar"
        isSetupFinished={false}
      />
    );

    // Verificar se o botão "Voltar" está renderizado
    const backButton = screen.getByText('Voltar');
    expect(backButton).toBeInTheDocument();

    // Verificar se o botão "Avançar" está renderizado
    const nextButton = screen.getByText('Avançar');
    expect(nextButton).toBeInTheDocument();
  });

  it('deve chamar onReset quando o botão "Voltar" for clicado', () => {
    render(
      <StepButtons
        activeStep={0}
        setActiveStep={mockSetActiveStep}
        onReset={mockOnReset}
        stepsNumber={3}
        nextStepLabel="Avançar"
        isSetupFinished={false}
      />
    );

    fireEvent.click(screen.getByText('Voltar'));

    // Verificar se a função onReset foi chamada
    expect(mockOnReset).toHaveBeenCalled();
  });

  it('deve avançar para o próximo passo e chamar onValidateForm', () => {
    render(
      <StepButtons
        activeStep={0}
        setActiveStep={mockSetActiveStep}
        onReset={mockOnReset}
        stepsNumber={3}
        nextStepLabel="Avançar"
        isSetupFinished={false}
        onValidateForm={mockOnValidateForm}
      />
    );

    // Simular clique no botão "Avançar"
    fireEvent.click(screen.getByText('Avançar'));

    // Verificar se onValidateForm foi chamado
    expect(mockOnValidateForm).toHaveBeenCalled();
  });

  it('deve desabilitar o botão "Avançar" quando disableNextButton for true', () => {
    render(
      <StepButtons
        activeStep={0}
        setActiveStep={mockSetActiveStep}
        onReset={mockOnReset}
        stepsNumber={3}
        nextStepLabel="Avançar"
        isSetupFinished={false}
        disableNextButton={true}
      />
    );

    const nextButton = screen.getByText('Avançar');
    expect(nextButton).toBeDisabled();
  });

  it('deve chamar onCustomReturnStep quando hasCustomReturnStep e onCustomReturnStep forem definidos', () => {
    render(
      <StepButtons
        activeStep={1}
        setActiveStep={mockSetActiveStep}
        onReset={mockOnReset}
        stepsNumber={3}
        nextStepLabel="Avançar"
        isSetupFinished={false}
        hasCustomReturnStep={true}
        onCustomReturnStep={mockOnCustomReturnStep}
      />
    );

    // Simular clique no botão "Voltar"
    fireEvent.click(screen.getByText('Voltar'));

    // Verificar se onCustomReturnStep foi chamado
    expect(mockOnCustomReturnStep).toHaveBeenCalled();
  });

  it('deve chamar onCallApi e set isLoading para true/false ao clicar no botão "Avançar" com isCallingApi', async () => {
    render(
      <StepButtons
        activeStep={0}
        setActiveStep={mockSetActiveStep}
        onReset={mockOnReset}
        stepsNumber={3}
        nextStepLabel="Avançar"
        isSetupFinished={false}
        isCallingApi={true}
        onCallApi={mockOnCallApi}
      />
    );

    // Simular clique no botão "Avançar"
    fireEvent.click(screen.getByText('Avançar'));

    // Verificar se o onCallApi foi chamado e o status de loading
    expect(mockOnCallApi).toHaveBeenCalled();
  });
});
