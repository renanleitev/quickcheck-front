import { useState, useEffect } from 'react';
import { cpfRegexFinal } from '../../../config/validationRegex';
import dayjs from 'dayjs';

const useValidatePessoal = ({ nome, cpf, nascimento }) => {
  const [errorNome, setErrorNome] = useState(false);
  const [errorNomeText, setErrorNomeText] = useState('');

  const [errorCpf, setErrorCpf] = useState(false);
  const [errorCpfText, setErrorCpfText] = useState('');

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
    if (cpf === '') {
      setErrorCpf(true);
      setErrorCpfText('CPF não pode ser vazio');
      hasError = true;
    } 
    
    if (!cpfRegexFinal.test(cpf)) {
      setErrorCpf(true);
      setErrorCpfText('CPF inválido');
      hasError = true;
    }

    // Validação da idade
    if (idade < 18) {
      setErrorIdade(true);
      setErrorIdadeText('Idade inferior a 18 anos');
      hasError = true;
    }

    // Lança erro se alguma validação falhar
    if (hasError) {
      throw new Error('Nome, CPF ou Idade vazios ou inválidos');
    }
  };

  useEffect(() => {
    if (nome !== '') {
      setErrorNome(false);
    }
    if (cpf !== '') {
      setErrorCpfText(false);
    }
    if (nascimento !== '') {
      setErrorIdade(false);
    }
  }, [nome, cpf, nascimento]);

  return {
    errorNome,
    errorNomeText,
    errorCpf,
    errorCpfText,
    errorIdade,
    errorIdadeText,
    validatePessoal
  };
};

export default useValidatePessoal;
