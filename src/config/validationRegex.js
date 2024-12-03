// Regex para CPF e CNPJ
// Regex fixo (valida o valor completo)
export const cpfRegexFinal = /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;
export const cnpjRegexFinal = /^(?:\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/;
// Regex progressivo (valida conforme o usuário digita os números e os caracteres especiais)
export const cpfRegex =
  /^(\d{0,3}|\d{3}\.?\d{0,3}|\d{3}\.\d{3}\.?\d{0,3}|\d{3}\.\d{3}\.\d{3}-?\d{0,2})$/;
export const cnpjRegex =
  /^(\d{0,2}|\d{2}\.?\d{0,3}|\d{2}\.\d{3}\.?\d{0,3}|\d{2}\.\d{3}\.\d{3}\/?\d{0,4}|\d{2}\.\d{3}\.\d{3}\/\d{4}-?\d{0,2})$/;
// Formato específico para CPF e CNPJ
export const cpfFormat = 'XXX.XXX.XXX-XX';
export const cnpjFormat = 'XX.XXX.XXX/XXXX-XX';

// Regex para telefone
// Regex fixo (valida o valor completo)
export const telefoneRegexFinal = /^(?:\(\d{2}\)\s?)?(?:\d{4,5}-?\d{4})$/;
// Regex progressivo (valida conforme o usuário digita os números e os caracteres especiais)
export const telefoneRegex = /^\(?\d{0,2}\)? ?\d{0,5}-?\d{0,4}$/;
// Formato específico para telefone = DD (2 dígitos) + número completo (9 dígitos)
export const telefoneFormat = '(XX) XXXXX-XXXX';

// Regex para validar CRM
// Regex fixo (valida o valor completo)
export const crmRegexFinal = /^.{5,10}$/;
// Regex progressivo (valida conforme o usuário digita os números / não contando com a sigla do estado)
export const crmRegex = /^.{0,10}$/;

// Regex para apenas letras
export const onlyLettersRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;

// Regex para validar email
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regex para aumentar a segurança da senha
// https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
// Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character
export const strongPasswordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/;
