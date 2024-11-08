import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { VerticalContainer } from '../../../config/GlobalStyle';
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
import PropTypes from 'prop-types';
import { estadosBrasil } from '../../../mocks/estadosBrasil';
import { criarFuncionario } from '../../../store/modules/funcionarios/reducer';
import { loginCadastro } from '../../../store/modules/usuarios/reducer';

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

  const handleForm = useCallback(() => {
    if (activeStep === 0) {
      return validatePessoal();
    }
    if (activeStep === 1) {
      return validateContato();
    }
    if (activeStep === 2) {
      return validateProfissao();
    }
    if (activeStep === 3) {
      return validateLogin();
    }
    return () => {};
  }, [activeStep, validateContato, validateLogin, validatePessoal, validateProfissao]);

  function stepRender() {
    switch (activeStep) {
      case 1:
        return <InputContato data={data} setData={setData} errors={errorsContato} />;
      case 2:
        return <InputProfissao data={data} setData={setData} errors={errorsProfissao} />;
      case 3:
        return <InputLogin data={data} setData={setData} errors={errorsLogin} />;
      case 0:
      default:
        return <InputPessoal data={data} setData={setData} errors={errorsPessoal} />;
    }
  }

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleCriarFuncionario = () => {
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
    dispatch(criarFuncionario({ ...funcionario }));
    dispatch(loginCadastro({ ...funcionario }));
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
        onCallApi={handleCriarFuncionario}
      />
    </VerticalContainer>
  );
}
