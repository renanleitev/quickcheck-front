import { useState, useEffect } from 'react';
import { numeroCartaoSUSRegexFinal } from '../../../config/validationRegex';

const useValidateSaude = ({ numeroCartaoSUS }) => {
  const [errorSaude, setErrorSaude] = useState(false);
  const [errorSaudeText, setErrorSaudeText] = useState('');

  const validateSaude = () => {
    let hasError = false;

    if (numeroCartaoSUS === '') {
      setErrorSaude(true);
      setErrorSaudeText('Número do Cartão SUS não pode ser vazio');
      hasError = true;
    }

    if (!numeroCartaoSUSRegexFinal.test(numeroCartaoSUS)) {
      setErrorSaude(true);
      setErrorSaudeText('Número do Cartão SUS inválido');
      hasError = true;
    }

    if (hasError) {
      throw new Error('Número do Cartão SUS inválido ou vazio');
    }
  };

  useEffect(() => {
    if (numeroCartaoSUS !== '') {
      setErrorSaude(false);
    }
  }, [numeroCartaoSUS]);

  return {
    errorSaude,
    errorSaudeText,
    validateSaude
  };
};

export default useValidateSaude;
