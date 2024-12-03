import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { VerticalContainer } from '../../../config/GlobalStyle';
import { UserRoles, sexoOptions, comorbidadesOptions } from '../../../config/enums';
import StepCount from '../../../components/Step/StepCount';
import StepButtons from '../../../components/Step/StepButtons';
import { formatCalendarDate } from '../../../hooks/formatDate';
import useValidatePessoal from '../../../components/Input/Validation/useValidatePessoal';
import useValidateContato from '../../../components/Input/Validation/useValidateContato';
import useValidateLogin from '../../../components/Input/Validation/useValidateLogin';
import InputPessoal from '../../../components/Input/Content/InputPessoal';
import InputContato from '../../../components/Input/Content/InputContato';
import InputSaude from '../../../components/Input/Content/InputSaude';
import InputLogin from '../../../components/Input/Content/InputLogin';
import { cadastrarCliente } from '../../../store/modules/clientes/reducer';
import { loginCadastro } from '../../../store/modules/usuarios/reducer';
import { RoutesList } from '../../../routes/enums';
import PropTypes from 'prop-types';

// Steps que serão exibidos durante o cadastro do cliente
const stepsCliente = {
  PESSOAL: 'Pessoal',
  CONTATO: 'Contato',
  SAUDE: 'Saúde',
  LOGIN: 'Login'
};

CadastroCliente.propTypes = {
  setStartCadastro: PropTypes.func.isRequired
};

export default function CadastroCliente({ setStartCadastro }) {
  const initialData = {
    // InputPessoal
    nome: '',
    cpf: '',
    nascimento: formatCalendarDate(new Date().toISOString()), // Convertendo para o formato yyyy-MM-dd
    // InputContato
    endereco: '',
    telefone: '',
    imagem: '', // Opcional
    // InputSaude
    sexo: sexoOptions[0].value,
    comorbidades: comorbidadesOptions[0].value,
    compartilharDados: false, // Checkbox para autorizar o uso de dados da LGPD
    // InputLogin
    email: '',
    senha: '',
    repetirSenha: '',
    role: UserRoles.CLIENTE,
    // Definindo como zero as coordenadas já que a localização será obtida quando o usuário acessar o mapa pela primeira vez
    latitude: '0',
    longitude: '0'
  };

  const [data, setData] = useState(initialData);

  const [activeStep, setActiveStep] = useState(0);

  const steps = Object.values(stepsCliente);

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

  // Login
  const { validateLogin, ...errorsLogin } = useValidateLogin({
    email: data.email,
    senha: data.senha,
    repetirSenha: data.repetirSenha
  });

  // Função executada quando o usuário clicar no next button
  const handleForm = useCallback(() => {
    switch (activeStep) {
      case steps.indexOf(stepsCliente.PESSOAL):
        return validatePessoal();
      case steps.indexOf(stepsCliente.CONTATO):
        return validateContato();
      case steps.indexOf(stepsCliente.LOGIN):
        return validateLogin();
      default:
        return () => {};
    }
  }, [activeStep, validateContato, validatePessoal, validateLogin]);

  // Renderiza diferentes inputs para cada step
  function stepRender() {
    switch (activeStep) {
      case steps.indexOf(stepsCliente.CONTATO):
        return <InputContato data={data} setData={setData} errors={errorsContato} />;
      case steps.indexOf(stepsCliente.SAUDE):
        return <InputSaude data={data} setData={setData} />;
      case steps.indexOf(stepsCliente.LOGIN):
        return <InputLogin data={data} setData={setData} errors={errorsLogin} />;
      case steps.indexOf(stepsCliente.PESSOAL):
      default:
        return <InputPessoal data={data} setData={setData} errors={errorsPessoal} />;
    }
  }

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Função principal para cadastrar o cliente
  const handleCadastrarCliente = () => {
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
      latitude: data.latitude,
      longitude: data.longitude,
      nascimento: data.nascimento,
      sexo: data.sexo,
      cpf: data.cpf,
      // O cliente (paciente) pode ter uma ou mais comorbidades (array)
      comorbidades: [data.comorbidades]
    };
    dispatch(cadastrarCliente({ ...cliente })).then(() => {
      dispatch(loginCadastro(UserRoles.CLIENTE));
      // Após o cadastro, redireciona para a página principal
      navigate(RoutesList.Home);
    });
  };

  // Desabilita o next button quando o usuário ainda não autorizou compartilhar os dados
  const dadosPendentes =
    activeStep === steps.indexOf(stepsCliente.SAUDE) && !data.compartilharDados;

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
        onCallApi={handleCadastrarCliente}
        isCallingApi={activeStep === steps.indexOf(stepsCliente.LOGIN)}
        disableNextButton={dadosPendentes}
      />
    </VerticalContainer>
  );
}
