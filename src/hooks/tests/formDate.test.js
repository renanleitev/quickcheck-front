import formatDate, { formatBirthDate, formatCalendarDate } from '../formatDate';

describe('Format Functions', () => {
  // Testando formatBirthDate
  describe('formatBirthDate', () => {
    it('deve formatar corretamente a data de nascimento', () => {
      const date = '1990-10-12';
      const result = formatBirthDate(date);
      expect(result).toBe('12/10/90');
    });

    it('deve retornar uma string vazia quando a entrada for uma string vazia', () => {
      const result = formatBirthDate('');
      expect(result).toBe('');
    });

    it('deve retornar uma string vazia quando a entrada for undefined', () => {
      const result = formatBirthDate(undefined);
      expect(result).toBe('');
    });

    it('deve retornar uma string vazia quando a entrada for null', () => {
      const result = formatBirthDate(null);
      expect(result).toBe('');
    });
  });

  // Testando formatCalendarDate
  describe('formatCalendarDate', () => {
    it('deve formatar corretamente a data no formato ISO sem hora', () => {
      const date = '2024-11-26T10:30:00Z';
      const result = formatCalendarDate(date);
      expect(result).toBe('2024-11-26');
    });

    it('deve retornar uma string vazia quando a entrada for uma string vazia', () => {
      const result = formatCalendarDate('');
      expect(result).toBe('');
    });

    it('deve retornar uma string vazia quando a entrada for undefined', () => {
      const result = formatCalendarDate(undefined);
      expect(result).toBe('');
    });

    it('deve retornar uma string vazia quando a entrada for null', () => {
      const result = formatCalendarDate(null);
      expect(result).toBe('');
    });
  });

  // Testando formatDate
  describe('formatDate', () => {
    it('deve formatar corretamente a data com o formato "ddd, DD/MM, HH:mm"', () => {
      const date = '2024-11-26T10:30:00Z';
      const formattedDate = 'Ter, 26/11, 07:30'; // A data é convertida para PT-BR
      const result = formatDate(date);
      expect(result).toBe(formattedDate);
    });

    it('deve retornar uma string vazia quando a entrada for uma string vazia', () => {
      const result = formatDate('');
      expect(result).toBe('');
    });

    it('deve retornar uma string vazia quando a entrada for undefined', () => {
      const result = formatDate(undefined);
      expect(result).toBe('');
    });

    it('deve retornar uma string vazia quando a entrada for null', () => {
      const result = formatDate(null);
      expect(result).toBe('');
    });
  });
});
