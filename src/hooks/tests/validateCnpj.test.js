import validateCNPJ from '../validateCnpj.js';

describe('validateCNPJ', () => {
  it('deve validar corretamente um CNPJ válido', () => {
    const cnpjValido = '12.345.678/0001-95'; // CNPJ válido
    const result = validateCNPJ(cnpjValido);
    expect(result).toBe(true);
  });

  it('deve validar corretamente um CNPJ válido sem pontuação', () => {
    const cnpjValido = '12345678000195'; // CNPJ válido sem pontuação
    const result = validateCNPJ(cnpjValido);
    expect(result).toBe(true);
  });

  it('deve invalidar um CNPJ com comprimento incorreto', () => {
    const cnpjInvalido = '12.345.678/0001-9'; // CNPJ com menos de 14 dígitos
    const result = validateCNPJ(cnpjInvalido);
    expect(result).toBe(false);
  });

  it('deve invalidar um CNPJ com caracteres não numéricos', () => {
    const cnpjInvalido = 'XX.XXX.XXX/XXXX-XX'; // CNPJ com caracteres não numéricos
    const result = validateCNPJ(cnpjInvalido);
    expect(result).toBe(false);
  });

  it('deve invalidar um CNPJ com todos os dígitos iguais', () => {
    const cnpjInvalido = '11.111.111/1111-11'; // CNPJ com todos os dígitos iguais
    const result = validateCNPJ(cnpjInvalido);
    expect(result).toBe(false);
  });

  it('deve invalidar um CNPJ com dígitos de verificação errados', () => {
    const cnpjInvalido = '12.345.678/0001-96'; // CNPJ com dígitos de verificação errados
    const result = validateCNPJ(cnpjInvalido);
    expect(result).toBe(false);
  });

  it('deve invalidar um CNPJ vazio', () => {
    const cnpjVazio = '';
    const result = validateCNPJ(cnpjVazio);
    expect(result).toBe(false);
  });

  it('deve invalidar um CNPJ com espaços', () => {
    const cnpjComEspacos = ' 12.345.678/0001-95 ';
    const result = validateCNPJ(cnpjComEspacos);
    expect(result).toBe(true); // Após remoção dos espaços, deve ser considerado válido
  });
});
