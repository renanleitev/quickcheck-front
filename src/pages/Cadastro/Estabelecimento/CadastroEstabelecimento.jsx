import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { VerticalContainer } from '../../../config/GlobalStyle';
import { UserRoles } from '../../../config/enums';
import { estabelecimentosOptions } from '../../../mocks/estabelecimentos';
import StepCount from '../../../components/Step/StepCount';
import StepButtons from '../../../components/Step/StepButtons';
import useValidatePessoal from '../../../components/Input/Validation/useValidatePessoal';
import useValidateContato from '../../../components/Input/Validation/useValidateContato';
import useValidateDescricao from '../../../components/Input/Validation/useValidateDescricao';
import useValidateLogin from '../../../components/Input/Validation/useValidateLogin';
import InputPessoal from '../../../components/Input/Content/InputPessoal';
import InputContato from '../../../components/Input/Content/InputContato';
import InputDescricao from '../../../components/Input/Content/InputDescricao';
import InputLogin from '../../../components/Input/Content/InputLogin';
import { loginCadastro } from '../../../store/modules/usuarios/reducer';
import { cadastrarEstabelecimento } from '../../../store/modules/estabelecimentos/reducer';
import { RoutesList } from '../../../routes/enums';

// Steps que serão exibidos durante o cadastro do estabelecimento
const stepsEstabelecimento = {
  EMPRESA: 'Empresa',
  CONTATO: 'Contato',
  DESCRICAO: 'Descrição',
  LOGIN: 'Login'
};

CadastroEstabelecimento.propTypes = {
  setStartCadastro: PropTypes.func.isRequired
};

export default function CadastroEstabelecimento({ setStartCadastro }) {
  const initialData = {
    // InputPessoal
    nome: '',
    cnpj: '',
    tipo: estabelecimentosOptions[0].value,
    // InputContato
    endereco: '',
    telefone: '',
    imagem: '', // Opcional
    // InputDescricao
    horarioFuncionamento: '',
    descricao: '',
    // InputLogin
    email: '',
    senha: '',
    repetirSenha: '',
    role: UserRoles.ESTABELECIMENTO,
    // Definindo como zero as coordenadas já que a localização será obtida quando o usuário acessar o mapa pela primeira vez
    latitude: '0',
    longitude: '0',
    // TODO: Gerenciamento de assinatura (usuários gratuitos X pagos)
    assinante: false
  };

  const [data, setData] = useState(initialData);

  const [activeStep, setActiveStep] = useState(0);

  const steps = Object.values(stepsEstabelecimento);

  const widthContainer = '20rem';

  // Validando os steps
  // Pessoal
  const { validatePessoal, ...errorsPessoal } = useValidatePessoal({
    nome: data.nome,
    cnpj: data.cnpj
  });

  // Contato
  const { validateContato, ...errorsContato } = useValidateContato({
    endereco: data.endereco,
    telefone: data.telefone
  });

  // Descrição
  const { validateDescricao, ...errorsDescricao } = useValidateDescricao({
    horarioFuncionamento: data.horarioFuncionamento,
    descricao: data.descricao
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
      case steps.indexOf(stepsEstabelecimento.EMPRESA):
        return validatePessoal();
      case steps.indexOf(stepsEstabelecimento.CONTATO):
        return validateContato();
      case steps.indexOf(stepsEstabelecimento.DESCRICAO):
        return validateDescricao();
      case steps.indexOf(stepsEstabelecimento.LOGIN):
        return validateLogin();
      default:
        return () => {};
    }
  }, [activeStep, validatePessoal, validateContato, validateDescricao, validateLogin]);

  // Renderiza diferentes inputs para cada step
  function stepRender() {
    switch (activeStep) {
      case steps.indexOf(stepsEstabelecimento.CONTATO):
        return <InputContato data={data} setData={setData} errors={errorsContato} />;
      case steps.indexOf(stepsEstabelecimento.DESCRICAO):
        return <InputDescricao data={data} setData={setData} errors={errorsDescricao} />;
      case steps.indexOf(stepsEstabelecimento.LOGIN):
        return <InputLogin data={data} setData={setData} errors={errorsLogin} />;
      case steps.indexOf(stepsEstabelecimento.EMPRESA):
      default:
        return (
          <InputPessoal
            data={data}
            setData={setData}
            role={UserRoles.ESTABELECIMENTO}
            errors={errorsPessoal}
          />
        );
    }
  }

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Função principal para cadastrar o estabelecimento
  const handleCadastrarEstabelecimento = () => {
    const estabelecimento = {
      usuario: {
        nome: data.nome,
        email: data.email,
        endereco: data.endereco,
        telefone: data.telefone,
        imagem: data.imagem,
        senha: data.senha,
        role: UserRoles.ESTABELECIMENTO
      },
      latitude: data.latitude,
      longitude: data.longitude,
      cnpj: data.cnpj,
      tipo: data.tipo,
      descricao: data.descricao,
      horarioFuncionamento: data.horarioFuncionamento,
      assinante: data.assinante
    };
    dispatch(cadastrarEstabelecimento({ ...estabelecimento })).then(() => {
      dispatch(loginCadastro(UserRoles.ESTABELECIMENTO));
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
        onCallApi={handleCadastrarEstabelecimento}
        isCallingApi={activeStep === steps.indexOf(stepsEstabelecimento.LOGIN)}
      />
    </VerticalContainer>
  );
}
