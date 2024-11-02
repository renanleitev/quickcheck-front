import { useState, useEffect } from 'react';
import validateEmail from '../../hooks/validateEmail';

/** Hook para validar os inputs de Login */
const useValidateLogin = ({ email, senha }) => {
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailText, setErrorEmailText] = useState('');

  const [errorSenha, setErrorSenha] = useState(false);
  const [errorSenhaText, setErrorSenhaText] = useState('');

  const validateLogin = () => {
    if (email === '') {
      setErrorEmail(true);
      setErrorEmailText('Email não pode ser vazio');
    }
    if (!validateEmail(email)) {
      setErrorEmail(true);
      setErrorEmailText('Email inválido');
    }
    if (senha === '') {
      setErrorSenha(true);
      setErrorSenhaText('Senha não pode ser vazia');
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
