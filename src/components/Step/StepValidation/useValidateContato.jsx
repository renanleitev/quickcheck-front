import { useState, useEffect } from 'react';
import { telefoneRegexFinal } from '../../../config/validationRegex';

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

    if (!telefoneRegexFinal.test(telefone)) {
      setErrorTelefone(true);
      setErrorTelefoneText('Telefone inválido');
      hasError = true;
    }

    if (hasError) {
      throw new Error('Endereço ou Telefone vazios ou inválidos');
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
