import { useState, useEffect } from 'react';

const useValidateDescricao = ({ horarioFuncionamento, descricao }) => {
  const [errorHorario, setErrorHorario] = useState(false);
  const [errorHorarioText, setErrorHorarioText] = useState('');

  const [errorDescricao, setErrorDescricao] = useState(false);
  const [errorDescricaoText, setErrorDescricaoText] = useState('');

  const validateDescricao = () => {
    let hasError = false;

    // Validação do horário de funcionamento
    if (horarioFuncionamento === '') {
      setErrorHorario(true);
      setErrorHorarioText('Horário de funcionamento não pode ser vazio');
      hasError = true;
    }

    // Validação da descrição
    if (descricao === '') {
      setErrorDescricao(true);
      setErrorDescricaoText('Descrição não pode ser vazio');
      hasError = true;
    }

    if (hasError) {
      throw new Error('Horário e descrição vazios ou inválidos');
    }
  };

  useEffect(() => {
    if (horarioFuncionamento !== '') {
      setErrorHorario(false);
    }
    if (descricao !== '') {
      setErrorDescricao(false);
    }
  }, [horarioFuncionamento, descricao]);

  return {
    errorDescricao,
    errorDescricaoText,
    errorHorario,
    errorHorarioText,
    validateDescricao
  };
};

export default useValidateDescricao;
