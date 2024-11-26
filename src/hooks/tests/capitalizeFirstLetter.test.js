import capitalizeFirstLetter from '../capitalizeFirstLetter';

describe('capitalizeFirstLetter', () => {
  it('deve retornar uma string com a primeira letra maiúscula', () => {
    const result = capitalizeFirstLetter('teste');
    expect(result).toBe('Teste');
  });

  it('deve retornar a string original se a primeira letra já for maiúscula', () => {
    const result = capitalizeFirstLetter('Teste');
    expect(result).toBe('Teste');
  });

  it('deve retornar uma string vazia se a entrada for uma string vazia', () => {
    const result = capitalizeFirstLetter('');
    expect(result).toBe('');
  });

  it('deve retornar uma string vazia se a entrada for undefined', () => {
    const result = capitalizeFirstLetter(undefined);
    expect(result).toBe('');
  });

  it('deve retornar uma string vazia se a entrada for null', () => {
    const result = capitalizeFirstLetter(null);
    expect(result).toBe('');
  });

  it('deve lidar com espaços em branco', () => {
    const result = capitalizeFirstLetter('   teste');
    expect(result).toBe('   teste'); // Não modifica o espaço em branco inicial
  });

  it('deve capitalizar apenas a primeira letra e manter o resto da string igual', () => {
    const result = capitalizeFirstLetter('tEsTe');
    expect(result).toBe('TEsTe'); // Apenas a primeira letra deve ser alterada
  });
});
