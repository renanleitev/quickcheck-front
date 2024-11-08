import { useState, useEffect } from 'react';
import { crmRegexFinal } from '../../../config/validationRegex';

const useValidateProfissao = ({ crm }) => {
  const [errorCrm, setErrorCrm] = useState(false);
  const [errorCrmText, setErrorCrmText] = useState('');

  const validateProfissao = () => {
    let hasError = false;

    // Validação do CRM
    if (crm === '') {
      setErrorCrm(true);
      setErrorCrmText('CRM não pode ser vazio');
      hasError = true;
    } else if (crm.length < 5) {
      setErrorCrm(true);
      setErrorCrmText('CRM entre 5 e 10 números');
      hasError = true;
    } else if (!crmRegexFinal.test(crm)) {
      setErrorCrm(true);
      setErrorCrmText('CRM inválido');
      hasError = true;
    }

    // Lança erro se alguma validação falhar
    if (hasError) {
      throw new Error('CRM vazio ou inválido');
    }
  };

  useEffect(() => {
    if (crm !== '') {
      setErrorCrm(false);
    }
  }, [crm]);

  return {
    errorCrm,
    errorCrmText,
    validateProfissao
  };
};

export default useValidateProfissao;
