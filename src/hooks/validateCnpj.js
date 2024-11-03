export default function validateCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false; // Verifica se tem 14 dígitos e se não é uma sequência de números iguais

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let resto = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resto !== parseInt(digitos.charAt(0))) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  resto = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return resto === parseInt(digitos.charAt(1));
}
