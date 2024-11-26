import {
  cpfRegexFinal,
  cnpjRegexFinal,
  telefoneRegexFinal,
  numeroCartaoSUSRegexFinal,
  crmRegexFinal,
  onlyLettersRegex,
  emailRegex,
  strongPasswordRegex
} from '../validationRegex.js'; // Substitua pelo caminho correto

describe('Regex Tests', () => {
  // Testes para CPF
  describe('CPF Regex Tests', () => {
    it('deve validar um CPF completo (com pontos e hífen)', () => {
      expect(cpfRegexFinal.test('123.456.789-01')).toBe(true);
    });

    it('deve validar um CPF sem pontos e hífen', () => {
      expect(cpfRegexFinal.test('12345678901')).toBe(true);
    });

    it('não deve validar um CPF inválido', () => {
      expect(cpfRegexFinal.test('1234567890')).toBe(false);
    });
  });

  // Testes para CNPJ
  describe('CNPJ Regex Tests', () => {
    it('deve validar um CNPJ completo (com pontos, barra e hífen)', () => {
      expect(cnpjRegexFinal.test('12.345.678/9012-34')).toBe(true);
    });

    it('deve validar um CNPJ sem os pontos, barra e hífen', () => {
      expect(cnpjRegexFinal.test('12345678901234')).toBe(true);
    });

    it('não deve validar um CNPJ inválido', () => {
      expect(cnpjRegexFinal.test('1234567890120')).toBe(false);
    });
  });

  // Testes para Telefone
  describe('Telefone Regex Tests', () => {
    it('deve validar um telefone completo com DDD e hífen', () => {
      expect(telefoneRegexFinal.test('(11) 91234-5678')).toBe(true);
    });

    it('deve validar um telefone com DDD e sem hífen', () => {
      expect(telefoneRegexFinal.test('(11) 912345678')).toBe(true);
    });

    it('deve validar um telefone sem DDD e com hífen', () => {
      expect(telefoneRegexFinal.test('91234-5678')).toBe(true);
    });
  });

  // Testes para Número do Cartão do SUS
  describe('Número do Cartão do SUS Regex Tests', () => {
    it('deve validar um número do cartão SUS completo (com espaços)', () => {
      expect(numeroCartaoSUSRegexFinal.test('123 4567 8901 2345')).toBe(true);
    });

    it('não deve validar um número do cartão SUS sem espaços', () => {
      expect(numeroCartaoSUSRegexFinal.test('123456789012345')).toBe(false);
    });

    it('não deve validar um número de cartão SUS inválido', () => {
      expect(numeroCartaoSUSRegexFinal.test('1234 5678 9012 3456')).toBe(false);
    });
  });

  // Testes para CRM
  describe('CRM Regex Tests', () => {
    it('deve validar um CRM válido (5 a 10 caracteres)', () => {
      expect(crmRegexFinal.test('12345')).toBe(true);
    });

    it('deve validar CRM com até 10 caracteres', () => {
      expect(crmRegexFinal.test('1234567890')).toBe(true);
    });

    it('não deve validar CRM com mais de 10 caracteres', () => {
      expect(crmRegexFinal.test('12345678901')).toBe(false);
    });
  });

  // Testes para apenas letras
  describe('Only Letters Regex Tests', () => {
    it('deve validar uma string com apenas letras e espaços', () => {
      expect(onlyLettersRegex.test('João Silva')).toBe(true);
    });

    it('não deve validar uma string com números ou caracteres especiais', () => {
      expect(onlyLettersRegex.test('João123 Silva!')).toBe(false);
    });
  });

  // Testes para Email
  describe('Email Regex Tests', () => {
    it('deve validar um email válido', () => {
      expect(emailRegex.test('example@email.com')).toBe(true);
    });

    it('não deve validar um email inválido', () => {
      expect(emailRegex.test('example@com')).toBe(false);
    });
  });

  // Testes para Senha Forte
  describe('Strong Password Regex Tests', () => {
    it('deve validar uma senha forte', () => {
      expect(strongPasswordRegex.test('a12B@cde')).toBe(true);
    });

    it('não deve validar uma senha fraca (sem número)', () => {
      expect(strongPasswordRegex.test('Password!')).toBe(false);
    });

    it('não deve validar uma senha fraca (sem letra maiúscula)', () => {
      expect(strongPasswordRegex.test('password1!')).toBe(false);
    });

    it('não deve validar uma senha fraca (sem caractere especial)', () => {
      expect(strongPasswordRegex.test('Password123')).toBe(false);
    });
  });
});
