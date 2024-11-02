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
export const telefoneFormat = "(XX) XXXXX-XXXX";