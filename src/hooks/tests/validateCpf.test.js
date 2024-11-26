import validateCPF from '../validateCpf.js';

describe('validateCPF', () => {
  it('deve validar corretamente um CPF válido', () => {
    const cpfValido = '123.456.789-09'; // CPF válido
    const result = validateCPF(cpfValido);
    expect(result).toBe(true);
  });

  it('deve validar corretamente um CPF válido sem pontuação', () => {
    const cpfValido = '12345678909'; // CPF válido sem pontuação
    const result = validateCPF(cpfValido);
    expect(result).toBe(true);
  });

  it('deve invalidar um CPF com comprimento incorreto', () => {
    const cpfInvalido = '123.456.789-0'; // CPF com menos de 11 dígitos
    const result = validateCPF(cpfInvalido);
    expect(result).toBe(false);
  });

  it('deve invalidar um CPF com caracteres não numéricos', () => {
    const cpfInvalido = 'XX.XXX.XXX-XX'; // CPF com caracteres não numéricos
    const result = validateCPF(cpfInvalido);
    expect(result).toBe(false);
  });

  it('deve invalidar um CPF com todos os dígitos iguais', () => {
    const cpfInvalido = '111.111.111-11'; // CPF com todos os dígitos iguais
    const result = validateCPF(cpfInvalido);
    expect(result).toBe(false);
  });

  it('deve invalidar um CPF com dígitos de verificação errados', () => {
    const cpfInvalido = '123.456.789-00'; // CPF com dígitos de verificação errados
    const result = validateCPF(cpfInvalido);
    expect(result).toBe(false);
  });

  it('deve invalidar um CPF vazio', () => {
    const cpfVazio = '';
    const result = validateCPF(cpfVazio);
    expect(result).toBe(false);
  });

  it('deve invalidar um CPF com espaços', () => {
    const cpfComEspacos = ' 123.456.789-09 ';
    const result = validateCPF(cpfComEspacos);
    expect(result).toBe(true); // Após remoção dos espaços, deve ser considerado válido
  });
});
