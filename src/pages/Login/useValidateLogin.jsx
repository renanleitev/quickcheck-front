import { useState, useEffect } from 'react';
import validateEmail from '../../hooks/validateEmail';

/** Hook para validar os inputs de Login */
const useValidateLogin = ({ email, senha }) => {
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailText, setErrorEmailText] = useState('');

  const [errorSenha, setErrorSenha] = useState(false);
  const [errorSenhaText, setErrorSenhaText] = useState('');

  const validateLogin = () => {
    let hasError = false;

    // Validação do email
    if (email === '') {
      setErrorEmail(true);
      setErrorEmailText('Email não pode ser vazio');
      hasError = true;
    } 
    
    if (!validateEmail(email)) {
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

    // Lança erro se houver alguma validação falha
    if (hasError) {
      throw new Error('Email ou senha inválidos');
    }
  };

  useEffect(() => {
    if (email !== '') {
      setErrorEmail(false);
    }
    if (senha !== '') {
      setErrorSenha(false);
    }
  }, [email, senha]);

  return {
    errorEmail,
    errorEmailText,
    errorSenha,
    errorSenhaText,
    validateLogin
  };
};

export default useValidateLogin;
