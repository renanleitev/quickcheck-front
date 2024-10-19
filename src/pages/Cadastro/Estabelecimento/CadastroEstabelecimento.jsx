import { useState } from 'react';
import { VerticalContainer } from '../../../config/GlobalStyle';
import { UserRoles } from '../../../config/enums';
import StepCount from '../../../components/Step/StepCount';
import StepButtons from '../../../components/Step/StepButtons';
import StepRender from './StepRender';
import PropTypes from 'prop-types';

CadastroEstabelecimento.propTypes = {
  setUserRole: PropTypes.func.isRequired
};

export default function CadastroEstabelecimento({ setUserRole }) {
  const initialData = {
    // StepPessoal
    nome: '',
    cnpj: '',
    horarioFuncionamento: '',
    // StepContato
    endereco: '',
    telefone: '',
    // StepInformacao
    descricao: '',
    // StepFinal
    email: '',
    senha: '',
    repetirSenha: '',
    role: UserRoles.ESTABELECIMENTO
  };

  const [data, setData] = useState(initialData);

  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Empresa', 'Contato', 'Descrição', 'Login'];

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
