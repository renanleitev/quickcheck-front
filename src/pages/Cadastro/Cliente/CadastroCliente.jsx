import { useCallback, useState } from 'react';
import { VerticalContainer } from '../../../config/GlobalStyle';
import { UserRoles, sexoOptions, comorbidadesOptions } from '../../../config/enums';
import StepCount from '../../../components/Step/StepCount';
import StepButtons from '../../../components/Step/StepButtons';
import StepRender from './StepRender';
import { formatCalendarDate } from '../../../hooks/formatDate';
import PropTypes from 'prop-types';
import useValidatePessoal from '../../../components/Step/StepValidation/useValidatePessoal';
import useValidateContato from '../../../components/Step/StepValidation/useValidateContato';

CadastroCliente.propTypes = {
  setUserRole: PropTypes.func.isRequired
};

export default function CadastroCliente({ setUserRole }) {
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
  const { validatePessoal, ...errorsPessoal } = useValidatePessoal({
    nome: data.nome,
    cpf: data.cpf
  });

  const { validateContato, ...errorsContato } = useValidateContato({
    endereco: data.endereco,
    telefone: data.telefone
  });

  const errors = { ...errorsPessoal, ...errorsContato };

  const handleForm = useCallback(() => {
    if (activeStep === 0) {
      return validatePessoal();
    }
    if (activeStep === 1) {
      return validateContato();
    }
    return () => {};
  }, [activeStep, validateContato, validatePessoal]);

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
        onReset={() => setUserRole('')}
        stepsNumber={steps.length}
        onValidateForm={handleForm}
      />
    </VerticalContainer>
  );
}
