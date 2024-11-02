import { useState, useEffect } from 'react';

const useValidateContato = ({ endereco, telefone }) => {
  const [errorEndereco, setErrorEndereco] = useState(false);
  const [errorEnderecoText, setErrorEnderecoText] = useState('');

  const [errorTelefone, setErrorTelefone] = useState(false);
  const [errorTelefoneText, setErrorTelefoneText] = useState('');

  const validateContato = () => {
    let hasError = false;

    if (endereco === '') {
      setErrorEndereco(true);
      setErrorEnderecoText('Endereço não pode ser vazio');
      hasError = true;
    }

    if (telefone === '') {
      setErrorTelefone(true);
      setErrorTelefoneText('Telefone não pode ser vazio');
      hasError = true;
    }

    if (hasError) {
      throw new Error('Endereço ou Telefone vazios');
    }
  };

  useEffect(() => {
    if (endereco !== '') {
      setErrorEndereco(false);
    }
    if (telefone !== '') {
      setErrorTelefone(false);
    }
  }, [endereco, telefone]);

  return {
    errorEndereco,
    errorEnderecoText,
    errorTelefone,
    errorTelefoneText,
    validateContato
  };
};

export default useValidateContato;
