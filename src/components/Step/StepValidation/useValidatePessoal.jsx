import { useState, useEffect } from 'react';
import { cpfRegexFinal } from '../../../config/validationRegex';

const useValidatePessoal = ({ nome, cpf }) => {
  const [errorNome, setErrorNome] = useState(false);
  const [errorNomeText, setErrorNomeText] = useState('');

  const [errorCpf, setErrorCpf] = useState(false);
  const [errorCpfText, setErrorCpfText] = useState('');

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

    // Lança erro se alguma validação falhar
    if (hasError) {
      throw new Error('Nome ou CPF vazios ou inválidos');
    }
  };

  useEffect(() => {
    if (nome !== '') {
      setErrorNome(false);
    }
    if (cpf !== '') {
      setErrorCpfText(false);
    }
  }, [nome, cpf]);

  return {
    errorNome,
    errorNomeText,
    errorCpf,
    errorCpfText,
    validatePessoal
  };
};

export default useValidatePessoal;
