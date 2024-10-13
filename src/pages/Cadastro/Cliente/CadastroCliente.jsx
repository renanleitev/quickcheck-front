import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { VerticalContainer } from '../../../config/GlobalStyle';
import { UserRoles, sexoOptions, comorbidadesOptions } from '../../../config/enums';
import StepPessoal from './Steps/StepPessoal';
import StepContato from './Steps/StepContato';
import StepSaude from './Steps/StepSaude';
import StepFinal from './Steps/StepFinal';
import StepSetup from '../../../components/StepSetup/StepSteup';
import PropTypes from 'prop-types';

StepRender.propTypes = {
  step: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired
};

function StepRender({ step, data, setData }) {
  switch (step) {
    case 1:
      return <StepContato data={data} setData={setData} />;
    case 2:
      return <StepSaude data={data} setData={setData} />;
    case 3:
      return <StepFinal data={data} setData={setData} />;
    case 0:
    default:
      return <StepPessoal data={data} setData={setData} />;
  }
}

export default function CadastroCliente() {
  const initialClientData = {
    // StepPessoal
    nome: '',
    cpf: '',
    nascimento: new Date(),
    idade: new Date(),
    sexo: sexoOptions[0].value,
    // StepContato
    endereco: '',
    telefone: '',
    // StepSaude
    numeroCartaoSUS: '',
    comorbidades: comorbidadesOptions[0].value,
    // StepFinal
    email: '',
    senha: '',
    repetirSenha: '',
    role: UserRoles.CLIENTE
  };

  const [data, setData] = useState(initialClientData);

  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Pessoal', 'Contato', 'Saúde', 'Login'];

  const widthContainer = '20rem';

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <VerticalContainer
      style={{
        width: widthContainer
      }}>
      <StepSetup steps={steps} activeStep={activeStep} />
      <StepRender step={activeStep} data={data} setData={setData} />
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleBack}
          sx={{ mr: 1 }}>
          Voltar
        </Button>
        <Button variant="contained" onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Finalizar' : 'Avançar'}
        </Button>
      </Box>
    </VerticalContainer>
  );
}
