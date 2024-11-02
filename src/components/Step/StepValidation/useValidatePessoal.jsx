import { useState, useEffect } from 'react';

const useValidatePessoal = ({ nome, cpf }) => {
  const [errorNome, setErrorNome] = useState(false);
  const [errorNomeText, setErrorNomeText] = useState('');

  const [errorCpf, setErrorCpf] = useState(false);
  const [errorCpfText, setErrorCpfText] = useState('');

  const validatePessoal = () => {
    if (nome === '') {
      setErrorNome(true);
      setErrorNomeText('Nome não pode ser vazio');
    }
    if (cpf === '') {
      setErrorCpf(true);
      setErrorCpfText('CPF não pode ser vazio');
    }
    if (nome === '' || cpf === '') {
      throw new Error('Nome ou CPF vazios');
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
