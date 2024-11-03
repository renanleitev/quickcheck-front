import { useState, useEffect } from 'react';
import { emailRegex } from '../../../config/validationRegex';

/** Hook para validar os inputs de Login */
const useValidateLogin = ({ email, senha, repetirSenha }) => {
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailText, setErrorEmailText] = useState('');

  const [errorSenha, setErrorSenha] = useState(false);
  const [errorSenhaText, setErrorSenhaText] = useState('');

  const [errorRepetirSenha, setErrorRepetirSenha] = useState(false);
  const [errorRepetirSenhaText, setErrorRepetirSenhaText] = useState('');

  const validateLogin = () => {
    let hasError = false;

    // Validação do email
    if (email === '') {
      setErrorEmail(true);
      setErrorEmailText('Email não pode ser vazio');
      hasError = true;
    }

    if (!emailRegex.test(email)) {
      setErrorEmail(true);
      setErrorEmailText('Email inválido');
      hasError = true;
    }

    // Validação da senha
    if (senha === '') {
      setErrorSenha(true);
      setErrorSenhaText('Senha não pode ser vazia');
      hasError = true;
    }

    // Validação da repetição da senha
    if (repetirSenha === '') {
      setErrorRepetirSenha(true);
      setErrorRepetirSenhaText('Senha não pode ser vazia');
      hasError = true;
    }

    if (senha !== repetirSenha) {
      setErrorSenha(true);
      setErrorSenhaText('Senhas precisam ser iguais');
      setErrorRepetirSenha(true);
      setErrorRepetirSenhaText('Senhas precisam ser iguais');
      hasError = true;
    }

    // Lança erro se houver alguma validação falha
    if (hasError) {
      throw new Error('Email ou senha vazios ou inválidos');
    }
  };

  useEffect(() => {
    if (email !== '') {
      setErrorEmail(false);
    }
    if (senha !== '') {
      setErrorSenha(false);
    }
    if (repetirSenha !== '') {
      setErrorRepetirSenha(false);
    }
  }, [email, repetirSenha, senha]);

  return {
    errorEmail,
    errorEmailText,
    errorSenha,
    errorSenhaText,
    errorRepetirSenha,
    errorRepetirSenhaText,
    validateLogin
  };
};

export default useValidateLogin;
