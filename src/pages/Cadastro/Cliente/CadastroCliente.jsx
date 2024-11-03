import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { VerticalContainer } from '../../../config/GlobalStyle';
import { UserRoles, sexoOptions, comorbidadesOptions } from '../../../config/enums';
import StepCount from '../../../components/Step/StepCount';
import StepButtons from '../../../components/Step/StepButtons';
import { formatCalendarDate } from '../../../hooks/formatDate';
import useValidatePessoal from '../../../components/Step/StepValidation/useValidatePessoal';
import useValidateContato from '../../../components/Step/StepValidation/useValidateContato';
import useValidateSaude from '../../../components/Step/StepValidation/useValidateSaude';
import useValidateLogin from '../../../components/Step/StepValidation/useValidateLogin';
import StepPessoal from '../../../components/Step/StepContent/StepPessoal';
import StepContato from '../../../components/Step/StepContent/StepContato';
import StepSaude from '../../../components/Step/StepContent/StepSaude';
import StepLogin from '../../../components/Step/StepContent/StepLogin';
import { criarCliente } from '../../../store/modules/clientes/reducer';
import { loginCadastro } from '../../../store/modules/usuarios/reducer';
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

  function stepRender() {
    switch (activeStep) {
      case 1:
        return <StepContato data={data} setData={setData} errors={errorsContato} />;
      case 2:
        return <StepSaude data={data} setData={setData} errors={errorsSaude} />;
      case 3:
        return <StepLogin data={data} setData={setData} errors={errorsLogin} />;
      case 0:
      default:
        return <StepPessoal data={data} setData={setData} errors={errorsPessoal} />;
    }
  }

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handlecriarCliente = () => {
    const cliente = {
      usuario: {
        nome: data.nome,
        email: data.email,
        endereco: data.endereco,
        telefone: data.telefone,
        imagem: data.imagem,
        senha: data.senha,
        role: UserRoles.CLIENTE
      },
      // Definindo como zero as coordenadas já que a localização será obtida quando o usuário acessar o mapa pela primeira vez
      latitude: '0',
      longitude: '0',
      numeroCartaoSUS: data.numeroCartaoSUS,
      nascimento: data.nascimento,
      sexo: data.sexo,
      cpf: data.cpf,
      // O paciente pode ter uma ou mais comorbidades (array)
      comorbidades: [data.comorbidades]
    };
    dispatch(criarCliente({ ...cliente }));
    dispatch(loginCadastro({ ...cliente }));
    // Após o cadastro, redireciona para a página principal
    navigate('/');
  };

  return (
    <VerticalContainer
      style={{
        width: widthContainer
      }}
    >
      <StepCount steps={steps} activeStep={activeStep} />
      {stepRender()}
      <StepButtons
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        onReset={() => setStartCadastro(false)}
        stepsNumber={steps.length}
        onValidateForm={handleForm}
        onCallApi={handlecriarCliente}
      />
    </VerticalContainer>
  );
}
