import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { VerticalContainer } from '../../../config/GlobalStyle';
import PropTypes from 'prop-types';

import { UserRoles, sexoOptions, especialidadesOptions } from '../../../config/enums';
import StepCount from '../../../components/Step/StepCount';
import StepButtons from '../../../components/Step/StepButtons';
import { formatCalendarDate } from '../../../hooks/formatDate';
import useValidatePessoal from '../../../components/Input/Validation/useValidatePessoal';
import useValidateContato from '../../../components/Input/Validation/useValidateContato';
import useValidateProfissao from '../../../components/Input/Validation/useValidateProfissao';
import useValidateLogin from '../../../components/Input/Validation/useValidateLogin';
import InputPessoal from '../../../components/Input/Content/InputPessoal';
import InputContato from '../../../components/Input/Content/InputContato';
import InputProfissao from '../../../components/Input/Content/InputProfissao';
import InputLogin from '../../../components/Input/Content/InputLogin';
import { estadosBrasil } from '../../../mocks/estadosBrasil';
import { cadastrarFuncionario } from '../../../store/modules/funcionarios/reducer';
import { loginCadastro } from '../../../store/modules/usuarios/reducer';
import { RoutesList } from '../../../routes/enums';

// Steps que serão exibidos durante o cadastro do funcionario
const stepsFuncionario = {
  PESSOAL: 'Pessoal',
  CONTATO: 'Contato',
  PROFISSAO: 'Profissão',
  LOGIN: 'Login'
};

CadastroFuncionario.propTypes = {
  setStartCadastro: PropTypes.func.isRequired
};

export default function CadastroFuncionario({ setStartCadastro }) {
  const initialData = {
    // InputPessoal
    nome: '',
    cpf: '',
    nascimento: formatCalendarDate(new Date().toISOString()), // Convertendo para o formato yyyy-MM-dd
    // InputContato
    endereco: '',
    telefone: '',
    imagem: '', // Opcional
    // InputProfissao
    crm: '',
    estadoCrm: estadosBrasil.find((estado) => estado.label === 'PE').value, // Pernambuco (PE)
    sexo: sexoOptions[0].value,
    especialidade: especialidadesOptions[0].value,
    // InputLogin
    email: '',
    senha: '',
    repetirSenha: '',
    role: UserRoles.FUNCIONARIO
  };

  const [data, setData] = useState(initialData);

  const [activeStep, setActiveStep] = useState(0);

  const steps = Object.values(stepsFuncionario);

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

  // Profissão
  const { validateProfissao, ...errorsProfissao } = useValidateProfissao({
    crm: data.crm
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
      case steps.indexOf(stepsFuncionario.CONTATO):
        return validateContato();
      case steps.indexOf(stepsFuncionario.PROFISSAO):
        return validateProfissao();
      case steps.indexOf(stepsFuncionario.LOGIN):
        return validateLogin();
      case steps.indexOf(stepsFuncionario.PESSOAL):
        return validatePessoal();
      default:
        return () => {};
    }
  }, [activeStep, validateContato, validateLogin, validatePessoal, validateProfissao]);

  // Renderiza diferentes inputs para cada step
  function stepRender() {
    switch (activeStep) {
      case steps.indexOf(stepsFuncionario.CONTATO):
        return <InputContato data={data} setData={setData} errors={errorsContato} />;
      case steps.indexOf(stepsFuncionario.PROFISSAO):
        return <InputProfissao data={data} setData={setData} errors={errorsProfissao} />;
      case steps.indexOf(stepsFuncionario.LOGIN):
        return <InputLogin data={data} setData={setData} errors={errorsLogin} />;
      case steps.indexOf(stepsFuncionario.PESSOAL):
      default:
        return <InputPessoal data={data} setData={setData} errors={errorsPessoal} />;
    }
  }

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Função principal para cadastrar o funcionario
  const handleCadastrarFuncionario = () => {
    const funcionario = {
      usuario: {
        nome: data.nome,
        email: data.email,
        endereco: data.endereco,
        telefone: data.telefone,
        imagem: data.imagem,
        senha: data.senha,
        role: UserRoles.FUNCIONARIO
      },
      // TODO: Checar se o padrão CRM é XXXX/PE ou XXXX-PE
      crm: `${data.crm}/${data.estadoCrm}`,
      cpf: data.cpf,
      sexo: data.sexo,
      especialidade: data.especialidade,
      nascimento: data.nascimento
    };
    dispatch(cadastrarFuncionario({ ...funcionario })).then(() => {
      dispatch(loginCadastro(UserRoles.FUNCIONARIO));
      // Após o cadastro, redireciona para a página principal
      navigate(RoutesList.Home);
    });
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
        onCallApi={handleCadastrarFuncionario}
        isCallingApi={activeStep === steps.indexOf(stepsFuncionario.LOGIN)}
      />
    </VerticalContainer>
  );
}
