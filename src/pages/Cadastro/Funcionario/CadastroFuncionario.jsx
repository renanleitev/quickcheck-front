import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { VerticalContainer } from '../../../config/GlobalStyle';
import { UserRoles, sexoOptions, especialidadesOptions } from '../../../config/enums';
import StepCount from '../../../components/Step/StepCount';
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      setUserRole('');
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  return (
    <VerticalContainer
      style={{
        width: widthContainer
      }}>
      <StepCount steps={steps} activeStep={activeStep} />
      <StepRender step={activeStep} data={data} setData={setData} />
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button variant="contained" color="error" onClick={handleBack} sx={{ mr: 1 }}>
          Voltar
        </Button>
        <Button variant="contained" onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Finalizar' : 'Avançar'}
        </Button>
      </Box>
    </VerticalContainer>
  );
}
