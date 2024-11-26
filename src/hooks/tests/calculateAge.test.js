import calculateAge from '../calculateAge';

describe('calculateAge', () => {
  it('deve calcular a idade corretamente quando o aniversário já passou este ano', () => {
    const birthDate = '2000-01-01'; // Data de nascimento no começo do ano
    const age = calculateAge(birthDate);
    const expectedAge = new Date().getFullYear() - 2000; // Espera-se que a idade seja a diferença entre o ano atual e 2000
    expect(age).toBe(expectedAge);
  });

  it('deve calcular a idade corretamente quando o aniversário ainda não passou este ano', () => {
    const birthDate = '2000-12-31'; // Data de nascimento no final do ano
    const age = calculateAge(birthDate);
    const expectedAge = new Date().getFullYear() - 2000 - 1; // Espera-se que a idade seja 1 ano a menos, pois o aniversário ainda não aconteceu este ano
    expect(age).toBe(expectedAge);
  });

  it('deve calcular a idade corretamente quando o aniversário é hoje', () => {
    const today = new Date();
    const birthDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`; // Data de nascimento igual à data de hoje
    const age = calculateAge(birthDate);
    const expectedAge = 0; // Espera-se que a idade seja 0 se o nascimento for hoje
    expect(age).toBe(expectedAge);
  });

  it('deve calcular a idade corretamente para uma pessoa que nasceu em um ano bissexto', () => {
    const birthDate = '2000-02-29'; // Data de nascimento em um ano bissexto
    const age = calculateAge(birthDate);
    const expectedAge = new Date().getFullYear() - 2000; // Espera-se que a idade seja a diferença entre o ano atual e 2000
    expect(age).toBe(expectedAge);
  });

  it('deve retornar 0 anos para uma data futura', () => {
    const futureDate = '2050-01-01'; // Data no futuro
    const age = calculateAge(futureDate);
    expect(age).toBe(0); // Não deve calcular idade para uma data futura
  });
});
