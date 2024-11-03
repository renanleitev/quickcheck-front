import { useState, useEffect } from 'react';
import { numeroCartaoSUSRegexFinal } from '../../../config/validationRegex';

const useValidateSaude = ({ numeroCartaoSUS }) => {
  const [errorSaude, setErrorSaude] = useState(false);
  const [errorSaudeText, setErrorSaudeText] = useState('');

  const validateSaude = () => {
    let hasError = false;

    // Validação do número do cartão do SUS
    if (numeroCartaoSUS === '') {
      setErrorSaude(true);
      setErrorSaudeText('Número do Cartão SUS não pode ser vazio');
      hasError = true;
    } else if (!numeroCartaoSUSRegexFinal.test(numeroCartaoSUS)) {
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
