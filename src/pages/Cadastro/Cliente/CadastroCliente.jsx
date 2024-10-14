import { useState } from 'react';
import { VerticalContainer } from '../../../config/GlobalStyle';
import { UserRoles, sexoOptions, comorbidadesOptions } from '../../../config/enums';
import StepCount from '../../../components/Step/StepCount';
import StepButtons from '../../../components/Step/StepButtons';
import StepRender from './StepRender';
import PropTypes from 'prop-types';

CadastroCliente.propTypes = {
  setUserRole: PropTypes.func.isRequired
};

export default function CadastroCliente({ setUserRole }) {
  const initialData = {
    // StepPessoal
    nome: '',
    cpf: '',
    nascimento: new Date().toISOString().split('T')[0], // Convertendo para o formato yyyy-MM-dd
    idade: new Date().toISOString().split('T')[0], // Convertendo para o formato yyyy-MM-dd
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

  return (
    <VerticalContainer
      style={{
        width: widthContainer
      }}>
      <StepCount steps={steps} activeStep={activeStep} />
      <StepRender step={activeStep} data={data} setData={setData} />
      <StepButtons
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        setUserRole={setUserRole}
        steps={steps}
      />
    </VerticalContainer>
  );
}
