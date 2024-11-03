import { useCallback, useState } from 'react';
import { VerticalContainer } from '../../../config/GlobalStyle';
import { UserRoles, sexoOptions, comorbidadesOptions } from '../../../config/enums';
import StepCount from '../../../components/Step/StepCount';
import StepButtons from '../../../components/Step/StepButtons';
import StepRender from './StepRender';
import { formatCalendarDate } from '../../../hooks/formatDate';
import useValidatePessoal from '../../../components/Step/StepValidation/useValidatePessoal';
import useValidateContato from '../../../components/Step/StepValidation/useValidateContato';
import useValidateSaude from '../../../components/Step/StepValidation/useValidateSaude';
import useValidateLogin from '../../../components/Step/StepValidation/useValidateLogin';
import PropTypes from 'prop-types';

CadastroCliente.propTypes = {
  setStartCadastro: PropTypes.func.isRequired
};

export default function CadastroCliente({ setStartCadastro }) {
  const initialData = {
    // StepPessoal
    nome: '',
    cpf: '',
    nascimento: formatCalendarDate(new Date().toISOString()), // Convertendo para o formato yyyy-MM-dd
    idade: formatCalendarDate(new Date().toISOString()), // Convertendo para o formato yyyy-MM-dd
    // StepContato
    endereco: '',
    telefone: '',
    // StepSaude
    numeroCartaoSUS: '',
    sexo: sexoOptions[0].value,
    comorbidades: comorbidadesOptions[0].value,
    // StepFinal
    email: '',
    senha: '',
    repetirSenha: '',
    role: UserRoles.CLIENTE
  };

  const [data, setData] = useState(initialData);

  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Pessoal', 'Contato', 'Saúde', 'Login'];

  const widthContainer = '20rem';

  // Validando os steps
  // Pessoal
  const { validatePessoal, ...errorsPessoal } = useValidatePessoal({
    nome: data.nome,
    cpf: data.cpf,
    nascimento: data.nascimento
  });

  // Contato
  const { validateContato, ...errorsContato } = useValidateContato({
    endereco: data.endereco,
    telefone: data.telefone
  });

  // Saude
  const { validateSaude, ...errorsSaude } = useValidateSaude({
    numeroCartaoSUS: data.numeroCartaoSUS
  });

  // Login
  const { validateLogin, ...errorsLogin } = useValidateLogin({
    email: data.email,
    senha: data.senha,
    repetirSenha: data.repetirSenha
  });

  const errors = { ...errorsPessoal, ...errorsContato, ...errorsSaude, ...errorsLogin };

  const handleForm = useCallback(() => {
    if (activeStep === 0) {
      return validatePessoal();
    }
    if (activeStep === 1) {
      return validateContato();
    }
    if (activeStep === 2) {
      return validateSaude();
    }
    if (activeStep === 3) {
      return validateLogin();
    }
    return () => {};
  }, [activeStep, validateContato, validatePessoal, validateSaude, validateLogin]);

  return (
    <VerticalContainer
      style={{
        width: widthContainer
      }}
    >
      <StepCount steps={steps} activeStep={activeStep} />
      <StepRender step={activeStep} data={data} setData={setData} errors={errors} />
      <StepButtons
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        onReset={() => setStartCadastro(false)}
        stepsNumber={steps.length}
        onValidateForm={handleForm}
      />
    </VerticalContainer>
  );
}
