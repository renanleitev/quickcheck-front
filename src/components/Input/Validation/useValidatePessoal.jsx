import { useState, useEffect } from 'react';
import { cpfRegexFinal, cnpjRegexFinal } from '../../../config/validationRegex';
import validateCPF from '../../../hooks/validateCpf';
import validateCNPJ from '../../../hooks/validateCnpj';
import dayjs from 'dayjs';

const useValidatePessoal = ({ nome, cpf, cnpj, nascimento }) => {
  const [errorNome, setErrorNome] = useState(false);
  const [errorNomeText, setErrorNomeText] = useState('');

  const [errorCpf, setErrorCpf] = useState(false);
  const [errorCpfText, setErrorCpfText] = useState('');

  const [errorCnpj, setErrorCnpj] = useState(false);
  const [errorCnpjText, setErrorCnpjText] = useState('');

  const [errorIdade, setErrorIdade] = useState(false);
  const [errorIdadeText, setErrorIdadeText] = useState('');

  const idade = dayjs(new Date()).diff(nascimento, 'year');

  const validatePessoal = () => {
    let hasError = false;

    // Validação do nome
    if (nome === '') {
      setErrorNome(true);
      setErrorNomeText('Nome não pode ser vazio');
      hasError = true;
    }

    // Validação do CPF
    if (cpf !== undefined) {
      if (cpf === '') {
        setErrorCpf(true);
        setErrorCpfText('CPF não pode ser vazio');
        hasError = true;
      } else if (!cpfRegexFinal.test(cpf) || !validateCPF(cpf)) {
        setErrorCpf(true);
        setErrorCpfText('CPF inválido');
        hasError = true;
      }
    }

    // Validação do CNPJ
    if (cnpj !== undefined) {
      if (cnpj === '') {
        setErrorCnpj(true);
        setErrorCnpjText('CNPJ não pode ser vazio');
        hasError = true;
      } else if (!cnpjRegexFinal.test(cnpj) || !validateCNPJ(cnpj)) {
        setErrorCnpj(true);
        setErrorCnpjText('CNPJ inválido');
        hasError = true;
      }
    }

    if (nascimento !== undefined) {
      const idadePermitida = 18;
      // Validação da idade
      if (idade < idadePermitida) {
        setErrorIdade(true);
        setErrorIdadeText('Idade inferior a 18 anos');
        hasError = true;
      }
    }

    // Lança erro se alguma validação falhar
    if (hasError) {
      throw new Error('Dados pessoais vazios ou inválidos');
    }
  };

  useEffect(() => {
    if (nome !== '') {
      setErrorNome(false);
    }
    if (cpf !== '') {
      setErrorCpf(false);
    }
    if (cnpj !== '') {
      setErrorCnpj(false);
    }
    if (nascimento !== '') {
      setErrorIdade(false);
    }
  }, [nome, cpf, cnpj, nascimento]);

  return {
    errorNome,
    errorNomeText,
    errorCpf,
    errorCpfText,
    errorCnpj,
    errorCnpjText,
    errorIdade,
    errorIdadeText,
    validatePessoal
  };
};

export default useValidatePessoal;
