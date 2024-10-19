import { useState } from 'react';
import { VerticalContainer } from '../../../config/GlobalStyle';
import { UserRoles, sexoOptions, especialidadesOptions } from '../../../config/enums';
import StepCount from '../../../components/Step/StepCount';
import StepButtons from '../../../components/Step/StepButtons';
import StepRender from './StepRender';
import PropTypes from 'prop-types';

CadastroFuncionario.propTypes = {
  setUserRole: PropTypes.func.isRequired
};

export default function CadastroFuncionario({ setUserRole }) {
  const initialData = {
    // StepPessoal
    nome: '',
    cpf: '',
    nascimento: new Date().toISOString().split('T')[0], // Convertendo para o formato yyyy-MM-dd
    idade: new Date().toISOString().split('T')[0], // Convertendo para o formato yyyy-MM-dd
    // StepContato
    endereco: '',
    telefone: '',
    // StepProfissao
    crm: '',
    sexo: sexoOptions[0].value,
    especialidade: especialidadesOptions[0].value,
    // StepFinal
    email: '',
    senha: '',
    repetirSenha: '',
    role: UserRoles.FUNCIONARIO
  };

  const [data, setData] = useState(initialData);

  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Pessoal', 'Contato', 'Profissão', 'Login'];

  const widthContainer = '20rem';

  return (
    <VerticalContainer
      style={{
        width: widthContainer
      }}
    >
      <StepCount steps={steps} activeStep={activeStep} />
      <StepRender step={activeStep} data={data} setData={setData} />
      <StepButtons
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        onReset={() => setUserRole('')}
        steps={steps}
      />
    </VerticalContainer>
  );
}
